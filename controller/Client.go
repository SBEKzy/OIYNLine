package controller

import (
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
	fmt.Println("Clinet_read_Method_1")
	for {
		fmt.Println("Clinet_read_Method_2")
		messageType, p, err := c.Conn.ReadMessage()
		fmt.Println("Clinet_read_Method_3")
		if err != nil {
			log.Println(err)
			return
		}
		fmt.Println("Clinet_read_Method_4")
		body := Convert(&p)
		if body[0] == "ready" {
			fmt.Println("ready-----------")
			c.Ready = true
			c.Pool.Ready <- c
			body[0] = body[1]
		} else if body[0] == "notready" {
			fmt.Println("notready-----------")
			c.Ready = false
			c.Pool.Ready <- c
			body[0] = body[1]
		}

		message := Message{Type: messageType, Gamer: len(c.Pool.Clients), Body: body, Ready: len(c.Pool.ReadyClients)}
		c.Pool.Broadcast <- message
		fmt.Printf("Message Received: %+v\n", message)
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
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for client, _ := range pool.Clients {
				fmt.Println(client)
				client.Conn.WriteJSON(Message{Type: 1, Gamer: len(pool.Clients), Body: bbb, Ready: len(pool.ReadyClients)})
			}
			break
		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			delete(pool.ReadyClients, client)
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for clinet, _ := range pool.Clients {
				clinet.Conn.WriteJSON(Message{Type: 1, Gamer: len(pool.Clients), Body: bbb, Ready: len(pool.ReadyClients)})
			}
			break
		case message := <-pool.Broadcast:
			fmt.Println("Sending message to all clients in Pool")
			for clinet, _ := range pool.Clients {
				if err := clinet.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}
		case ReadyClients := <-pool.Ready:
			if ReadyClients.Ready {
				fmt.Println("ReadyClients_true")
				pool.ReadyClients[ReadyClients] = true
			} else {
				fmt.Println("ReadyClients_delete")
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
	fmt.Println("from cionvert 1")
	fmt.Println(string(*b))
	sp := strings.Split(string(*b), ",")
	fmt.Println(sp)
	fmt.Println(sp[0])
	fmt.Println(len(sp))
	/*err := json.Unmarshal(*b, &str)

	if err != nil {
		fmt.Println("from cionvert 2")
		return nil, err
	}*/
	//cstr := str[1 : len(str)-3]
	fmt.Println("from cionvert 3")
	fmt.Println(str)
	return sp

}
