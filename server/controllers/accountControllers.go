package controllers

import (
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/teatou/bank/server/models"
	"github.com/teatou/bank/server/storage"
	"golang.org/x/crypto/bcrypt"
)

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

	err = bcrypt.CompareHashAndPassword([]byte(account.Password), []byte(req.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid password",
		})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
		"id":  account.ID,
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to create token",
		})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Auth", tokenString, 3600*24*30, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
	})
}

func TransferMoney(c *gin.Context) {
	acc, _ := c.Get("account")

	account, err := storage.DB.GetAccountByID(acc.(models.Account).ID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to get account by id",
		})
		return
	}

	numberTo, err := strconv.Atoi(c.Query("to"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid number",
		})
		return
	}

	accountTo, err := storage.DB.GetAccountByNumber(numberTo)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "no such account",
		})
		return
	}

	sum, err := strconv.Atoi(c.Query("sum"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid sum",
		})
		return
	}

	if sum > int(account.Balance) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "not enough money",
		})
		return
	}

	err = storage.DB.UpdateBalance(int(accountTo.Number), sum)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to add money",
		})
		return
	}

	err = storage.DB.UpdateBalance(int(account.Number), -sum)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to retrieve money",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
