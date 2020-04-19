package controller

import (
	"log"
	"strings"

	"github.com/OIYNLine/controller/utils"
	"github.com/gorilla/websocket"
)

var freePools = make(map[string]*Pool)
var poolsCount int

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
	Name         string
	Register     chan *Client
	Unregister   chan *Client
	Clients      map[*Client]bool
	Broadcast    chan Message
	ReadyClients map[*Client]bool
	Ready        chan *Client
}

func NewPool() *Pool {
	name := utils.RandString(16)

	//go pool.Start()
	pool := &Pool{
		Name:         name,
		Register:     make(chan *Client),
		Unregister:   make(chan *Client),
		Clients:      make(map[*Client]bool),
		Broadcast:    make(chan Message),
		ReadyClients: make(map[*Client]bool),
		Ready:        make(chan *Client),
	}

	freePools[name] = pool
	poolsCount++

	return pool
}

func (p *Pool) Start() {
	defer func() {
		delete(freePools, p.Name)
		poolsCount--
		log.Print("Pool closed:", p.Name)
	}()

	for {
		select {
		case client := <-p.Register:
			p.Clients[client] = true
			log.Print("-----------------------------------", len(p.Clients))
			log.Print("-----------------------------------", freePools)
			if len(p.Clients) == 2 {
				log.Print("-----------------------------------", len(p.Clients))
				delete(freePools, p.Name)
				for client, _ := range p.Clients {
					client.Conn.WriteJSON(Message{Type: 1, Gamer: len(p.Clients), Body: bbb, Ready: len(p.ReadyClients)})
				}
			}

			break
		case client := <-p.Unregister:
			delete(p.Clients, client)
			delete(p.ReadyClients, client)
			for clinet, _ := range p.Clients {
				clinet.Conn.WriteJSON(Message{Type: 1, Gamer: len(p.Clients), Body: bbb, Ready: len(p.ReadyClients)})
			}
			if len(p.Clients) == 0 {
				return
			}
			break
		case message := <-p.Broadcast:
			for clinet, _ := range p.Clients {
				if err := clinet.Conn.WriteJSON(message); err != nil {
					return
				}
			}
		case ReadyClients := <-p.Ready:
			if ReadyClients.Ready {
				p.ReadyClients[ReadyClients] = true
			} else {
				delete(p.ReadyClients, ReadyClients)
			}
			for clinet, _ := range p.Clients {
				clinet.Conn.WriteJSON(Message{Type: 1, Gamer: len(p.Clients), Body: bbb, Ready: len(p.ReadyClients)})
			}
		}

	}
}

func Convert(b *[]byte) []string {
	sp := strings.Split(string(*b), ",")
	/*err := json.Unmarshal(*b, &str)

	if err != nil {
		return nil, err
	}*/
	//cstr := str[1 : len(str)-3]
	return sp

}
