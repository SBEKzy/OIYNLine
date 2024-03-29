package controller

import (
	"log"

	"github.com/OIYNLine/controller/utils"
)

var freePools = make(map[string]*Pool)

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
	return pool
}

func (p *Pool) Start() {
	defer func() {
		delete(freePools, p.Name)
		log.Print("Pool closed:", p.Name)
	}()

	for {
		select {
		case client := <-p.Register:
			p.Clients[client] = true
			if len(p.Clients) == 2 {
				delete(freePools, p.Name)
				for client, _ := range p.Clients {
					client.Conn.WriteJSON(Message{Type: 1, Gamer: len(p.Clients), Body: bbb, Ready: len(p.ReadyClients)})
				}
			}

		case client := <-p.Unregister:
			delete(p.Clients, client)
			delete(p.ReadyClients, client)
			if len(p.Clients) == 0 {
				return
			}
			for clinet, _ := range p.Clients {
				clinet.Conn.WriteJSON(Message{Type: 1, Gamer: len(p.Clients), Body: bbb, Ready: len(p.ReadyClients)})
			}

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
