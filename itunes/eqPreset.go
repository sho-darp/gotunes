package itunes

type EQPreset struct {
	Band1        float64 // the equalizer 32 Hz band level (-12.0 dB to +12.0 dB)
	Band2        float64 // the equalizer 64 Hz band level (-12.0 dB to +12.0 dB)
	Band3        float64 // the equalizer 125 Hz band level (-12.0 dB to +12.0 dB)
	Band4        float64 // the equalizer 250 Hz band level (-12.0 dB to +12.0 dB)
	Band5        float64 // the equalizer 500 Hz band level (-12.0 dB to +12.0 dB)
	Band6        float64 // the equalizer 1 kHz band level (-12.0 dB to +12.0 dB)
	Band7        float64 // the equalizer 2 kHz band level (-12.0 dB to +12.0 dB)
	Band8        float64 // the equalizer 4 kHz band level (-12.0 dB to +12.0 dB)
	Band9        float64 // the equalizer 8 kHz band level (-12.0 dB to +12.0 dB)
	Band10       float64 // the equalizer 16 kHz band level (-12.0 dB to +12.0 dB)
	Modifiable   bool    // can this preset be modified?
	Preamp       float64 // the equalizer preamp level (-12.0 dB to +12.0 dB)
	UpdateTracks bool    // should tracks which refer to this preset be updated when the preset is renamed or deleted?
}
