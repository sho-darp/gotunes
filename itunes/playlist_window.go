package itunes

// PlaylistWindow a sub-window showing a single playlist
type PlaylistWindow struct {
	Window
	Selection []Track  // the selected songs
	View      Playlist // the playlist displayed in the window
}
