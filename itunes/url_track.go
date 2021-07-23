package itunes

// URLTrack a track representing a network stream
type URLTrack struct {
	Track
	Address string // the URL for this track
}
