package controller

func (s *Server) initializeRoutes() {

	api := s.Router.Group("/api")
	{
		api.POST("/login", s.Login)
		api.POST("/register", s.Register)
		api.GET("/my-games", TokenAuthMiddleware(), s.MyGames)
		api.GET("/account/:username", TokenAuthMiddleware(), s.AccountGet)
		api.PUT("/account", TokenAuthMiddleware(), s.AccountPut)
		api.POST("/accountcheck", TokenAuthMiddleware(), s.AccountCheck)
		api.GET("/mainchat", s.MainChat)
		api.GET("/ws", s.serveWs)
	}
}
