package controller

import (
	"fmt"
	"net/http"

	models "github.com/OIYNLine/model"
	"github.com/gin-gonic/gin"
)

type myGamesData struct {
	GameId   string `json:"gameId"`
	UserData int    `json:"user_data"`
}

func (s *Server) MyGames(c *gin.Context) {
	user := c.Param("user")
	var mygames []models.MyGames
	var games []models.Game
	s.DB.Debug().Where("gamer_id = ?", user).Find(&mygames)
	data := make(map[int]string)
	if err := s.DB.Debug().Find(&games).Error; err != nil {
		fmt.Println("Catalog - error - ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"err":    "cound not get data from database",
		})
		return
	}

	for _, v := range mygames {
		for _, g := range games {
			if v.GameID == g.ID {
				data[g.ID] = g.Name
			}
		}
	}

	fmt.Println("+++++++++++++++++++++++++++++++++++", mygames)
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   data,
	})
}

func (s *Server) MyGamesCheck(c *gin.Context) {
	var game models.Game
	var data myGamesData
	var mygames models.MyGames
	if err := c.BindJSON(&data); err != nil {
		fmt.Println("MyGamesCheck - error - ", err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  "Cannot unmarshal body",
		})
		return
	}
	s.DB.Debug().Model(models.Game{}).Where("name = ?", data.GameId).Take(&game)
	fmt.Println(data.UserData)
	fmt.Println(game.ID)
	s.DB.Debug().Model(models.MyGames{}).Where("gamer_id = ? and game_id = ?", data.UserData, game.ID).Take(&mygames)

	if mygames.GamerID == 0 && mygames.GameID == 0 {
		c.JSON(http.StatusOK, gin.H{
			"status": http.StatusOK,
			"data":   false,
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status": http.StatusOK,
			"data":   true,
		})
	}
}

func (s *Server) MyGamesDel(c *gin.Context) {
	var game models.Game
	GameId := c.Param("gId")
	UserData := c.Param("user")
	s.DB.Debug().Model(models.Game{}).Where("name = ?", GameId).Take(&game)

	if err := s.DB.Debug().Where("gamer_id = ? and game_id = ?", UserData, game.ID).Delete(&models.MyGames{}).Error; err != nil {
		fmt.Println("MyGamesDel - error -- ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "Cannot delete database",
		})
		return
	}
	fmt.Println("MyGamesDel - success")
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
	})
}

func (s *Server) MyGamesAdd(c *gin.Context) {
	var data myGamesData
	var game models.Game
	var mygames models.MyGames
	if err := c.BindJSON(&data); err != nil {
		fmt.Println("MyGamesAdd - error - ", err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  "Cannot unmarshal body",
		})
		return
	}
	s.DB.Debug().Model(models.Game{}).Where("name = ?", data.GameId).Take(&game)
	mygames.GameID = game.ID
	mygames.GamerID = data.UserData
	if err := s.DB.Debug().Create(&mygames).Error; err != nil {
		fmt.Println("MyGamesAdd - error - ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "Cannot add database",
		})
		return
	}
	fmt.Println("MyGamesAdd - success")
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
	})
}
