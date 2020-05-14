package controller

func (s *Server) initializeRoutes() {

	api := s.Router.Group("/api")
	{
		api.POST("/login", s.Login)
		api.POST("/register", s.Register)
		api.GET("/catalog", s.Catalog)
		api.GET("/my-games/:user", TokenAuthMiddleware(false), s.MyGames)
		api.POST("/my-games", TokenAuthMiddleware(false), s.MyGamesAdd)
		api.DELETE("/my-games/:gId/:user", TokenAuthMiddleware(false), s.MyGamesDel)
		api.POST("/ismygames", TokenAuthMiddleware(false), s.MyGamesCheck)
		api.GET("/account/:username", TokenAuthMiddleware(false), s.AccountGet)
		api.PUT("/account", TokenAuthMiddleware(false), s.AccountPut)
		api.POST("/accountcheck", TokenAuthMiddleware(false), s.AccountCheck)
		api.POST("/resultgame", TokenAuthMiddleware(false), s.ResultGame)
		api.GET("/achievement/:id", TokenAuthMiddleware(false), s.Achievement)
		api.GET("/control", TokenAuthMiddleware(true), s.Control)
		api.GET("/mainchat", s.MainChat)
		api.GET("/ws", s.serveWs)
	}
}
