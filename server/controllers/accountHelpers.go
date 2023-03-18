package controllers

import (
	"math/rand"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/teatou/bank/server/models"
)

func newAccount(firstName, lastName, password string) *models.Account {
	return &models.Account{
		FirstName:         firstName,
		LastName:          lastName,
		EncryptedPassword: password,
		Number:            int64(rand.Intn(1000000)),
		CreatedAt:         time.Now().UTC(),
	}
}

func createJWT(acc *models.Account) (string, error) {
	claims := &jwt.MapClaims{
		"expiresAt": time.Now().Add(time.Hour * 24 * 30).Unix(),
		"number":    acc.Number,
	}

	secret := os.Getenv("JWT_SECRET")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(secret))
}
