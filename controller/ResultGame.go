package controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/OIYNLine/model"

	"github.com/gin-gonic/gin"
)

type DataResultGame struct {
	Gamer  int    `json:"gamer"`
	Game   int    `json:"game"`
	Result string `json:"result"`
}

func (s *Server) ResultGame(c *gin.Context) {
	var data DataResultGame
	if err := c.BindJSON(&data); err != nil {
		fmt.Println(err)
		return
	}
	result := model.History{GameID: data.Game, GamerID: data.Gamer, Date: time.Now()}
	if data.Result == "win" {
		result.Win = 1
	} else if data.Result == "lose" {
		result.Win = 0
	} else {
		result.Win = 2
	}
	fmt.Println("***************")
	fmt.Println(data)
	if err := s.DB.Debug().Create(&result).Error; err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"err": "InternalServerError"})
		return
	}
}
