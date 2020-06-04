package controller

import (
	"log"
)

var freePools = make(map[string]*Pool)

//var allRooms = make(map[string]*)

type Pool struct {
	Name         string
	Register     chan *Client
	Unregister   chan *Client
	Clients      map[*Client]bool
	Broadcast    chan Message
	ReadyClients map[*Client]bool
	Ready        chan *Client
}

type FreePool struct {
	ID          int    `gorm:"primary_key;auto_increment" json:"id"`
	Name        string `gorm:"size:255;" json:"name"`
	Player1     string `gorm:"size:255;" json:"player1"`
	Player2     string `gorm:"size:255;" json:"player2"`
	PlayerCount int    `gorm:"size:255;" json:"playercount"`
}

//name := utils.RandString(16)
func NewPool(n string) *Pool {

	pool := &Pool{
		Name:         n,
		Register:     make(chan *Client),
		Unregister:   make(chan *Client),
		Clients:      make(map[*Client]bool),
		Broadcast:    make(chan Message),
		ReadyClients: make(map[*Client]bool),
		Ready:        make(chan *Client),
	}

	freePools[n] = pool
	log.Printf("Pool %s created", pool.Name)
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
			log.Printf("Client %d has joined to pool:%s", len(p.Clients), p.Name)
			if len(p.Clients) == 2 {
				delete(freePools, p.Name)
				for client, _ := range p.Clients {
					client.Conn.WriteJSON(Message{Type: 1, Gamer: len(p.Clients), Body: bbb, Ready: len(p.ReadyClients)})
				}
			}

		case client := <-p.Unregister:
			log.Printf("Client %d has leavеd to pool:%s", len(p.Clients), p.Name)
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
				log.Println(p.ReadyClients[ReadyClients])
			} else {
				delete(p.ReadyClients, ReadyClients)
			}
			for clinet, _ := range p.Clients {
				log.Println(Message{Type: 1, Gamer: len(p.Clients), Body: bbb, Ready: len(p.ReadyClients)})
				log.Println(p)
				clinet.Conn.WriteJSON(Message{Type: 1, Gamer: len(p.Clients), Body: bbb, Ready: len(p.ReadyClients)})
			}
		}

	}
}
