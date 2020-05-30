package controller

import (
	models "github.com/OIYNLine/model"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type Server struct {
	DB     *gorm.DB
	Router *gin.Engine
}

func (server *Server) Initialize() {
	var err error
	//config := conf.GetConfig()
	//fmt.Println(config)
	//connect := fmt.Sprintf("host=localhost port=5432 user=postgres dbname=oyinline sslmode=disable password=password", config.Host, config.DbUser, config.DbName, config.DbPassword)
	server.DB, err = gorm.Open("postgres", "host=localhost port=5432 user=postgres dbname=oyinline sslmode=disable password=password")
	if err != nil {
		panic("db connection error")
	}

	server.DB.Debug().AutoMigrate(
		&models.User{},
		&models.History{},
		&models.MyGames{},
		&models.Game{},
		&models.Friend{},
	)
	server.Router = gin.Default()
	server.Router.Use(CORSMiddleware())
	server.initializeRoutes()
}
