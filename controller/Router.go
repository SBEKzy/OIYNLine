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
		api.PUT("/control", TokenAuthMiddleware(true), s.ControlUpdate)
		api.GET("/searchFriend/:name", TokenAuthMiddleware(false), s.SearchFriend)
		api.POST("/friendAdd", TokenAuthMiddleware(false), s.FriendRequest)
		api.GET("/friends/:id", TokenAuthMiddleware(false), s.Friends)
		api.PUT("/friendAdd", TokenAuthMiddleware(false), s.FriendRequestAdd)
		api.GET("/mainchat", s.MainChat)
		api.GET("/tictactoe-menu/:id", s.serveWs)
		api.GET("tictactoe-menuu", s.TictacMenu)
	}
}
