package itunes

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
)

func scriptExec(arg ...string) ([]byte, error) {
	cmd := switchExec(arg...)
	return cmd.Output()
}

func scriptAsyncExec(arg ...string) error {
	cmd := switchExec(arg...)
	return cmd.Start()
}

func scriptExecBool(arg ...string) (bool, error) {
	res, _ := scriptExec(arg...)
	return strconv.ParseBool(string(res))
}

func unmarshal(command string, v interface{}, arg ...string) error {
	args := []string{
		command,
	}
	args = append(args, arg...)
	jsonb, err := scriptExec(args...)
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
func CurrentTrack(artwork bool) (Track, error) {
	track := Track{}
	args := []string{
		fmt.Sprintf("artwork=%t", artwork),
	}

	err := unmarshal("currentTrack", &track, args...)
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

// AirplayDevices AirPlay devices
func AirplayDevices() ([]AirPlayDevice, error) {
	airPlayDevices := []AirPlayDevice{}
	err := unmarshal("airplayDevices", &airPlayDevices)
	return airPlayDevices, err
}

// BrowserWindows main iTunes windows
func BrowserWindows() ([]BrowserWindow, error) {
	browserWindows := []BrowserWindow{}
	err := unmarshal("browserWindows", &browserWindows)
	return browserWindows, err
}

// Encoders converts a track to a specific file formats
func Encoders() ([]Encoder, error) {
	encoders := []Encoder{}
	err := unmarshal("encoders", &encoders)
	return encoders, err
}

// EqPresets equalizer preset configurations
func EqPresets() ([]EQPreset, error) {
	eqPresets := []EQPreset{}
	err := unmarshal("eqPresets", &eqPresets)
	return eqPresets, err
}

// EqWindows iTunes equalizer windows
func EqWindows() ([]EQWindow, error) {
	eqWindows := []EQWindow{}
	err := unmarshal("eqPresets", &eqWindows)
	return eqWindows, err
}

// MiniplayerWindows miniplayer windows
func MiniplayerWindows() ([]MiniplayerWindow, error) {
	miniplayerWindows := []MiniplayerWindow{}
	err := unmarshal("miniplayerWindows", &miniplayerWindows)
	return miniplayerWindows, err
}

// Playlists list of songs/streams
func Playlists() ([]Playlist, error) {
	playlists := []Playlist{}
	err := unmarshal("playlists", &playlists)
	return playlists, err
}

// PlaylistWindows sub-window showing a single playlist windows
func PlaylistWindows() ([]PlaylistWindow, error) {
	playlistWindows := []PlaylistWindow{}
	err := unmarshal("playlistWindows", &playlistWindows)
	return playlistWindows, err
}

// Sources music sources (music library, CD, device, etc.)
func Sources() ([]Source, error) {
	sources := []Source{}
	err := unmarshal("sources", &sources)
	return sources, err
}

// Tracks playable audio sources
func Tracks() ([]Track, error) {
	tracks := []Track{}
	err := unmarshal("tracks", &tracks)
	return tracks, err
}

// VideoWindows VideoWindows
func VideoWindows() ([]VideoWindow, error) {
	videoWindows := []VideoWindow{}
	err := unmarshal("videoWindows", &videoWindows)
	return videoWindows, err
}

// Visuals visual plug-in list
func Visuals() ([]Visual, error) {
	visuals := []Visual{}
	err := unmarshal("visuals", &visuals)
	return visuals, err
}

// Windows the currently windows
func Windows() ([]Window, error) {
	windows := []Window{}
	err := unmarshal("windows", &windows)
	return windows, err
}

// // UserPlaylists custom playlists created by the user
// func UserPlaylists() ([]UserPlaylist, error) {
// 	userPlaylists := []UserPlaylist{}
// 	err := unmarshal("userPlaylists", &userPlaylists)
// 	return userPlaylists, err
// }

// // SubscriptionPlaylist subscription playlists from Apple Music
// func SubscriptionPlaylists() ([]SubscriptionPlaylist, error) {
// 	subscriptionPlaylists := []SubscriptionPlaylist{}
// 	err := unmarshal("subscriptionPlaylists", &subscriptionPlaylists)
// 	return subscriptionPlaylists, err
// }

// // LibraryPlaylists the master music library playlists
// func LibraryPlaylists() ([]LibraryPlaylist, error) {
// 	libraryPlaylists := []LibraryPlaylist{}
// 	err := unmarshal("libraryPlaylists", &libraryPlaylists)
// 	return libraryPlaylists, err
// }

// // FolderPlaylists folder that contains other playlists
// func FolderPlaylists() ([]FolderPlaylist, error) {
// 	folderPlaylist := []FolderPlaylist{}
// 	err := unmarshal("folderPlaylists", &folderPlaylist)
// 	return folderPlaylist, err
// }

// // AudioCDPlaylists playlist representing an audio CD
// func AudioCDPlaylists() ([]AudioCDPlaylist, error) {
// 	audioCDPlaylist := []AudioCDPlaylist{}
// 	err := unmarshal("audioCDPlaylists", &audioCDPlaylist)
// 	return audioCDPlaylist, err
// }

// // RadioTunerPlaylist the radio tuner playlist
// func RadioTunerPlaylists() ([]RadioTunerPlaylist, error) {
// 	radioTunerPlaylist := []RadioTunerPlaylist{}
// 	err := unmarshal("radioTunerPlaylist", &radioTunerPlaylist)
// 	return radioTunerPlaylist, err
// }

// Controll

// BackTrack reposition to beginning of current track or go to previous track if already at start of current track
func BackTrack() {
	scriptAsyncExec("backTrack")
}

// FastForward skip forward in a playing track
func FastForward() {
	scriptAsyncExec("fastForward")
}

// NextTrack advance to the next track in the current playlist
func NextTrack() {
	scriptAsyncExec("nextTrack")
}

// Pause pause playback
func Pause() {
	scriptAsyncExec("pause")
}

// Playpause toggle the playing/paused state of the current track
func Playpause() {
	scriptAsyncExec("playpause")
}

// PreviousTrack return to the previous track in the current playlist
func PreviousTrack() {
	scriptAsyncExec("previousTrack")
}

// Resume disable fast forward/rewind and resume playback, if playing.
func Resume() {
	scriptAsyncExec("resume")
}

// Rewind skip backwards in a playing track
func Rewind() {
	scriptAsyncExec("rewind")
}

// Stop stop playback
func Stop() {
	scriptAsyncExec("stop")
}
