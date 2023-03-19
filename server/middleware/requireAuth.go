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
	tokenString, err := c.Cookie("Auth")
	if err != nil {
		fmt.Println("no cookie found")
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
		fmt.Println("failed to parse token")
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			fmt.Println("token expired")
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		accountPointer, err := storage.DB.GetAccountByID(int(claims["id"].(float64)))
		if err != nil {
			fmt.Println("failed to get account by id")
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		account := *accountPointer

		c.Set("account", account)

		c.Next()
	} else {
		fmt.Println("claims failed, token valid:", token.Valid)
		c.AbortWithStatus(http.StatusUnauthorized)
	}
}
