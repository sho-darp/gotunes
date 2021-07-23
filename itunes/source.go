package itunes

// Source a music source (music library, CD, device, etc.)
type Source struct {
	Item
	AudioCDPlaylists      []AudioCDPlaylist
	LibraryPlaylists      []LibraryPlaylist
	Playlists             []Playlist
	RadioTunerPlaylists   []RadioTunerPlaylist
	SubscriptionPlaylists []SubscriptionPlaylist
	UserPlaylists         []UserPlaylist
	Capacity              int // the total size of the source if it has a fixed size
	FreeSpace             int // the free space on the source if it has a fixed size
	Kind                  string
}
