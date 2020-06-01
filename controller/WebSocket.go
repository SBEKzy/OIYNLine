package controller

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

func Upgrade(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	var upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin:     func(r *http.Request) bool { return true },
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	return conn, nil
}

func (s *Server) serveWs(c *gin.Context) {
	//var user models.User

	conn, err := Upgrade(c.Writer, c.Request)
	//log.Print(conn)
	if err != nil {
		fmt.Fprintf(c.Writer, "%+V\n", err)
	}
	var pool *Pool
	poolId := c.Param("id")
	poolType := c.Query("type")
	if len(freePools) > 0 {
		for _, p := range freePools {
			pool = p
			break
		}
	} else {
		pool = NewPool()
		go pool.Start()
	}
	pool = NewPool()
	go pool.Start()
	client := &Client{
		Conn: conn,
		Pool: pool,
	}
	result := FreePool{Name: pool.Name}
	if err := s.DB.Debug().Create(&result).Error; err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"err": "InternalServerError"})
		return
	}
	//log.Printf("-----", user.Username)
	pool.Register <- client
	//log.Printf("-------", pool.Register)
	client.Read(s)
}
