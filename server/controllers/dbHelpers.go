package controllers

import (
	"math/rand"
	"time"

	"github.com/teatou/bank/server/models"
)

func newTransaction(to, from, sum int) *models.Transaction {
	rand.Seed(time.Now().UnixNano())
	id := 1000000 + rand.Intn(9000000)

	return &models.Transaction{
		ID:        id,
		From:      from,
		To:        to,
		Sum:       sum,
		CreatedAt: time.Now().UTC(),
	}
}
