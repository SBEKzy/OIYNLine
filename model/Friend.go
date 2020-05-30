package model

import "time"

type Friend struct {
	ID       int       `gorm:"primary_key;auto_increment" json:"id"`
	OwnID    int       `gorm:"size:255;" json:"ownId"`
	FriendID int       `gorm:"size:255;" json:"friendID"`
	Request  bool      `gorm:"size:255;" json:"request"`
	Date     time.Time `gorm:"size:255;" json:"date"`
}
