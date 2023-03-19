package controllers

import (
	"fmt"
	"net/http"
	"strconv"

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

func DeleteAccountById(c *gin.Context) {
	id, err := getId(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = storage.DB.DeleteAccount(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

func getId(c *gin.Context) (int, error) {
	idString := c.Param("id")
	id, err := strconv.Atoi(idString)
	if err != nil {
		return 0, fmt.Errorf("invalid id %s", idString)
	}
	return id, nil
}
