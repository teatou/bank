package middleware

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/teatou/bank/server/storage"
)

func RequireAuth(c *gin.Context) {
	cookie, err := c.Cookie("Auth")
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	token, _ := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return os.Getenv("JWT_SECRET"), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		account, err := storage.DB.GetAccountByNumber(claims["number"].(int))
		if err != nil {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		c.Set("account", account)

		c.Next()

		fmt.Println(claims["foo"], claims["nbf"])
	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
}
