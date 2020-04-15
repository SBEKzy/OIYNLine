package security

import (
	"golang.org/x/crypto/bcrypt"
)

func Hash(password string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
}

func VerifyPassword(HashPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(HashPassword), []byte(password))
}
