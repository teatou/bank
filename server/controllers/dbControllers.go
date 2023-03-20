package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/teatou/bank/server/models"
	"github.com/teatou/bank/server/storage"
)

func GetAccounts(c *gin.Context) {
	accounts, err := storage.DB.GetAccounts()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to get accounts",
		})

		return
	}

	c.JSON(http.StatusOK, accounts)
}

func GetAccountByID(c *gin.Context) {
	acc, _ := c.Get("account")

	account, err := storage.DB.GetAccountByID(acc.(models.Account).ID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to get account by id",
		})
		return
	}

	c.JSON(http.StatusOK, account)
}

func DeleteAccount(c *gin.Context) {
	acc, _ := c.Get("account")

	err := storage.DB.DeleteAccount(acc.(models.Account).ID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

func DeleteAccounts(c *gin.Context) {
	query := `delete from account;`

	_, err := storage.DB.DB.Exec(query)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to clear table",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
