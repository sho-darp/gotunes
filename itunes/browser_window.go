package itunes

type BrowserWindow struct {
	Window
	Selection Track    // the selected songs
	View      Playlist // the playlist currently displayed in the window
}
