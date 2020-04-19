package controller

import (
	"github.com/gin-gonic/gin"
)

func (s *Server) initializeRoutes() {
	pool := NewPool()
	go pool.Start()
	api := s.Router.Group("/api")
	{
		api.POST("/login", s.Login)
		api.POST("/register", s.Register)
		api.GET("my-games", TokenAuthMiddleware(), s.MyGames)
		api.GET("/ws", func(c *gin.Context) {
			s.serveWs(c, pool)
		})
	}
}
