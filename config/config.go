package config

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

type Config struct {
	Host       string
	DbName     string
	DbPassword string
	DbUser     string
}

func GetConfig() Config {
	file, err := os.Open("config.json")

	if err != nil {
		fmt.Println("Error Open json file")
		return Config{}
	}
	defer file.Close()
	var config Config
	bytevalue, _ := ioutil.ReadAll(file)
	json.Unmarshal(bytevalue, &config)
	return config
}
