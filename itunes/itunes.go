package itunes

import (
	"encoding/json"
	"os/exec"
	"runtime"
)

func scriptExec(arg string) ([]byte, error) {
	cmd := &exec.Cmd{}

	switch runtime.GOOS {
	case "darwin":
		cmd = exec.Command("osascript", "-l", "JavaScript", "scripts/itunes-darwin.js", arg)
	}

	return cmd.Output()
}

// CurrentTrack the current targeted track
func CurrentTrack() (Track, error) {
	track := Track{}
	jsonb, err := scriptExec("currentTrack")
	if err != nil {
		return track, err
	}

	err = json.Unmarshal(jsonb, &track)
	if err != nil {
		return track, err
	}
	return track, nil
}
