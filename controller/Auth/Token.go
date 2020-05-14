package Auth

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"strings"

	"github.com/dgrijalva/jwt-go"
)

func CreateToken(id int, role string) (string, error) {
	claims := jwt.MapClaims{}
	claims["authorized"] = true
	claims["id"] = id
	if role == "admin" {
		claims["admin"] = true
	} else {
		claims["admin"] = false
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte("99hbun99h")) // env file write
}

func ValidToken(r *http.Request, admin bool) error {
	tokenString := ExtractToken(r)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("99hbun99h"), nil
	})
	if err != nil {
		return err
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		fmt.Println("ValidToken - ", claims)
		Pretty(claims)
		fmt.Println("ValidToken - ", claims["admin"])
		var e error
		if admin && !(claims["admin"] == true) {
			return e
		}
	}

	return nil
}

func ExtractToken(r *http.Request) string {
	keys := r.URL.Query()
	token := keys.Get("token")
	if token != "" {
		return token
	}
	bearerToken := r.Header.Get("Authorization")
	fmt.Println("ExtractToken - ", bearerToken)
	if len(strings.Split(bearerToken, " ")) == 2 { // bearerToken ?
		return strings.Split(bearerToken, " ")[1]
	}
	return ""
}

func Pretty(data interface{}) {
	b, err := json.MarshalIndent(data, "", " ") //?
	if err != nil {
		log.Println(err)
		return
	}

	fmt.Println(string(b))

}
