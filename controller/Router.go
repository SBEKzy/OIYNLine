package controller

func (s *Server) initializeRoutes() {

	api := s.Router.Group("/api")
	{
		api.POST("/login", s.Login)
		api.POST("/register", s.Register)
		api.GET("my-games", TokenAuthMiddleware(), s.MyGames)
		api.GET("/ws", s.serveWs)
	}
}
