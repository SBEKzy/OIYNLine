package controller

import (
	"fmt"
	"net/http"

	models "github.com/OIYNLine/model"
	"github.com/gin-gonic/gin"
)

func (s *Server) Catalog(c *gin.Context) {
	var games []models.Game
	data := make(map[int]string)
	if err := s.DB.Debug().Find(&games).Error; err != nil {
		fmt.Println("Catalog - error - ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"err":    "cound not get data from database",
		})
		return
	}

	for _, v := range games {
		data[v.ID] = v.Name
	}
	fmt.Println("Catalog - success - ", games)
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   data,
	})
}
