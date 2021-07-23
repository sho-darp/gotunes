package itunes

type PlaylistWindow struct {
	Window
	Selection []Track  // the selected songs
	View      Playlist // the playlist displayed in the window
}
