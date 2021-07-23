package itunes

type Source struct {
	Item
	Capacity  int // the total size of the source if it has a fixed size
	FreeSpace int // the free space on the source if it has a fixed size
	Kind      string
}
