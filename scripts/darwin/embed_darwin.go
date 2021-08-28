package darwin

import (
	_ "embed"
)

//go:embed itunes.js
var script []byte

func GetScript() string {
	return string(script)
}
