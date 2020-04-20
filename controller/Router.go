package controller

import "github.com/gin-gonic/gin"

func (s *Server) initializeRoutes() {

	api := s.Router.Group("/api")
	{
		api.POST("/login", s.Login)
		api.POST("/register", s.Register)
		api.GET("/my-games", TokenAuthMiddleware(), s.MyGames)
		api.GET("/account/:username", TokenAuthMiddleware(), s.AccountGet)
		api.PUT("/account", TokenAuthMiddleware(), s.AccountPut)
		api.GET("/ws", func(c *gin.Context) {
			s.serveWs(c, pool)
		})
	}
}
