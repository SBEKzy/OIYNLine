package controller

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type DataResultGame struct {
	Gamer  string `json:"gamer"`
	Game   int    `json:"game"`
	Result string `json:"result"`
}

func (s *Server) ResultGame(c *gin.Context) {
	var data DataResultGame
	if err := c.BindJSON(&data); err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(data)
}
