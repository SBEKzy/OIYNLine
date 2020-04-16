package controller

import (
	"fmt"
	"net/http"

	security "github.com/OIYNLine/controller/security"
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
	hashPass, errr := security.Hash(user.Password)
	if errr != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status":      http.StatusUnprocessableEntity,
			"first error": "Error to hash password",
		})
		return
	}
	user.Password = string(hashPass)
	err = s.DB.Create(&user).Error

	if err != nil {
		fmt.Println("ERRRRooooooooorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "Email or username a exict",
			"code":   "5",
		})
		c.Error(err).SetMeta("BEKzy 2")
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"status":   http.StatusCreated,
		"response": user,
	})
}
