package controller

import (
	"fmt"
	"net/http"

	models "github.com/OIYNLine/model"
	"github.com/gin-gonic/gin"
)

func (s *Server) AccountGet(c *gin.Context) {
	username := c.Param("username")
	var user models.User
	if err := s.DB.Debug().Model(models.User{}).Where("username = ?", username).Take(&user).Error; err != nil {
		fmt.Println("Can not find username in database: ", username)
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  "Can not find username in database",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"user":   user,
	})
}

func (s *Server) AccountPut(c *gin.Context) {
	fmt.Println("helloooooooooooooooooooo")
	var user models.User
	userData := make(map[string]interface{})
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  "Cannot unmarshal body",
		})
		return
	}
	fmt.Println(user)
	if err := s.DB.Debug().Model(&user).Updates(user).Error; err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "Cannot update row",
		})
		return
	}
	userData["id"] = user.ID
	userData["email"] = user.Email
	userData["username"] = user.Username
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"user":   userData,
	})
}
