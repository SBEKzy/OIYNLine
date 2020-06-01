package controller

import (
	"encoding/json"
	"log"
	"strings"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID    string
	Conn  *websocket.Conn
	Pool  *Pool
	Ready bool
}

type Message struct {
	Type    int                    `json:"type"`
	Gamer   int                    `json:"gamer"`
	Body    []string               `json:"body"`
	Nothing *MsgPlayerNameRegister `json:"nothing"`
	Ready   int                    `json:"ready"`
}

type MsgPlayerNameRegister struct {
	Name string `json:"name"`
	Type string `json:"type"`
}

var bbb = []string{"", "", "", "", "", "", "", "", ""}

func (c *Client) Read(s *Server) {

	var freePool FreePool
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()
	for {
		log.Println("BEKZYYYYYYYY")
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		var body *MsgPlayerNameRegister
		err = json.Unmarshal(p, &body)
		log.Println(body)
		log.Println(body.Name)
		log.Println(body.Type)
		if body.Type == "register" {
			log.Println(body.Type)
			s.DB.Where("name = ?", c.Pool.Name).Find(&freePool)
			/*if err := s.DB.Debug().Where("name = ?", c.Pool.Name).Find(&freePool).Error; err != nil {
				log.Println("Can not find username in database: ", c.Pool.Name)
				return
			}*/
			log.Println(c.Pool.Name)
			if freePool.Player1 != "" {
				s.DB.Model(&freePool).Where("name = ?", c.Pool.Name).Update("Player2", body.Name)
			} else {
				s.DB.Model(&freePool).Where("name = ?", c.Pool.Name).Update("Player1", body.Name)
			}
		}

		/*if body[0] == "ready" {
			c.Ready = true
			c.Pool.Ready <- c
			body[0] = body[1]
		} else if body[0] == "notready" {
			c.Ready = false
			c.Pool.Ready <- c
			body[0] = body[1]
		}*/

		message := Message{Type: messageType, Gamer: len(c.Pool.Clients), Nothing: body, Ready: len(c.Pool.ReadyClients)}
		c.Pool.Broadcast <- message
	}
}

func Convert(b *[]byte) []string {
	sp := strings.Split(string(*b), ",")

	return sp

}
