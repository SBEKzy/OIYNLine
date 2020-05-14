package model

type User struct {
	ID       int    `gorm:"primary_key;auto_increment" json:"id"`
	Email    string `gorm:"size:255;not null;unique" json:"email"`
	Password string `gorm:"size:100;not null;" json:"password"`
	Username string `gorm:"size:100;not null;unique" json:"username"`
	Role     string `gorm:"size:100;not null" json:"role"`
}
