package main

import (
	"github.com/gin-gonic/gin"
	"github.com/teatou/bank/server/controllers"
	"github.com/teatou/bank/server/initializers"
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
	r.GET("/account/:id", controllers.GetAccountByID)
	r.GET("/accounts", controllers.GetAccounts)

	r.Run()
}
