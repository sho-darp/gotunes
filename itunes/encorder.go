package itunes

// Encoder converts a track to a specific file format
type Encoder struct {
	Item
	Format string // the data format created by the encoder
}
