package controller

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type LivePool struct {
	ID          int    `gorm:"primary_key;auto_increment" json:"id"`
	Name        string `gorm:"size:255;" json:"name"`
	Player1     string `gorm:"size:255;" json:"player1"`
	Player2     string `gorm:"size:255;" json:"player2"`
	PlayerCount int    `gorm:"size:255;" json:"playercount"`
}

type EndPool struct {
	ID          int    `gorm:"primary_key;auto_increment" json:"id"`
	Name        string `gorm:"size:255;" json:"name"`
	Player1     string `gorm:"size:255;" json:"player1"`
	Player2     string `gorm:"size:255;" json:"player2"`
	PlayerCount int    `gorm:"size:255;" json:"playercount"`
	Win         int    `gorm:"size:255;" json:"playercount"`
}

func (s *Server) TictacMenu(c *gin.Context) {
	var freepools []FreePool
	log.Println("sdfghjkwoiuytghj")
	if err := s.DB.Debug().Find(&freepools).Error; err != nil {
		fmt.Println("FreePool - Error - ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"Error": "InternalServerError.",
		})
		return
	}
	/*achievements := getFreepools(freepools, s)*/
	log.Println("sdfghjkwoiuytghj")
	log.Println(freepools)
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   freepools,
	})
}

/*
type achievement struct {
	Amount     int
	AmountWin  int
	AmountLose int
	LevelUser  int
	Game       map[int]*gameAchievement
}
/*
type gameAchievement struct {
	Name       string
	Amount     int
	AmountWin  int
	AmountLose int
	LevelGame  int
}

func getFreepools(f []FreePool, s *Server) freepoolres {
	var achievements achievement
	var gameAchievements map[int]*gameAchievement

	gameAchievements = make(map[int]*gameAchievement)
	achievements.Amount = len(histories)
	amoutwin := 0
	amoutlose := 0
	for _, v := range f {
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
*/
