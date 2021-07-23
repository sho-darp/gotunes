const itunes = Application("iTunes");

const toArray = (objects) => {
  const objArray = [];
  for (let i = 0; i < objects.length; i++) {
    objArray.push(objects[i]);
  }
  return objArray;
};

const getValue = (value) => {
  return (property) => {
    try {
      return value[property]();
    } catch (e) {
      return null;
    }
  };
};

/**
 * get Item properties
 * @param {*} item
 * @returns
 */
const getItem = (item) => {
  const getItemValue = getValue(item);
  return {
    class: getItemValue("class"),
    container: getItemValue("container"),
    id: getItemValue("id"),
    index: getItemValue("index"),
    name: getItemValue("name"),
    persistentId: getItemValue("persistentID"),
    properties: getItemValue("properties"),
  };
};

const getAirPlayDevices = (device) => {
  const getDeviceValue = getValue(device);
  return Object.assign(getItem(device), {
    active: getDeviceValue("active"),
    available: getDeviceValue("available"),
    kind: getDeviceValue("kind"),
    networkAddress: getDeviceValue("networkAddress"),
    protected: getDeviceValue("protected"),
    selected: getDeviceValue("selected"),
    supportsAudio: getDeviceValue("supportsAudio"),
    supportsVideo: getDeviceValue("supportsVideo"),
    soundVolume: getDeviceValue("soundVolume"),
  });
};

const getEncoder = (encoder) => {
  const getEncoderValue = getValue(encoder);
  return Object.assign(getItem(encoder), {
    format: getEncoderValue("format"),
  });
};

const getEQPreset = (eqPreset) => {
  const getEQPresetValue = getValue(eqPreset);
  return Object.assign(getItem(eqPreset), {
    band1: getEQPresetValue("band1"),
    band2: getEQPresetValue("band2()"),
    band3: getEQPresetValue("band3"),
    band4: getEQPresetValue("band4"),
    band5: getEQPresetValue("band5"),
    band6: getEQPresetValue("band6"),
    band7: getEQPresetValue("band7"),
    band8: getEQPresetValue("band8"),
    band9: getEQPresetValue("band9"),
    band10: getEQPresetValue("band10"),
    modifiable: getEQPresetValue("modifiable"),
    preamp: getEQPresetValue("preamp"),
    updateTracks: getEQPresetValue("updateTracks"),
  });
};

const getPlaylist = (playlist) => {
  const getPlaylistValue = getValue(playlist);
  return Object.assign(getItem(playlist), {
    description: getPlaylistValue("description"),
    disliked: getPlaylistValue("disliked"),
    duration: getPlaylistValue("duration"),
    name: getPlaylistValue("name"),
    loved: getPlaylistValue("loved"),
    parent: getPlaylistValue("parent"),
    shuffle: getPlaylistValue("shuffle"),
    size: getPlaylistValue("size"),
    songRepeat: getPlaylistValue("songRepeat"),
    specialKind: getPlaylistValue("specialKind"),
    time: getPlaylistValue("time"),
    visible: getPlaylistValue("visible"),
  });
};

const getArtwork = (artwork) => {
  const getArtworkValue = getValue(artwork);
  return Object.assign(getItem(artwork), {
    data: getArtworkValue("data"),
    description: getArtworkValue("description"),
    downloaded: getArtworkValue("downloaded"),
    format: getArtworkValue("format"),
    kind: getArtworkValue("kind"),
    rawData: getArtworkValue("rawData"),
  });
};

const getTrack = (track) => {
  const getTrackValue = getValue(track);
  const artworks =
    getTrackValue("artworks") == null
      ? []
      : toArray(track.artworks).map((artwork) => {
          return getArtwork(artwork);
        });

  return Object.assign(getItem(track), getTrackValue("properties"), {
    artworks: artworks,
  });
};

const getVisual = (visual) => {
  return getItem(visual);
};

const getBrowserWindow = (browserWindow) => {
  const getBrowserWindowValue = getValue(browserWindow);
  return Object.assign(getItem(browserWindow), {
    selection: getBrowserWindowValue("selection"),
    view: getPlaylist(browserWindow),
  });
};

const getWindow = (window) => {
  const getWindowValue = getValue(window);
  return Object.assign(getItem(window), {
    bounds: getWindowValue("bounds"),
    closeable: getWindowValue("closeable"),
    collapseable: getWindowValue("collapseable"),
    collapseable: getWindowValue("collapseable"),
    fullScreen: getWindowValue("fullScreen"),
    position: getWindowValue("position"),
    resizable: getWindowValue("resizable"),
    visible: getWindowValue("visible"),
    zoomable: getWindowValue("zoomable"),
    zoomed: getWindowValue("zoomed"),
  });
};

const getEQWindow = (eqWindow) => {
  return getWindow(eqWindow);
};

const getMiniplayerWindow = (miniplayerWindow) => {
  return getWindow(miniplayerWindow);
};

const getPlaylistWindow = (playlistWindow) => {
  // TODO: selectionの配列を変換する
  return Object.assign(getWindow(playlistWindow), {
    selection: getTrack(playlistWindow.selection)["0"],
    view: getPlaylist(playlistWindow),
  });
};

const getSources = (source) => {
  const getSourceValue = getValue(source);
  return Object.assign(getItem(source), {
    capacity: getSourceValue("capacity"),
    freeSpace: getSourceValue("freeSpace"),
    kind: getSourceValue("kind"),
  });
};

const getVideoWindow = (videoWindow) => {
  return getWindow(videoWindow);
};

/**
 * the currently selected AirPlay device(s)
 * @returns []airplayDevice
 */
const currentAirPlayDevices = () => {
  const devices = itunes.currentAirPlayDevices();
  return devices.map((device) => {
    return getAirPlayDevices(device);
  });
};

/**
 * the currently selected encoder (MP3, AIFF, WAV, etc.)
 * @returns Encoder
 */
const currentEncoder = () => {
  const encoder = itunes.currentEncoder();
  return getEncoder(encoder);
};

/**
 * the currently selected equalizer prese
 * @returns EQPreset
 */
const currentEQPreset = () => {
  const eqPreset = itunes.currentEQPreset();
  return getEQPreset(eqPreset);
};

/**
 * the playlist containing the currently targeted track
 * @returns playlist
 */
const currentPlaylist = () => {
  const playlist = itunes.currentPlaylist();
  return getPlaylist(playlist);
};

/**
 * the current targeted track
 * @returns track
 */
const currentTrack = () => {
  const track = itunes.currentTrack;
  return getTrack(track);
};

/**
 * the currently selected visual plug-in
 * @returns visual
 */
const currentVisual = () => {
  const visual = itunes.currentVisual();
  return getVisual(visual);
};

/**
 * main iTunes windows
 * @returns
 */
const browserWindow = () => {
  const browserWindows = toArray(itunes.browserWindows);
  return browserWindows.map((browserWindow) => getBrowserWindow(browserWindow));
};

const windows = () => {
  const windows = toArray(itunes.windows);
  return windows.map((window) => getWindow(window));
};

const encoders = () => {
  const encoders = toArray(itunes.encoders);
  return encoders.map((encoder) => getEncoder(encoder));
};

const eqPresets = () => {
  const eqPresets = toArray(itunes.eqPresets);
  return eqPresets.map((eqPreset) => getEQPreset(eqPreset));
};

const eqWindows = () => {
  const eqWindows = toArray(itunes.eqWindows);
  return eqWindows.map((eqWindow) => getEQWindow(eqWindow));
};

const miniplayerWindows = () => {
  const miniplayerWindows = toArray(itunes.miniplayerWindows);
  return miniplayerWindows.map((miniplayerWindow) =>
    getMiniplayerWindow(miniplayerWindow)
  );
};

const playlists = () => {
  const playlists = toArray(itunes.playlists);
  return playlists.map((playlist) => getPlaylist(playlist));
};

const playlistWindows = () => {
  const playlistWindows = toArray(itunes.playlistWindows);
  return playlistWindows.map((playlistWidow) =>
    getPlaylistWindow(playlistWidow)
  );
};

const sources = () => {
  const sources = toArray(itunes.sources);
  return sources.map((source) => getSources(source));
};

const tracks = () => {
  // TODO: 処理速度が遅い
  return [];
  // const tracks = toArray(itunes.tracks);
  // return tracks.map((track) => getTrack(track));
};

const videoWindows = () => {
  const videoWindows = toArray(itunes.videoWindows);
  return videoWindows.map((videoWindow) => getVideoWindow(videoWindow));
};

const visuals = () => {
  const visuals = toArray(itunes.visuals);
  return visuals.map((visual) => getVisual(visual));
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
    //
    case "browserWindows":
      return JSON.stringify(browserWindow());
    case "encoders":
      return JSON.stringify(encoders());
    case "eqPresets":
      return JSON.stringify(eqPresets());
    case "eqWindows":
      return JSON.stringify(eqWindows());
    case "miniplayerWindows":
      return JSON.stringify(miniplayerWindows());
    case "playlists":
      return JSON.stringify(playlists());
    case "playlistWindows":
      return JSON.stringify(playlistWindows());
    case "sources":
      return JSON.stringify(sources());
    case "tracks":
      return JSON.stringify(tracks());
    case "videoWindows":
      return JSON.stringify(videoWindows());
    case "visuals":
      return JSON.stringify(visuals());
    case "windows":
      return JSON.stringify(windows());

    default:
      console.log("Unknown Arguments.");
      returnError();
  }
}
