# gotunes
It is a Go library that operates iTunes via JXA(Javascript for Automation).  
Based on the iTunes Applescript document.

### Installation
```
go get github.com/sho-darp/gotunes/itunes
```

### Usage
```go
package main

import (
	"fmt"
	"github.com/sho-darp/gotunes/itunes"
)

func main() {
  // Get current track info
  track, _ := itunes.CurrentTrack()
  for _, p := range []string{track.Name, track.Album, track.Artist} {
    fmt.Println(p)
  }
  
  // Controls
  itunes.Playpause()
  itunes.NextTrack()
}
```

### Note
* Only Mac is supported.
* I have not tested the Music app on macOS Catalina or later.
* If there are a large number of tracks, some processing will be very slow.  (Example: itunes.CurrentPlaylist())
