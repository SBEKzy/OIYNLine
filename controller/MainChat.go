package controller

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/OIYNLine/controller/utils"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var flag bool = true
var poolMainChat *PoolMainChat

func (s *Server) MainChat(c *gin.Context) {
	fmt.Println("HELOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO+")
	log.Println("HELOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO+")
	conn, err := Upgrade(c.Writer, c.Request)
	if err != nil {
		fmt.Fprintf(c.Writer, "%+V\n", err)
	}
	if flag {
		poolMainChat = NewPoolMainChat()
		go poolMainChat.Start()
		flag = false
	}
	client := &ClientMainChat{
		Conn: conn,
		Pool: poolMainChat,
	}
	log.Print(client)
	poolMainChat.Register <- client
	client.PoolMainChatRead()
}

type ClientMainChat struct {
	ID   string
	Conn *websocket.Conn
	Pool *PoolMainChat
}

type PoolMainChat struct {
	Name       string
	Register   chan *ClientMainChat
	Unregister chan *ClientMainChat
	Clients    map[*ClientMainChat]string
	Broadcast  chan BroadcastMsg
}

type BroadcastMsg struct {
	Client *ClientMainChat
	Msg    *MsgMainChat
}

type MsgMainChat struct {
	Name     string   `json:"name"`
	Text     string   `json:"text"`
	Register int      `json:"register"`
	Clients  []string `json:"clients"`
}

func (c *ClientMainChat) PoolMainChatRead() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()

	}()
	BroadcastMsg := BroadcastMsg{Client: c}
	for {
		_, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		var body *MsgMainChat
		err = json.Unmarshal(p, &body)
		if err != nil {
			fmt.Println("unmarshal -- ", err)
			return
		}
		// if body.Register == 1 {
		// 	clients = append(clients, body.Name)
		// 	body.Clients = clients
		// } else if body.Register == 2 {
		// 	for i, v := range clients {
		// 		if v == body.Name {
		// 			clients = append(clients[i:], clients[:(i+1)]...)
		// 			body.Clients = clients
		// 		}
		// 	}
		// }
		BroadcastMsg.Msg = body
		c.Pool.Broadcast <- BroadcastMsg
	}
}

func (p *PoolMainChat) Start() {
	defer func() {
		log.Print("PoolMainChat closed:", p.Name)
	}()
	for {
		select {
		case client := <-p.Register:
			fmt.Println("Mainchatregister ", client)
			p.Clients[client] = "true"

			for client, _ := range p.Clients {
				client.Conn.WriteJSON("sdf")
			}

		case client := <-p.Unregister:
			delete(p.Clients, client)
			message := MsgMainChat{Register: 2, Clients: p.onlineClients()}
			for clinet, _ := range p.Clients {
				clinet.Conn.WriteJSON(message)
			}

		case BroadcastMsg := <-p.Broadcast:
			fmt.Println("message := <-p.Broadcast: ", BroadcastMsg)
			if BroadcastMsg.Msg.Register == 1 && p.Clients[BroadcastMsg.Client] == "true" {
				p.Clients[BroadcastMsg.Client] = BroadcastMsg.Msg.Name
				log.Print(BroadcastMsg.Msg.Name)
				BroadcastMsg.Msg.Clients = p.onlineClients()
				fmt.Print("client ")
				fmt.Print(BroadcastMsg.Client)
				fmt.Print(" , ")
				fmt.Println(p.onlineClients())
			}
			for clinet, _ := range p.Clients {
				if err := clinet.Conn.WriteJSON(BroadcastMsg.Msg); err != nil {
					return
				}
			}

		}
	}
}

func NewPoolMainChat() *PoolMainChat {
	name := utils.RandString(16)
	pool := &PoolMainChat{
		Name:       name,
		Register:   make(chan *ClientMainChat),
		Unregister: make(chan *ClientMainChat),
		Clients:    make(map[*ClientMainChat]string),
		Broadcast:  make(chan BroadcastMsg),
	}

	return pool
}

func (p *PoolMainChat) onlineClients() []string {
	clients := make([]string, 0)
	for _, v := range p.Clients {
		clients = append(clients, v)
	}
	return clients
}
