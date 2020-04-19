package main

import (
	con "github.com/OIYNLine/controller"
)

var server con.Server

func main() {
	server.Initialize()
	server.Router.Run(":8080")
}
