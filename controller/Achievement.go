package controller

import (
	"fmt"
	"net/http"

	"github.com/OIYNLine/model"
	"github.com/gin-gonic/gin"
)

func (s *Server) Achievement(c *gin.Context) {
	var histories []model.History
	id := c.Param("id")
	if err := s.DB.Debug().Where("gamer_id = ?", id).Find(&histories).Error; err != nil {
		fmt.Println("Achievement - Error - ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"Error": "InternalServerError.",
		})
		return
	}
	achievements := getAchievements(histories, s)
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   achievements,
	})
}

type achievement struct {
	Amount     int
	AmountWin  int
	AmountLose int
	LevelUser  int
	Game       map[int]*gameAchievement
}

type gameAchievement struct {
	Name       string
	Amount     int
	AmountWin  int
	AmountLose int
	LevelGame  int
}

func getAchievements(histories []model.History, s *Server) achievement {
	var achievements achievement
	var gameAchievements map[int]*gameAchievement

	gameAchievements = make(map[int]*gameAchievement)
	achievements.Amount = len(histories)
	amoutwin := 0
	amoutlose := 0
	for _, v := range histories {
		if _, e := gameAchievements[v.GameID]; !e {
			var game model.Game
			s.DB.Model(model.Game{}).Where("id = ?", v.GameID).Take(&game)
			gameAchievements[v.GameID] = &gameAchievement{Name: game.Name}
		}
		gameAchievement := gameAchievements[v.GameID]
		if v.Win == 1 {
			amoutwin++
			gameAchievement.AmountWin++
			if gameAchievement.AmountWin%5 == 0 {
				gameAchievement.LevelGame++
			}
		} else if v.Win == 0 {
			amoutlose++
			gameAchievement.AmountLose++
			if gameAchievement.AmountLose%5 == 0 && gameAchievement.LevelGame != 0 {
				gameAchievement.LevelGame--
			}
		}
		gameAchievement.Amount++
		fmt.Println("gameAchievement", gameAchievement)
	}
	achievements.AmountWin = amoutwin
	achievements.AmountLose = amoutlose
	if achievements.AmountWin > achievements.AmountLose {
		achievements.LevelUser = achievements.AmountWin / 5
		if achievements.AmountLose > 5 {
			achievements.LevelUser = achievements.LevelUser - achievements.AmountLose/5
		}
	}
	achievements.Game = gameAchievements
	return achievements
}
