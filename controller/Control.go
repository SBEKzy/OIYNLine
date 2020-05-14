package controller

import (
	"fmt"
	"net/http"

	models "github.com/OIYNLine/model"
	"github.com/gin-gonic/gin"
)

func (s *Server) Control(c *gin.Context) {
	var games []models.Game
	if err := s.DB.Debug().Find(&games).Error; err != nil {
		fmt.Println("Control - error - ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"err":    "cound not get data from database",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   games,
	})
}
