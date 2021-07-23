package itunes

// AudioCDTrack a track on an audio CD
type AudioCDTrack struct {
	Track
	Location File // the location of the file represented by this track
}
