package itunes

import (
	"os/exec"

	"github.com/sho-darp/gotunes/scripts/darwin"
)

func switchExec(arg ...string) *exec.Cmd {
	script := darwin.GetScript()
	args := []string{
		"-l",
		"JavaScript",
		"-e",
		string(script),
	}
	args = append(args, arg...)

	return exec.Command("osascript", args...)
}
