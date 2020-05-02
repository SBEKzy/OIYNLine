package model

type MyGames struct {
	ID      int `gorm:"primary_key;auto_increment" json:"id"`
	GamerID int `gorm:"size:255;" json:"gameid"`
	GameID  int `gorm:"size:255;" json:"gemerid"`
}
