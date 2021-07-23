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

  const tracks = toArray(playlist.tracks).map((track) => getTrack(track));
  const artworks = toArray(playlist.artworks).map((artwork) =>
    getArtwork(artwork)
  );

  return Object.assign(getItem(playlist), {
    tracks,
    artworks,
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

const getSource = (source) => {
  const getSourceValue = getValue(source);

  // TODO: 高速化
  const audioCDPlaylists = toArray(source.audioCDPlaylists).map(
    (audioCDPlaylist) => getAudioCDPlaylist(audioCDPlaylist)
  );
  // const libraryPlaylists = toArray(source.libraryPlaylists).map(libraryPlaylist => getLibraryPlayList(libraryPlaylist))
  // const playlists = toArray(source.playlists).map(playlist => getPlaylist(playlist))
  const subscriptionPlaylists = toArray(source.subscriptionPlaylists).map(
    (subscriptionPlaylist) => getSubscriptionPlaylist(subscriptionPlaylist)
  );
  // const userPlaylists = toArray(source.userPlaylists).map(userPlaylist => getUserPlaylist(userPlaylist))
  const radioTunerPlaylists = toArray(source.radioTunerPlaylists).map(
    (radioTunerPlaylist) => getRadioTunerPlaylist(radioTunerPlaylist)
  );

  return Object.assign(getItem(source), {
    audioCDPlaylists,
    // libraryPlaylists,
    // playlists,
    subscriptionPlaylists,
    // userPlaylists,
    radioTunerPlaylists,
    capacity: getSourceValue("capacity"),
    freeSpace: getSourceValue("freeSpace"),
    kind: getSourceValue("kind"),
  });
};

const getVideoWindow = (videoWindow) => {
  return getWindow(videoWindow);
};

const getUserPlaylist = (userPlaylist) => {
  const getUserPlayListValue = getValue(userPlaylist);
  // // TODO: 高速化
  // const fileTracks =
  // getUserPlayListValue("fileTracks") == null
  //   ? []
  //   : toArray(userPlaylist.fileTracks).map((fileTrack) => {
  //       return getFileTrack(fileTrack);
  //     });
  const fileTracks = [];

  const urlTracks =
    getUserPlayListValue("urlTracks") == null
      ? []
      : toArray(userPlaylist.urlTracks).map((urlTrack) => {
          return getUrlTrack(urlTrack);
        });

  const sharedTracks =
    getUserPlayListValue("sharedTracks") == null
      ? []
      : toArray(userPlaylist.sharedTracks).map((sharedTrack) => {
          return getSharedTrack(sharedTrack);
        });

  return Object.assign(getPlaylist(userPlaylist), {
    fileTracks,
    urlTracks,
    sharedTracks,
    shared: getUserPlayListValue("shared"),
    smart: getUserPlayListValue("smart"),
    genius: getUserPlayListValue("genius"),
  });
};

const getFileTrack = (fileTrack) => {
  const getFileTrackValue = getValue(fileTrack);
  return Object.assign(getTrack(fileTrack), {
    location: getFileTrackValue("location"),
  });
};

const getURLTrack = (urlTrack) => {
  const getURLTrackValue = getValue(urlTrack);
  return Object.assign(getTrack(urlTrack), {
    address: getURLTrackValue("address"),
  });
};

const getSharedTrack = (sharedTrack) => {
  return getTrack(sharedTrack);
};

const getSubscriptionPlaylist = (subscriptionPlaylist) => {
  const getSubscriptionPlaylistValue = getValue(subscriptionPlaylist);
  // 高速化
  // const fileTracks =
  // getSubscriptionPlaylistValue("fileTracks") == null
  //   ? []
  //   : toArray(subscriptionPlaylist.fileTracks).map((fileTrack) => {
  //       return getFileTrack(fileTrack);
  //     });
  const fileTracks = [];

  const urlTracks =
    getSubscriptionPlaylistValue("urlTracks") == null
      ? []
      : toArray(subscriptionPlaylist.urlTracks).map((urlTrack) => {
          return getUrlTrack(urlTrack);
        });

  return {
    fileTracks,
    urlTracks,
  };
};

const getLibraryPlayList = (libraryPlayList) => {
  const fileTracks = [];
  // const fileTracks = toArray(libraryPlayList.fileTracks).map((fileTrack) => getFileTrack(fileTrack));
  const urlTracks = toArray(libraryPlayList.urlTracks).map((urlTrack) =>
    getUrlTrack(urlTrack)
  );
  const sharedTracks = toArray(libraryPlayList.sharedTracks).map(
    (sharedTrack) => getSharedTrack(sharedTrack)
  );

  return Object.assign(getPlaylist(libraryPlayList), {
    fileTracks,
    urlTracks,
    sharedTracks,
  });
};

const getFolderPlaylist = (folderPlaylist) => {
  const getFolderPlaylistValue = getValue(folderPlaylist);

  const fileTracks = [];
  // const fileTracks = toArray(libraryPlayList.fileTracks).map((fileTrack) => getFileTrack(fileTrack));
  const urlTracks = toArray(folderPlaylist.urlTracks).map((urlTrack) =>
    getUrlTrack(urlTrack)
  );
  const sharedTracks = toArray(folderPlaylist.sharedTracks).map((sharedTrack) =>
    getSharedTrack(sharedTrack)
  );

  return Object.assign(getUserPlaylist(folderPlaylist), {
    fileTracks,
    urlTracks,
    sharedTracks,
    shared: getFolderPlaylistValue("shared"),
    smart: getFolderPlaylistValue("smart"),
    genius: getFolderPlaylistValue("genius"),
  });
};

const getAudioCDTrack = (audioCDTrack) => {
  const getAudioCDTrackValue = getValue(audioCDTrack);
  return Object.assign(getTrack(audioCDTrack), {
    location: getAudioCDTrackValue("location"),
  });
};

const getAudioCDPlaylist = (audioCDPlaylist) => {
  const getAudioCDPlaylistValue = getValue(audioCDPlaylist);
  const audioCDTracks = toArray(audioCDPlaylist.audioCDTracks).map(
    (audioCDTrack) => getAudioCDTrack(audioCDTrack)
  );

  return Object.assign(getPlaylist(audioCDPlaylist), {
    audioCDTracks,
    artist: getAudioCDPlaylistValue("artist"),
    compilation: getAudioCDPlaylistValue("compilation"),
    composer: getAudioCDPlaylistValue("composer"),
    discCount: getAudioCDPlaylistValue("discCount"),
    discNumber: getAudioCDPlaylistValue("discNumber"),
    genre: getAudioCDPlaylistValue("genre"),
    year: getAudioCDPlaylistValue("year"),
  });
};

const getRadioTunerPlaylist = (radioTunerPlaylist) => {
  const urlTracks = toArray(radioTunerPlaylist.urlTracks).map((urlTrack) =>
    getUrlTrack(urlTrack)
  );
  return Object.assign(getPlaylist(radioTunerPlaylist), {
    urlTracks,
  });
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
  return sources.map((source) => getSource(source));
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

const userPlaylists = () => {
  const userPlaylists = toArray(itunes.userPlaylists);
  return userPlaylists.map((userPlaylist) => getUserPlaylist(userPlaylist));
};

const subscriptionPlaylists = () => {
  const subscriptionPlaylists = toArray(itunes.subscriptionPlaylists);
  return subscriptionPlaylists.map((subscriptionPlaylist) =>
    getSubscriptionPlaylist(subscriptionPlaylist)
  );
};

const libraryPlaylists = () => {
  const libraryPlaylists = toArray(itunes.libraryPlaylists);
  return libraryPlaylists.map((libraryPlaylist) =>
    getLibraryPlayList(libraryPlaylist)
  );
};

const folderPlaylists = () => {
  const folderPlaylists = toArray(itunes.folderPlaylists);
  return folderPlaylists.map((folderPlaylist) =>
    getFolderPlaylists(folderPlaylist)
  );
};

const audioCDPlaylists = () => {
  const audioCDPlaylists = toArray(itunes.audioCDPlaylists);
  return audioCDPlaylists.map((audioCDPlaylist) =>
    getAudioCDPlaylist(audioCDPlaylist)
  );
};

const radioTunerPlaylists = () => {
  const radioTunerPlaylists = toArray(itunes.radioTunerPlaylists);
  return radioTunerPlaylists.map((radioTunerPlaylist) =>
    getRadioTunerPlaylist(radioTunerPlaylist)
  );
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
    // case "userPlaylists":
    //   return JSON.stringify(userPlaylists());
    // case "subscriptionPlaylists":
    //   return JSON.stringify(subscriptionPlaylists());
    // case "libraryPlaylists":
    //   return JSON.stringify(libraryPlaylists());
    // case "folderPlaylists":
    //   return JSON.stringify(folderPlaylists());
    // case "audioCDPlaylists":
    //   return JSON.stringify(folderPlaylists());
    // case "radioTunerPlaylist":
    //   return JSON.stringify(radioTunerPlaylists());
    case "backTrack":
      return itunes.backTrack();
    case "fastForward":
      return itunes.fastForward();
    case "nextTrack":
      return itunes.nextTrack();
    case "pause":
      return itunes.pause();
    case "playpause":
      return itunes.playpause();
    case "previousTrack":
      return itunes.previousTrack();
    case "resume":
      return itunes.resume();
    case "rewind":
      return itunes.rewind();
    case "stop":
      return itunes.stop();
    default:
      console.log("Unknown Arguments.");
      returnError();
  }
}

itunes.backTrack();
