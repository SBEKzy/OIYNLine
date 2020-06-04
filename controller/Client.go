package controller

import (
	"encoding/json"
	"fmt"
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
		log.Println("BEKZYYY234234Y")
		messageType, p, err := c.Conn.ReadMessage()
		log.Println(err)
		if err != nil {
			log.Println(err)
			return
		}
		var body *MsgPlayerNameRegister
		test := body
		log.Println("BEKZYYY234234Y123")
		err = json.Unmarshal(p, &body)
		log.Println("BEKZYYY234234Y121233")
		log.Println(p)
		if err == nil {
			log.Println(body)
			log.Println("BEKZY123456789")
			log.Println(body.Name)
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
			s.DB.Model(&freePool).Where("name = ?", c.Pool.Name).Update("Player_Count", len(c.Pool.Clients))
			result := LivePool{Name: freePool.Name, Player1: freePool.Player1, Player2: freePool.Player2, PlayerCount: freePool.PlayerCount}
			if len(c.Pool.Clients) == 2 {
				if err := s.DB.Debug().Create(&result).Error; err != nil {
					fmt.Println(err)
					return
				}
				s.DB.Delete(&freePool)
			}
			log.Println(result)
			message := Message{Type: messageType, Gamer: len(c.Pool.Clients), Nothing: body, Ready: len(c.Pool.ReadyClients)}
			c.Pool.Broadcast <- message
		} else {
			body := Convert(&p)
			log.Println(body)
			if body[0] == "ready" {
				c.Ready = true
				c.Pool.Ready <- c
				body[0] = body[1]
			} else if body[0] == "notready" {
				c.Ready = false
				c.Pool.Ready <- c
				body[0] = body[1]
			}
			log.Println(c.Pool)
			message := Message{Type: messageType, Gamer: len(c.Pool.Clients), Body: body, Nothing: test, Ready: len(c.Pool.ReadyClients)}
			log.Println(message)
			c.Pool.Broadcast <- message
		}

		// result := LivePool{ID:freePool.ID,Name: freePool.Name,}
		// log.Println(&freePool)
		// if err := s.DB.Debug().Create(&result).Error; err != nil {
		// 	fmt.Println(err)
		// 	c.JSON(http.StatusInternalServerError, gin.H{"err": "InternalServerError"})
		// 	return
		// }
		/*if body[0] == "ready" {
			c.Ready = true
			c.Pool.Ready <- c
			body[0] = body[1]
		} else if body[0] == "notready" {
			c.Ready = false
			c.Pool.Ready <- c
			body[0] = body[1]
		}*/
		// if len(c.Pool.ReadyClients) == 2 {
		// 	s.DB.Where("email = ?", c.Pool.Name).Delete(&freePool)
		// }

	}
}

func Convert(b *[]byte) []string {
	sp := strings.Split(string(*b), ",")

	return sp

}
