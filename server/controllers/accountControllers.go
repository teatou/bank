package controllers

import (
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/teatou/bank/server/models"
	"github.com/teatou/bank/server/storage"
	"golang.org/x/crypto/bcrypt"
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

func Signup(c *gin.Context) {
	var req struct {
		FirstName string
		LastName  string
		Password  string
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to read body",
		})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), 10)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to encrypt password",
		})
		return
	}

	account := newAccount(req.FirstName, req.LastName, string(hash))

	err = storage.DB.CreateAccount(account)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to create account",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

func Login(c *gin.Context) {
	var req struct {
		Number   int
		Password string
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to read body",
		})
		return
	}

	account, err := storage.DB.GetAccountByNumber(req.Number)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "account does not exist",
		})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(account.EncryptedPassword), []byte(req.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid password",
		})
		return
	}

	token, err := createJWT(account)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid password",
		})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Auth", token, 3600*24*30, "", "", true, true)

	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}
