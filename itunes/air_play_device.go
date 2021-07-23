package itunes

// AirPlayDevice an AirPlay device
type AirPlayDevice struct {
	Item
	Active         bool   // is the device currently being played to?
	Available      bool   // is the device currently available?
	Kind           string // the kind of the device
	NetworkAddress string // the network (MAC) address of the device
	Protected      bool   // is the device password- or passcode-protected?
	Selected       bool   // is the device currently selected?
	SupportsAudio  bool   // does the device support audio playback?
	SupportsVideo  bool   // does the device support video playback?
	SoundVolume    int    // the output volume for the device (0 = minimum, 100 = maximum)
}
