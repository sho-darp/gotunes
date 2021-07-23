package itunes

// AudioCDPlaylist a playlist representing an audio CD
type AudioCDPlaylist struct {
	Playlist
	AudioCDTracks []AudioCDTrack
	Artist        string // the artist of the CD
	Compilation   bool   // is this CD a compilation album?
	Composer      string // the composer of the CD
	DiscCount     int    // the total number of discs in this CD’s album
	DiscNumber    int    // the index of this CD disc in the source album
	Genre         string // the genre of the CD
	Year          int    // the year the album was recorded/released
}
