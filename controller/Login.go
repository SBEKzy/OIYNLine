package controller

import (
	"fmt"
	"log"
	"net/http"

	auth "github.com/OIYNLine/controller/Auth"
	security "github.com/OIYNLine/controller/security"
	models "github.com/OIYNLine/model"
	"github.com/gin-gonic/gin"
)

func (s *Server) Login(c *gin.Context) {
	var user models.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  "Cannot unmarshal body",
		})
		return
	}

	data, err := s.signIn(user.Email, user.Password)

	if err != nil {
		fmt.Println("Error signin ", err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  "Error to sign in user",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": data,
	})

}

func (s *Server) signIn(email, password string) (map[string]interface{}, error) {
	var user models.User
	userData := make(map[string]interface{})
	if err := s.DB.Debug().Model(models.User{}).Where("email = ?", email).Take(&user).Error; err != nil {
		fmt.Println("Error to getting the user", err)
		return nil, err
	}

	if err := security.VerifyPassword(user.Password, password); err != nil {
		fmt.Println("Error to hash password", err)
		return nil, err
	}

	token, err := auth.CreateToken(user.ID, user.Role)
	if err != nil {
		fmt.Println("Error to create token ", err)
		return nil, err
	}
	cl := &Client{
		ID: make(chan string),
	}
	cl.ID <- user.Username
	log.Print(cl.ID)
	userData["token"] = token
	userData["id"] = user.ID
	userData["email"] = user.Email
	userData["role"] = user.Role
	userData["username"] = user.Username
	return userData, nil
}
