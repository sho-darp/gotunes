package itunes

type Window struct {
	Item
	Bounds       Rectangle // the boundary rectangle for the window
	Closeable    bool      // does the window have a close button?
	Collapseable bool      // does the window have a collapse button?
	Collapsed    bool      // is the window collapsed?
	FullScreen   bool      // is the window full screen?
	Position     Point     // the upper left position of the window
	Resizable    bool      // is the window resizable?
	Visible      bool      // is the window visible?
	Zoomable     bool      // is the window zoomable?
	Zoomed       bool      // is the window zoomed?
}
