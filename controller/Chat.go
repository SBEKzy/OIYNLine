package controller

/*
import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/OIYNLine/model"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var poolChat *PoolChat

func (s *Server) GetChat(c *gin.Context) {
	var chat []model.Chat
	id := c.Param("id")
	if err := s.DB.Debug().Find(&chat).Where("user_id = ? or user_id2 = ?", id); err != nil {
		fmt.Println("GetChat - ", err)
		return
	}
}

func (s *Server) Chat(c *gin.Context) {

	conn, err := Upgrade(c.Writer, c.Request)
	if err != nil {
		fmt.Fprintf(c.Writer, "%+V\n", err)
	}

	if flag {
		poolChat = newPool()
		go poolChat.Start()
		flag = false
	}
	client := &ClientChat{
		Conn: conn,
		Pool: poolChat,
	}
	poolChat.Register <- client
	client.PoolChatRead()
}

type PoolChat struct {
	Name       string
	Register   chan *ClientChat
	Unregister chan *ClientChat
	Clients    map[*ClientChat]string
	Broadcast  chan MsgChat
}

type ClientChat struct {
	ID   string
	Conn *websocket.Conn
	Pool *PoolChat
}

type MsgChat struct {
	Name string `json:"name"`
	Text string `json:"text"`
}

func newPool() *PoolChat {
	return &PoolChat{}
}

func (c *ClientChat) PoolChatRead() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()

	}()
	var body *MsgChat
	for {
		_, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		err = json.Unmarshal(p, &body)
		if err != nil {
			fmt.Println("unmarshal -- ", err)
			return
		}

		c.Pool.Broadcast <- *body
	}
}

func (p *PoolChat) Start() {
	defer func() {
		log.Print("PoolChat closed:", p.Name)
	}()
	for {
		select {
		case client := <-p.Register:
			fmt.Println("chatregister ", client)
			p.Clients[client] = "true"

			for client, _ := range p.Clients {
				client.Conn.WriteJSON("sdf")
			}

		case client := <-p.Unregister:
			delete(p.Clients, client)
			for clinet, _ := range p.Clients {
				clinet.Conn.WriteJSON(message)
			}

		case BroadcastMsg := <-p.Broadcast:

			for clinet, _ := range p.Clients {
				if err := clinet.Conn.WriteJSON(BroadcastMsg); err != nil {
					return
				}
			}

		}
	}
}
*/
