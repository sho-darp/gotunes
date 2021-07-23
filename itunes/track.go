package itunes

import (
	"time"
)

// Track playable audio source
type Track struct {
	Item
	ArtWorks          []Artwork // a piece of art within a track or playlist
	Album             string    // the album name of the track
	AlbumArtist       string    // the album artist of the track
	AlbumDisliked     bool      // is the album for this track disliked?
	AlbumLoved        bool      // is the album for this track loved?
	AlbumRating       int       // the rating of the album for this track (0 to 100)
	AlbumRatingKind   string    // the rating kind of the album rating for this track
	Artist            string    // the artist/source of the track
	BitRate           int       // the bit rate of the track (in kbps)
	Bookmark          int       // the bookmark time of the track in seconds
	Bookmarkable      bool      // is the playback position for this track remembered?
	Bpm               int       // the tempo of this track in beats per minute
	Category          string    // the category of the track
	CloudStatus       string    // the iCloud status of the track
	Comment           string    // freeform notes about the track
	Compilation       bool      // is this track from a compilation album?
	Composer          string    // the composer of the track
	DatabaseID        int       // the common, unique ID for this track. If two tracks in different playlists have the same database ID, they are sharing the same data.
	DateAdded         time.Time // the date the track was added to the playlist
	Description       string    // the description of the track
	DiscCount         int       // the total number of discs in the source album
	DiscNumber        int       // the index of the disc containing this track on the source album
	Disliked          bool      // is this track disliked?
	DownloaderAppleID string    // the Apple ID of the person who downloaded this track
	DownloaderName    string    // the name of the person who downloaded this track
	Duration          float64   // the length of the track in seconds
	Enabled           bool      // is this track checked for playback?
	EpisodeID         string    // the episode ID of the track
	EpisodeNumber     int       // the episode number of the track
	Eq                string    // the name of the EQ preset of the track
	Finish            float64   // the stop time of the track in seconds
	Gapless           bool      // is this track from a gapless album?
	Genre             string    // the music/audio genre (category) of the track
	Grouping          string    // the grouping (piece) of the track. Generally used to denote movements within a classical work.
	Kind              string    // a text description of the track
	LongDescription   string    // longDescription (text)
	Loved             bool      // is this track loved?
	Lyrics            string    // the lyrics of the track
	MediaKind         string    // the media kind of the track
	ModificationDate  time.Time // the modification date of the content of this track
	Movement          string    // the movement name of the track
	MovementCount     int       // the total number of movements in the work
	MovementNumber    int       // the index of the movement in the work
	PlayedCount       int       // number of times this track has been played
	PlayedDate        time.Time // the date and time this track was last played
	PurchaserAppleID  string    // the Apple ID of the person who purchased this track
	PurchaserName     string    // the name of the person who purchased this track
	Rating            int       // the rating of this track (0 to 100)
	RatingKind        string    // the rating kind of this track
	ReleaseDate       time.Time // the release date of this track
	SampleRate        int       // the sample rate of the track (in Hz)
	SeasonNumber      int       // the season number of the track
	Shufflable        bool      // is this track included when shuffling?
	SkippedCount      int       // number of times this track has been skipped
	SkippedDate       time.Time // the date and time this track was last skipped
	Show              string    // the show name of the track
	SortAlbum         string    // override string to use for the track when sorting by album
	SortArtist        string    // override string to use for the track when sorting by artist
	SortAlbumArtist   string    // override string to use for the track when sorting by album artist
	SortName          string    // override string to use for the track when sorting by name
	SortComposer      string    // override string to use for the track when sorting by composer
	SortShow          string    // override string to use for the track when sorting by show name
	Size              int       // the size of the track (in bytes)
	Start             float64   // the start time of the track in seconds
	Time              string    // the length of the track in MM:SS format
	TrackCount        int       // the total number of tracks on the source album
	TrackNumber       int       // the index of the track on the source album
	Unplayed          bool      // is this track unplayed?
	VideoKind         string    // kind of video track
	VolumeAdjustment  int       // relative volume adjustment of the track (-100% to 100%)
	Work              string    // the work name of the track
	Year              int       // the year the track was recorded/released
}
