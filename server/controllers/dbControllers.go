package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
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
	idString := c.Param("id")
	id, err := strconv.Atoi(idString)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid id",
		})
	}

	account, err := storage.DB.GetAccountByID(id)

	c.JSON(http.StatusOK, account)
}
