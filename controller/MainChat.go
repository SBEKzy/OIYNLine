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
	Clients    map[*ClientMainChat]bool
	Broadcast  chan MsgMainChat
}

type MsgMainChat struct {
	Name     string `json:"name"`
	Text     string `json:"text"`
	Register int    `json:"register"`
}

func (c *ClientMainChat) PoolMainChatRead() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()
	for {
		_, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		var body MsgMainChat
		err = json.Unmarshal(p, &body)
		if err != nil {
			fmt.Println("unmarshal -- ", err)
			return
		}
		c.Pool.Broadcast <- body
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
			p.Clients[client] = true

			for client, _ := range p.Clients {
				client.Conn.WriteJSON("rtyuio")
			}

		case client := <-p.Unregister:
			delete(p.Clients, client)
			for clinet, _ := range p.Clients {
				clinet.Conn.WriteJSON("fdgfgdfgf")
			}

		case message := <-p.Broadcast:

			for clinet, _ := range p.Clients {
				if err := clinet.Conn.WriteJSON(message); err != nil {
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
		Clients:    make(map[*ClientMainChat]bool),
		Broadcast:  make(chan MsgMainChat),
	}

	return pool
}
