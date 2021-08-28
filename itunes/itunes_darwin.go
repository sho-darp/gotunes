package itunes

import "os/exec"

func switchExec(arg string) *exec.Cmd {
	return exec.Command("osascript", "-l", "JavaScript", "scripts/darwin/itunes.js", arg)
}
