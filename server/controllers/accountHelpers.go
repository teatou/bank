package controllers

import (
	"math/rand"
	"time"

	"github.com/teatou/bank/server/models"
)

func newAccount(firstName, lastName, password string) *models.Account {
	return &models.Account{
		FirstName: firstName,
		LastName:  lastName,
		Password:  password,
		Number:    int64(rand.Intn(1000000)),
		CreatedAt: time.Now().UTC(),
	}
}
