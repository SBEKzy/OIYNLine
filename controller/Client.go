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

type Pool struct {
	Register     chan *Client
	Unregister   chan *Client
	Clients      map[*Client]bool
	Broadcast    chan Message
	ReadyClients map[*Client]bool
	Ready        chan *Client
}

func NewPool() *Pool {
	return &Pool{
		Register:     make(chan *Client),
		Unregister:   make(chan *Client),
		Clients:      make(map[*Client]bool),
		Broadcast:    make(chan Message),
		ReadyClients: make(map[*Client]bool),
		Ready:        make(chan *Client),
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			for client, _ := range pool.Clients {
				client.Conn.WriteJSON(Message{Type: 1, Gamer: len(pool.Clients), Body: bbb, Ready: len(pool.ReadyClients)})
			}
			break
		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			delete(pool.ReadyClients, client)
			for clinet, _ := range pool.Clients {
				clinet.Conn.WriteJSON(Message{Type: 1, Gamer: len(pool.Clients), Body: bbb, Ready: len(pool.ReadyClients)})
			}
			break
		case message := <-pool.Broadcast:
			for clinet, _ := range pool.Clients {
				if err := clinet.Conn.WriteJSON(message); err != nil {
					return
				}
			}
		case ReadyClients := <-pool.Ready:
			if ReadyClients.Ready {
				pool.ReadyClients[ReadyClients] = true
			} else {
				delete(pool.ReadyClients, ReadyClients)
			}
			for clinet, _ := range pool.Clients {
				clinet.Conn.WriteJSON(Message{Type: 1, Gamer: len(pool.Clients), Body: bbb, Ready: len(pool.ReadyClients)})
			}
		}

	}
}

func Convert(b *[]byte) []string {
	var str []string
	sp := strings.Split(string(*b), ",")
	/*err := json.Unmarshal(*b, &str)

	if err != nil {
		return nil, err
	}*/
	//cstr := str[1 : len(str)-3]
	return sp

}
