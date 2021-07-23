package itunes

type Playlist struct {
	Item
	Description string    // the description of the playlist
	Disliked    bool      // is this playlist disliked?
	Duration    int       // the total length of all songs (in seconds)
	Name        string    // the name of the playlist
	Loved       bool      // is this playlist loved?
	Parent      *Playlist // folder which contains this playlist (if any)
	Shuffle     bool      // play the songs in this playlist in random order? (obsolete; always false)
	Size        int       // the total size of all songs (in bytes)
	SongRepeat  string    // playback repeat mode (obsolete; always off)
	Time        string    // the length of all songs in MM:SS format
	Visible     bool      // is this playlist visible in the Source list?
}
