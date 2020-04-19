package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (s *Server) MyGames(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Hello",
	})
}
