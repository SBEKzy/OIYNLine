package controller

import (
	"fmt"
	"net/http"

	models "github.com/OIYNLine/model"
	"github.com/gin-gonic/gin"
)

func (s *Server) Register(c *gin.Context) {
	var user models.User
	err := c.BindJSON(&user)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status":      http.StatusUnprocessableEntity,
			"first error": "Unable to get request",
		})
		return
	}
	//валидация жасауга болады
	fmt.Println("-*-*-*")
	fmt.Println(user)
	err = s.DB.Create(&user).Error
	fmt.Println("-*-*-*")
	fmt.Println(err)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"status":   http.StatusCreated,
		"response": user,
	})
}
