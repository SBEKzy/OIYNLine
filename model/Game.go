package model

type Game struct {
	ID          int    `gorm:"primary_key;auto_increment" json:"id"`
	Name        string `gorm:"size:255;" json:"name"`
	Description string `gorm:"size:255;" json:"description"`
	Rules       string `gorm:"size:255;" json:"rules"`
}
