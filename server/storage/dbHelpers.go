package storage

import (
	"database/sql"

	"github.com/teatou/bank/server/models"
)

func ConnectToDb() {
	var err error
	DB, err = NewPostgresStore()
	if err != nil {
		panic("failed to connect to DB")
	}
}

func scanIntoAccount(rows *sql.Rows) (*models.Account, error) {
	account := new(models.Account)
	err := rows.Scan(
		&account.ID,
		&account.FirstName,
		&account.LastName,
		&account.Number,
		&account.EncryptedPassword,
		&account.Balance,
		&account.CreatedAt)

	return account, err
}
