package main

import (
	"github.com/gin-gonic/gin"
	"github.com/teatou/bank/server/controllers"
	"github.com/teatou/bank/server/initializers"
	"github.com/teatou/bank/server/middleware"
	"github.com/teatou/bank/server/storage"
)

func init() {
	initializers.LoadEnvVars()
	storage.ConnectToDb()
	storage.DB.Init()
}

func main() {

	r := gin.Default()

	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	r.GET("/account", middleware.RequireAuth, controllers.GetAccountByID)
	r.GET("/accounts", controllers.GetAccounts)
	r.DELETE("/account/:id", controllers.DeleteAccountById)
	r.POST("/transfer", middleware.RequireAuth, controllers.TransferMoney)

	r.Run()
}
