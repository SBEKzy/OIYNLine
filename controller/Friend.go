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
	friend.Request = false
	if err := s.DB.Debug().Model(&model.Friend{}).Create(&friend).Error; err != nil {
		fmt.Println("FriendRequest - ", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"friend": friend,
	})
}

type dataFriends struct {
	Username string `json:"username"`
	Name     string `json:"name"`
	LName    string `json:"lastname"`
	Des      string `json:"des"`
	Req      int    `json:"req"`
}

type friendRequestmodel struct {
	FriendId int `json:"friendId"`
	ReqId    int `json:"reqId"`
}

func (s *Server) Friends(c *gin.Context) {
	var id int
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		fmt.Println("Friends - ", err)
		return
	}
	var friends []model.Friend
	var friendRequest []friendRequestmodel
	var myFriend []int
	if err := s.DB.Debug().Find(&friends).Error; err != nil {
		fmt.Println("Friends - ", err)
		return
	}
	for _, v := range friends {
		if v.FriendID == id && !v.Request {
			temp := friendRequestmodel{
				FriendId: v.OwnID,
				ReqId:    v.ID,
			}
			friendRequest = append(friendRequest, temp)
		}
		if v.OwnID == id && v.Request {
			myFriend = append(myFriend, v.FriendID)
		} else if v.FriendID == id && v.Request {
			myFriend = append(myFriend, v.OwnID)
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
			if f.FriendId == v.ID {
				req := dataFriends{}
				req.Des = v.Des
				req.LName = v.LName
				req.Name = v.Name
				req.Username = v.Username
				req.Req = f.ReqId
				reqFriend = append(reqFriend, req)
			}
		}
	}

	for _, f := range myFriend {
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

func (s *Server) SearchFriend(c *gin.Context) {
	fmt.Println("--------------------------------------------")
	name := c.Param("name")
	fmt.Println(name)
	var users []model.User
	if err := s.DB.Debug().Where("name = ? or l_name = ? or username = ?", name, name, name).Find(&users).Error; err != nil {
		fmt.Println("SearchFriend - ", err)
		return
	}
	fmt.Println(users)
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"result": users,
	})
}

func (s *Server) FriendRequestAdd(c *gin.Context) {
	var friend model.Friend
	if err := c.BindJSON(&friend); err != nil {
		fmt.Println("FriendRequest - ", err)
		return
	}
	friend.Request = true
	fmt.Println(friend)
	if err := s.DB.Debug().Model(&friend).Updates(friend).Error; err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "Cannot update row",
		})
		return
	}
}
