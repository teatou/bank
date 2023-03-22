package models

import "time"

type Transaction struct {
	ID        int       `json:"id"`
	From      int       `json:"from"`
	To        int       `json:"to"`
	Sum       int       `json:"sum"`
	CreatedAt time.Time `json:"createdAt"`
}
