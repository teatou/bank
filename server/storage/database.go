package storage

import (
	"database/sql"
	"errors"
	"fmt"

	_ "github.com/lib/pq"
	"github.com/teatou/bank/server/models"
)

var DB *PostgresStore

type Storage interface {
	CreateAccount(*models.Account) error
	DeleteAccount(int) error
	UpdateBalance(*models.Account) error
	IsAccount(string, string) bool
	GetAccounts() ([]*models.Account, error)
	GetAccountByID(int) (*models.Account, error)
	GetAccountByNumber(int) (*models.Account, error)
}

type PostgresStore struct {
	DB *sql.DB
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
		acc.Password,
		1500,
		acc.CreatedAt)

	if err != nil {
		return err
	}

	return nil
}

func (s *PostgresStore) DeleteAccount(id int) error {
	_, err := s.GetAccountByID(id)
	if err != nil {
		return fmt.Errorf("no account by id %d", id)
	}

	_, err = s.DB.Query("delete from account where id = $1", id)
	return err
}

func (s *PostgresStore) GetAccounts() ([]*models.Account, error) {
	rows, err := s.DB.Query("select * from account")
	if err != nil {
		return nil, errors.New("error selecting from table")
	}

	accounts := []*models.Account{}
	for rows.Next() {
		account, err := scanIntoAccount(rows)
		if err != nil {
			return nil, errors.New("error scanning")
		}
		accounts = append(accounts, account)
	}

	return accounts, nil
}

func (s *PostgresStore) GetAccountByID(id int) (*models.Account, error) {
	rows, err := s.DB.Query("select * from account where id = $1", id)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		return scanIntoAccount(rows)
	}

	return nil, fmt.Errorf("account %d not found", id)
}

func (s *PostgresStore) GetAccountByNumber(number int) (*models.Account, error) {
	query := `select * from account
	where number = $1;`

	rows, _ := s.DB.Query(query, number)

	for rows.Next() {
		return scanIntoAccount(rows)
	}

	return nil, fmt.Errorf("account with number [%d] not found", number)
}

func (s *PostgresStore) IsAccount(firstname, lastname string) bool {
	query := `select * from account
	where first_name = $1
	and last_name = $2;`

	rows, _ := s.DB.Query(query, firstname, lastname)

	return rows.Next()
}

func (s *PostgresStore) UpdateBalance(number, sum int) error {
	query := fmt.Sprintf(`UPDATE account
	SET balance = balance + %d
	WHERE number = %d;`, sum, number)

	_, err := s.DB.Exec(query)
	return err
}
