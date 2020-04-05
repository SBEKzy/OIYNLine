package main

import (
	"fmt"

	gintemplate "github.com/foolin/gin-template"
	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println()
	r := gin.Default()
	r.HTMLRender = gintemplate.Default()
	r.GET("/ggg", func(c *gin.Context) {
		c.HTML(200, "../client/public/index.html", gin.H{"title": "Page file title!!"})
	})
	r.Run(":8080")
}
