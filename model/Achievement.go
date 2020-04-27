package model

// Achievement модель для достижений
type Achievement struct {
	ID         int `gorm:"primary_key;auto_increment" json:"id"`
	GameID     int `gorm:"size:255;" json:"gameid"`
	Amount     int `gorm:"size:255;" json:"amount"`
	AmountWin  int `gorm:"size:255;" json:"amountwin"`
	AmountLose int `gorm:"size:255;" json:"amountlose"`
	GamerID    int `gorm:"size:255;" json:"gamerid"`
}
