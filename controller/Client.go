package controller

import (
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
	Type  int      `json:"type"`
	Gamer int      `json:"gamer"`
	Body  []string `json:"body"`
	Ready int      `json:"ready"`
}

var bbb = []string{"", "", "", "", "", "", "", "", ""}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()
	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		body := Convert(&p)
		if body[0] == "ready" {
			c.Ready = true
			c.Pool.Ready <- c
			body[0] = body[1]
		} else if body[0] == "notready" {
			c.Ready = false
			c.Pool.Ready <- c
			body[0] = body[1]
		}

		message := Message{Type: messageType, Gamer: len(c.Pool.Clients), Body: body, Ready: len(c.Pool.ReadyClients)}
		c.Pool.Broadcast <- message
	}
}

func Convert(b *[]byte) []string {
	sp := strings.Split(string(*b), ",")

	return sp

}
