package itunes

import (
	"os/exec"

	"github.com/sho-darp/gotunes/scripts/darwin"
)

func switchExec(arg string) *exec.Cmd {
	script := darwin.GetScript()
	return exec.Command("osascript", "-l", "JavaScript", "-e", string(script), arg)
}
