package itunes

// LibraryPlaylist the master music library playlist
type LibraryPlaylist struct {
	Playlist
	FileTracks   []FileTrack
	URLTracks    []URLTrack
	SharedTracks []SharedTrack
}
