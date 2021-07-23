package itunes

// FolderPlaylist a folder that contains other playlists
type FolderPlaylist struct {
	UserPlaylist
	FileTracks   []FileTrack
	URLTracks    []URLTrack
	SharedTracks []SharedTrack
	Shared       bool // is this playlist shared?
	Smart        bool //  is this a Smart Playlist?
	Genius       bool // is this a Genius Playlist?
}
