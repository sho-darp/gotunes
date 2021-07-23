package itunes

// custom playlists created by the user
type UserPlaylist struct {
	Playlist
	URLTracks    []URLTrack    // track representing a network streams
	FileTracks   []FileTrack   // track representing audio files (MP3, AIFF, etc.)
	SharedTracks []SharedTrack // track residing in a shared library
	Shared       bool          // is this playlist shared?
	Smart        bool          // is this a Smart Playlist?
	Genius       bool          // is this a Genius Playlist?
}
