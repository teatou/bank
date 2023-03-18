package storage

import (
	"database/sql"
	"os"

	"github.com/teatou/bank/server/models"
)

func NewPostgresStore() (*PostgresStore, error) {
	connStr := os.Getenv("DB_CONN")

	DB, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	if err := DB.Ping(); err != nil {
		return nil, err
	}

	return &PostgresStore{
		DB: DB,
	}, nil
}

func (s *PostgresStore) Init() error {
	return s.createAccountTable()
}

func (s *PostgresStore) createAccountTable() error {
	query := `create table if not exists account (
		id serial primary key,
		first_name varchar(100),
		last_name varchar(100),
		number serial,
		encrypted_password varchar(100),
		balance serial,
		created_at timestamp
	)`

	_, err := s.DB.Exec(query)
	return err
}

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
