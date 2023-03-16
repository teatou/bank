package storage

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
	"github.com/teatou/bank/server/models"
)

var DB *PostgresStore

type Storage interface {
	CreateAccount(*models.Account) error
	DeleteAccount(int) error
	UpdateAccount(*models.Account) error
	GetAccounts() ([]*models.Account, error)
	GetAccountByID(int) (*models.Account, error)
	GetAccountByNumber(int) (*models.Account, error)
}

type PostgresStore struct {
	DB *sql.DB
}

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

func (s *PostgresStore) CreateAccount(acc *models.Account) error {
	query := `insert into account 
	(first_name, last_name, number, encrypted_password, balance, created_at)
	values ($1, $2, $3, $4, $5, $6)`

	_, err := s.DB.Query(
		query,
		acc.FirstName,
		acc.LastName,
		acc.Number,
		acc.EncryptedPassword,
		acc.Balance,
		acc.CreatedAt)

	if err != nil {
		return err
	}

	return nil
}

func (s *PostgresStore) GetAccountByNumber(number int) (*models.Account, error) {
	rows, err := s.DB.Query("select * from account where number = $1", number)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		return scanIntoAccount(rows)
	}

	return nil, fmt.Errorf("account with number [%d] not found", number)
}
