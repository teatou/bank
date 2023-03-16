package controllers

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/teatou/bank/server/models"
)

func createJWT(acc *models.Account) (string, error) {
	claims := &jwt.MapClaims{
		"expiresAt": time.Now().Add(time.Hour * 24 * 30).Unix(),
		"number":    acc.Number,
	}

	secret := os.Getenv("JWT_SECRET")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(secret))
}
