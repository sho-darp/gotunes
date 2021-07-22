const itunes = Application("iTunes");

/**
 * the currently selected AirPlay device(s)
 * @returns []airplayDevice
 */
const currentAirPlayDevices = () => {
  const devices = itunes.currentAirPlayDevices();
  return devices.map((device) => {
    return {
      active: device.active(),
      available: device.available(),
      kind: device.kind(),
      networkAddress: device.networkAddress(),
      protected: device.protected(),
      selected: device.selected(),
      supportsAudio: device.supportsAudio(),
      supportsVideo: device.supportsVideo(),
      soundVolume: device.soundVolume(),
    };
  });
};

/**
 * the currently selected encoder (MP3, AIFF, WAV, etc.)
 * @returns Encoder
 */
const currentEncoder = () => {
  const encoder = itunes.currentEncoder();
  return {
    format: encoder.format(),
  };
};

/**
 * the currently selected equalizer prese
 * @returns EQPreset
 */
const currentEQPreset = () => {
  const eqPreset = itunes.currentEQPreset();
  return {
    band1: eqPreset.band1(),
    band2: eqPreset.band2(),
    band3: eqPreset.band3(),
    band4: eqPreset.band4(),
    band5: eqPreset.band5(),
    band6: eqPreset.band6(),
    band7: eqPreset.band7(),
    band8: eqPreset.band8(),
    band9: eqPreset.band9(),
    band10: eqPreset.band10(),
    modifiable: eqPreset.modifiable(),
    preamp: eqPreset.preamp(),
    updateTracks: eqPreset.updateTracks(),
  };
};

/**
 * the playlist containing the currently targeted track
 * @returns playlist
 */
const currentPlaylist = () => {
  const playlist = itunes.currentPlaylist();
  return {
    description: playlist.description(),
    disliked: playlist.disliked(),
    duration: playlist.duration(),
    name: playlist.name(),
    loved: playlist.loved(),
    parent: playlist.parent(),
    shuffle: playlist.shuffle(),
    size: playlist.size(),
    songRepeat: playlist.songRepeat(),
    specialKind: playlist.specialKind(),
    time: playlist.time(),
    visible: playlist.visible(),
  };
};

/**
 * the current targeted track
 * @returns track
 */
const currentTrack = () => {
  const track = itunes.currentTrack;
  return Object.assign(track.properties(), {
    class: track.class(),
    container: track.container(),
    id: track.id(),
    index: track.index(),
    name: track.name(),
    persistentId: track.persistentID(),
    properties: track.properties(),
  });
};

/**
 * the currently selected visual plug-in
 * @returns visual
 */
const currentVisual = () => {
  const visual = itunes.currentVisual();
  return {
    class: visual.class(),
    container: visual.container(),
    id: visual.id(),
    index: visual.index(),
    name: visual.name(),
    // persistentId: visual.persistentID(),
    properties: visual.properties(),
  };
};

/**
 * return exit code
 * @param {*} code error code
 */
const returnError = (code = 1) => {
  ObjC.import("stdlib");
  $.exit(code);
};

function run(args) {
  switch (args[0]) {
    case "airplayEnabled":
      return itunes.airplayEnabled();
    case "converting":
      return itunes.converting();
    case "currentAirPlayDevices":
      return JSON.stringify(currentAirPlayDevices());
    case "currentEncoder":
      return JSON.stringify(currentEncoder());
    case "currentEQPreset":
      return JSON.stringify(currentEQPreset());
    case "currentPlaylist":
      return JSON.stringify(currentPlaylist());
    case "currentStreamTitle":
      return itunes.currentStreamTitle();
    case "currentStreamURL":
      return itunes.converting();
    case "currentTrack":
      return JSON.stringify(currentTrack());
    case "currentVisual":
      return JSON.stringify(currentVisual());
    case "eqEnabled":
      return itunes.eqEnabled();
    case "fixedIndexing":
      return itunes.fixedIndexing();
    case "frontmost":
      return itunes.frontmost();
    case "fullScreen":
      return itunes.fullScreen();
    case "name":
      return itunes.name();
    case "mute":
      return itunes.mute();
    case "playerPosition":
      return itunes.playerPosition();
    case "playerState":
      return itunes.playerState();
    case "selection":
      return itunes.selection();
    case "shuffleEnabled":
      return itunes.shuffleEnabled();
    case "shuffleMode":
      return itunes.shuffleMode();
    case "songRepeat":
      return itunes.songRepeat();
    case "soundVolume":
      return itunes.soundVolume();
    case "version":
      return itunes.version();
    case "visualsEnabled":
      return itunes.visualsEnabled();
    case "visualSize":
      return itunes.visualSize();
    default:
      console.log("Unknown Arguments.");
      returnError();
  }
}
