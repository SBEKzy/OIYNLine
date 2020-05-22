package model

type User struct {
	ID       int    `gorm:"primary_key;auto_increment" json:"id"`
	Email    string `gorm:"size:255;not null;unique" json:"email"`
	Password string `gorm:"size:100;not null;" json:"password"`
	Username string `gorm:"size:100;not null;unique" json:"username"`
	Name     string `gorm:"size:100;not null" json:"name"`
	LName    string `gorm:"size:100;not null" json:"lastname"`
	Des      string `gorm:"size:100;not null" json:"des"`
	Role     string `gorm:"size:100;not null" json:"role"`
}
