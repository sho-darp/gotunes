package itunes

// FileTrack a track representing an audio file (MP3, AIFF, etc.)
type FileTrack struct {
	Track
	Location File // the location of the file represented by this track
}
