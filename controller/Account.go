package controller

import (
	"fmt"
	"net/http"

	security "github.com/OIYNLine/controller/security"
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
	if user.Password != "" {
		hashPass, errr := security.Hash(user.Password)
		if errr != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{
				"status":      http.StatusUnprocessableEntity,
				"first error": "Error to hash password",
			})
			return
		}
		user.Password = string(hashPass)
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

type AccountCheckk struct {
	Username string `json:"username"`
	Email    string `json:"email"`
}

func (s *Server) AccountCheck(c *gin.Context) {
	var check AccountCheckk
	if err := c.BindJSON(&check); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  "can not unmarshal",
		})
	}
	var data models.User
	if check.Username != "" {
		s.DB.Debug().Where("username = ?", check.Username).Attrs(models.User{Username: ""}).FirstOrInit(&data)
	} else {
		s.DB.Debug().Where("email = ?", check.Email).Attrs(models.User{Email: ""}).FirstOrInit(&data)
	}
	if data.ID == 0 {
		c.JSON(http.StatusOK, gin.H{
			"status": http.StatusOK,
			"res":    "NOTEXIST",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"res":    "EXIST",
	})

}
