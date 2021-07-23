package itunes

// Item an item
type Item struct {
	Class        string                 // the class of the item
	ID           int                    // the id of the item
	Index        int                    // The index of the item in internal application order.
	Name         string                 // the name of the item
	PersistentID string                 // the id of the item as a hexadecimal string. This id does not change over time.
	Properties   map[string]interface{} // every property of the item
}
