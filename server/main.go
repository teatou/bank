package main

import (
	"os"

	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
	"github.com/teatou/bank/server/controllers"
	"github.com/teatou/bank/server/middleware"
	"github.com/teatou/bank/server/storage"
)

func init() {
	// initializers.LoadEnvVars() development
	storage.ConnectToDb()
	storage.DB.Init()
}

func main() {
	c := cors.New(cors.Options{
		AllowedOrigins:     []string{os.Getenv("CLIENT")},
		AllowedMethods:     []string{"GET", "POST"},
		AllowedHeaders:     []string{},
		ExposedHeaders:     []string{},
		AllowCredentials:   true,
		OptionsPassthrough: false, // preflight requests
	})

	r := gin.Default()
	r.Use(c)

	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	r.POST("/logout", controllers.Logout)

	r.GET("/account", middleware.RequireAuth, controllers.GetAccount)
	r.GET("/transactions", middleware.RequireAuth, controllers.GetTransactions)
	r.GET("transactions/month", middleware.RequireAuth, controllers.GetTransactionsMonth)
	r.POST("/transfer", middleware.RequireAuth, controllers.TransferMoney)
	r.DELETE("/account", middleware.RequireAuth, controllers.DeleteAccount)

	r.GET("/accounts", controllers.GetAccounts)       // admin
	r.DELETE("/accounts", controllers.DeleteAccounts) // admin

	r.Run()
}
