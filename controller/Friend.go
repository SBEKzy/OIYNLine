package controller

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/OIYNLine/model"
	"github.com/gin-gonic/gin"
)

func (s *Server) FriendRequest(c *gin.Context) {
	var friend model.Friend
	if err := c.BindJSON(&friend); err != nil {
		fmt.Println("FriendRequest - ", err)
		return
	}
	friend.Date = time.Now()
	friend.Request = true
	if err := s.DB.Debug().Model(&model.Friend{}).Create(&friend).Error; err != nil {
		fmt.Println("FriendRequest - ", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
	})
}

type dataFriends struct {
	Username string `json:"username"`
	Name     string `json:"name"`
	LName    string `json:"lastname"`
	Des      string `json:"des"`
}

func (s *Server) Friends(c *gin.Context) {
	var id int
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		fmt.Println("Friends - ", err)
		return
	}
	var friends []model.Friend
	var friendRequest []int
	var myFriend []int
	if err := s.DB.Debug().Find(&friends).Error; err != nil {
		fmt.Println("Friends - ", err)
		return
	}
	for _, v := range friends {
		if v.FriendID == id && v.Request {
			friendRequest = append(friendRequest, v.OwnID)
		}
		if v.OwnID == id && !v.Request {
			myFriend = append(myFriend, v.FriendID)
		}
	}
	//-------------------------------------
	var reqFriend []dataFriends
	var myfriends []dataFriends
	var users []model.User
	if err := s.DB.Debug().Find(&users).Error; err != nil {
		fmt.Println("Friends - ", err)
		return
	}

	for _, f := range friendRequest {
		for _, v := range users {
			if f == v.ID {
				req := dataFriends{}
				req.Des = v.Des
				req.LName = v.LName
				req.Name = v.Name
				req.Username = v.Username
				reqFriend = append(reqFriend, req)
			}
		}
	}

	for _, f := range friendRequest {
		for _, v := range users {
			if f == v.ID {
				req := dataFriends{}
				req.Des = v.Des
				req.LName = v.LName
				req.Name = v.Name
				req.Username = v.Username
				myfriends = append(myfriends, req)
			}
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"req":    reqFriend,
		"my":     myfriends,
	})
}
