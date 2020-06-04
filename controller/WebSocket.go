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
	conn, err := Upgrade(c.Writer, c.Request)
	if err != nil {
		fmt.Fprintf(c.Writer, "%+V\n", err)
	}
	//var user models.User
	//log.Print(conn)
	// log.Println(":::::::::::::::::::::::::::::")
	// log.Println(poolId)
	// log.Println(poolType)
	// log.Println(":::::::::::::::::::::::::::::")
	var pool *Pool
	poolID := c.Param("id")
	poolType := c.Query("type")
	if poolType == "join" {
		for _, p := range freePools {
			pool = p
			break
		}
	} else if poolType == "create" {
		pool = NewPool(poolID)
		go pool.Start()
	}
	client := &Client{
		Conn: conn,
		Pool: pool,
	}
	result := FreePool{Name: pool.Name}
	log.Println(result)
	if poolType == "create" {
		if err := s.DB.Debug().Create(&result).Error; err != nil {
			fmt.Println(err)
			c.JSON(http.StatusInternalServerError, gin.H{"err": "InternalServerError"})
			return
		}
	}
	pool.Register <- client
	client.Read(s)
}
