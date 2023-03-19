package controllers

import (
	"math/rand"
	"time"

	"github.com/teatou/bank/server/models"
)

func newAccount(firstName, lastName, password string) *models.Account {
	rand.Seed(time.Now().UnixNano())
	number := 100000 + rand.Intn(900000)

	return &models.Account{
		FirstName: firstName,
		LastName:  lastName,
		Password:  password,
		Number:    int64(number),
		CreatedAt: time.Now().UTC(),
	}
}
