package controller

//"github.com/victorsteven/Forum-App-Go-Backend/api/auth"

func (s *Server) initializeRoutes() {
	api := s.Router.Group("/api")
	{
		//api.POST("/login", s.Login)
		api.POST("/register", s.Register)
	}
}
