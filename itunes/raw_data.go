package itunes

import (
	"bytes"
	"encoding/hex"
	"io"
	"regexp"
)

type RawData struct {
	io.Reader
}

func (r *RawData) UnmarshalJSON(b []byte) error {
	rep := regexp.MustCompile(`"'tdta'\(\$(.*)\$\)"$`)
	hexString := rep.ReplaceAllString(string(b), "$1")
	hByte, _ := hex.DecodeString(hexString)
	reader := bytes.NewReader(hByte)
	r.Reader = reader
	return nil
}
