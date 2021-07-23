package itunes

type Artwork struct {
	Item
	Data        Picture // data for this artwork, in the form of a picture
	Description string  // description of artwork as a string
	Downloaded  bool    // was this artwork downloaded by iTunes?
	Format      string  // the data format for this piece of artwork
	Kind        int     // kind or purpose of this piece of artwork
	RawData     RawData // data for this artwork, in original format
}
