package itunes

// SubscriptionPlaylist a subscription playlist from Apple Music
type SubscriptionPlaylist struct {
	FileTracks []FileTrack
	URLTracks  []URLTrack
}
