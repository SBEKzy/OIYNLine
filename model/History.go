package model

import "time"

// History модель для достижений
type History struct {
	ID      int       `gorm:"primary_key;auto_increment" json:"id"`
	GameID  int       `gorm:"size:255;" json:"gameid"`
	Win     int       `gorm:"size:255;" json:"win"`
	GamerID int       `gorm:"size:255;" json:"gamerid"`
	Date    time.Time `gorm:"size:255;" json:"date"`
}
