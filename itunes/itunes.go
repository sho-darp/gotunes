package itunes

import (
	"encoding/json"
	"os/exec"
	"runtime"
	"strconv"
	"strings"
)

func scriptExec(arg string) ([]byte, error) {
	cmd := &exec.Cmd{}

	switch runtime.GOOS {
	case "darwin":
		cmd = exec.Command("osascript", "-l", "JavaScript", "scripts/darwin/itunes.js", arg)
	}

	return cmd.Output()
}

func scriptExecBool(arg string) (bool, error) {
	res, _ := scriptExec(arg)
	return strconv.ParseBool(string(res))
}

func unmarshal(command string, v interface{}) error {
	jsonb, err := scriptExec(command)
	if err != nil {
		return err
	}

	err = json.Unmarshal(jsonb, &v)
	if err != nil {
		return err
	}
	return nil
}

func trim(bString []byte) string {
	return strings.TrimSpace(string(bString))
}

// AirplayEnabled is AirPlay currently enabled?
func AirplayEnabled() bool {
	flag, _ := scriptExecBool("airplayEnabled")
	return flag
}

// Converting is a track currently being converted?
func Converting() bool {
	flag, _ := scriptExecBool("converting")
	return flag
}

// CurrentAirPlayDevices the currently selected AirPlay device(s)
func CurrentAirPlayDevices() ([]AirPlayDevice, error) {
	airPlayDevices := []AirPlayDevice{}
	err := unmarshal("currentAirPlayDevices", &airPlayDevices)
	return airPlayDevices, err
}

// CurrentEncoder the currently selected encoder (MP3, AIFF, WAV, etc.)
func CurrentEncoder() (Encoder, error) {
	encoder := Encoder{}
	err := unmarshal("currentEncoder", &encoder)
	return encoder, err
}

// CurrentEQPreset the currently selected equalizer preset
func CurrentEQPreset() (EQPreset, error) {
	eq := EQPreset{}
	err := unmarshal("currentEQPreset", &eq)
	return eq, err
}

// CurrentPlaylist the playlist containing the currently targeted track
func CurrentPlaylist() (Playlist, error) {
	playlist := Playlist{}
	err := unmarshal("currentPlaylist", &playlist)
	return playlist, err
}

// CurrentStreamTitle the name of the current song in the playing stream (provided by streaming server)
func CurrentStreamTitle() string {
	res, _ := scriptExec("currentStreamTitle")
	return trim(res)
}

// CurrentStreamURL the URL of the playing stream or streaming web site (provided by streaming server)
func CurrentStreamURL() string {
	res, _ := scriptExec("currentStreamURL")
	return trim(res)
}

// CurrentTrack the current targeted track
func CurrentTrack() (Track, error) {
	track := Track{}
	err := unmarshal("currentTrack", &track)
	return track, err
}

// CurrentVisual the currently selected visual plug-in
func CurrentVisual() (Visual, error) {
	visual := Visual{}
	err := unmarshal("currentVisual", &visual)
	return visual, err
}

// EqEnabled is the equalizer enabled?
func EqEnabled() bool {
	flag, _ := scriptExecBool("eqEnabled")
	return flag
}

// FixedIndexing true if all AppleScript track indices should be independent of the play order of the owning playlist.
func FixedIndexing() bool {
	flag, _ := scriptExecBool("fixedIndexing")
	return flag
}

// Frontmost is iTunes the frontmost application?
func Frontmost() bool {
	flag, _ := scriptExecBool("frontmost")
	return flag
}

// FullScreen are visuals displayed using the entire screen?
func FullScreen() bool {
	flag, _ := scriptExecBool("fullScreen")
	return flag
}

// Name the name of the application
func Name() string {
	res, _ := scriptExec("name")
	return trim(res)
}

// Mute has the sound output been muted?
func Mute() bool {
	flag, _ := scriptExecBool("mute")
	return flag
}

// PlayerPosition the player’s position within the currently playing track in seconds.
func PlayerPosition() float64 {
	res, _ := scriptExec("playerPosition")
	position, _ := strconv.ParseFloat(strings.TrimSpace(string(res)), 64)
	return position
}

// PlayerState is iTunes stopped, paused, or playing?
func PlayerState() string {
	res, _ := scriptExec("playerState")
	return trim(res)
}

// Selection the selection visible to the user
func Selection() string {
	res, _ := scriptExec("selection")
	return trim(res)
}

// ShuffleEnabled are songs played in random order?
func ShuffleEnabled() bool {
	flag, _ := scriptExecBool("shuffleEnabled")
	return flag
}

// ShuffleMode the playback shuffle mode
func ShuffleMode() string {
	res, _ := scriptExec("shuffleMode")
	return trim(res)
}

// SongRepeat the playback repeat mode
func SongRepeat() string {
	res, _ := scriptExec("songRepeat")
	return trim(res)
}

// SoundVolume the sound output volume (0 = minimum, 100 = maximum)
func SoundVolume() int {
	res, _ := scriptExec("soundVolume")
	volume, _ := strconv.Atoi(string(res))
	return volume
}

// Version the version of iTunes
func Version() string {
	res, _ := scriptExec("version")
	return trim(res)
}

// VisualsEnabled are visuals currently being displayed?
func VisualsEnabled() bool {
	flag, _ := scriptExecBool("visualsEnabled")
	return flag
}

// VisualSize the size of the displayed visual
func VisualSize() string {
	res, _ := scriptExec("visualSize")
	return trim(res)
}