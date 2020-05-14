package controller

func (s *Server) initializeRoutes() {

	api := s.Router.Group("/api")
	{
		api.POST("/login", s.Login)
		api.POST("/register", s.Register)
		api.GET("/catalog", s.Catalog)
		api.GET("/my-games/:user", TokenAuthMiddleware(), s.MyGames)
		api.POST("/my-games", TokenAuthMiddleware(), s.MyGamesAdd)
		api.DELETE("/my-games/:gId/:user", TokenAuthMiddleware(), s.MyGamesDel)
		api.POST("/ismygames", TokenAuthMiddleware(), s.MyGamesCheck)
		api.GET("/account/:username", TokenAuthMiddleware(), s.AccountGet)
		api.PUT("/account", TokenAuthMiddleware(), s.AccountPut)
		api.POST("/accountcheck", TokenAuthMiddleware(), s.AccountCheck)
		api.POST("/resultgame", TokenAuthMiddleware(), s.ResultGame)
		api.GET("/achievement/:id", TokenAuthMiddleware(), s.Achievement)
		api.GET("/mainchat", s.MainChat)
		api.GET("/ws", s.serveWs)
	}
}
