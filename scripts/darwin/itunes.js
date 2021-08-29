const app = Application.currentApplication();
app.includeStandardAdditions = true;
const version = Number(app.doShellScript("sw_vers -productVersion| cut -d '.' -f 1-2"));
const itunes = version < 10.15 ? Application("iTunes") : Application("Music");

const map = (array, callback) => {
  const objArray = [];
  for (let i = 0; i < array.length; i++) {
    objArray.push(callback(array[i], i));
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
    lyrics: JSON.stringify(getTrackValue("lyrics"))
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

  // FIXME: 高速化
  const audioCDPlaylists = map(source.audioCDPlaylists, (audioCDPlaylist) =>
    getAudioCDPlaylist(audioCDPlaylist)
  );
  const libraryPlaylists = map(source.libraryPlaylists, libraryPlaylist => getLibraryPlayList(libraryPlaylist))
  const playlists = map(source.playlists, playlist => getPlaylist(playlist))
  const subscriptionPlaylists = map(
    source.subscriptionPlaylists,
    (subscriptionPlaylist) => getSubscriptionPlaylist(subscriptionPlaylist)
  );
  const userPlaylists = map(source.userPlaylists, userPlaylist => getUserPlaylist(userPlaylist))
  const radioTunerPlaylists = map(
    source.radioTunerPlaylists,
    (radioTunerPlaylist) => getRadioTunerPlaylist(radioTunerPlaylist)
  );

  return Object.assign(getItem(source), {
    audioCDPlaylists,
    libraryPlaylists,
    playlists,
    subscriptionPlaylists,
    userPlaylists,
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
  // FIXME: 高速化
  const fileTracks =
  getUserPlayListValue("fileTracks") == null
    ? []
    : map(userPlaylist.fileTracks, (fileTrack) => {
        return getFileTrack(fileTrack);
      });

  const urlTracks =
    getUserPlayListValue("urlTracks") == null
      ? []
      : map(userPlaylist.urlTracks, (urlTrack) => {
          return getUrlTrack(urlTrack);
        });

  const sharedTracks =
    getUserPlayListValue("sharedTracks") == null
      ? []
      : map(userPlaylist.sharedTracks, (sharedTrack) => {
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
  // FIXME: 高速化
  const fileTracks =
  getSubscriptionPlaylistValue("fileTracks") == null
    ? []
    : map(subscriptionPlaylist.fileTracks, (fileTrack) => {
        return getFileTrack(fileTrack);
      });

  const urlTracks =
    getSubscriptionPlaylistValue("urlTracks") == null
      ? []
      : map(subscriptionPlaylist.urlTracks, (urlTrack) => {
          return getUrlTrack(urlTrack);
        });

  return {
    fileTracks,
    urlTracks,
  };
};

const getLibraryPlayList = (libraryPlayList) => {
  const fileTracks = map(libraryPlayList.fileTracks, (fileTrack) => getFileTrack(fileTrack));
  const urlTracks = map(libraryPlayList.urlTracks, (urlTrack) =>
    getUrlTrack(urlTrack)
  );
  const sharedTracks = map(libraryPlayList.sharedTracks, (sharedTrack) =>
    getSharedTrack(sharedTrack)
  );

  return Object.assign(getPlaylist(libraryPlayList), {
    fileTracks,
    urlTracks,
    sharedTracks,
  });
};

const getFolderPlaylist = (folderPlaylist) => {
  const getFolderPlaylistValue = getValue(folderPlaylist);

  const fileTracks = map(libraryPlayList.fileTracks, (fileTrack) => getFileTrack(fileTrack));
  const urlTracks = map(folderPlaylist.urlTracks, (urlTrack) =>
    getUrlTrack(urlTrack)
  );
  const sharedTracks = map(folderPlaylist.sharedTracks, (sharedTrack) =>
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
  const audioCDTracks = map(audioCDPlaylist.audioCDTracks, (audioCDTrack) =>
    getAudioCDTrack(audioCDTrack)
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
  const urlTracks = map(radioTunerPlaylist.urlTracks, (urlTrack) =>
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
const currentAirPlayDevices = (options) => {
  const devices = itunes.currentAirPlayDevices();
  return devices.map((device) => {
    return getAirPlayDevices(device);
  });
};

/**
 * the currently selected encoder (MP3, AIFF, WAV, etc.)
 * @returns Encoder
 */
const currentEncoder = (options) => {
  const encoder = itunes.currentEncoder();
  return getEncoder(encoder);
};

/**
 * the currently selected equalizer prese
 * @returns EQPreset
 */
const currentEQPreset = (options) => {
  const eqPreset = itunes.currentEQPreset();
  return getEQPreset(eqPreset);
};

/**
 * the playlist containing the currently targeted track
 * @returns playlist
 */
const currentPlaylist = (options) => {
  const playlist = itunes.currentPlaylist();
  return getPlaylist(playlist, options);
};

/**
 * the current targeted track
 * @returns track
 */
const currentTrack = (options) => {
  const track = itunes.currentTrack;
  return getTrack(track, options);
};

/**
 * the currently selected visual plug-in
 * @returns visual
 */
const currentVisual = (options) => {
  const visual = itunes.currentVisual();
  return getVisual(visual);
};

/**
 * main iTunes windows
 * @returns
 */
const browserWindow = (options) => {
  return map(itunes.browserWindows, (browserWindow) =>
    getBrowserWindow(browserWindow)
  );
};

const windows = () => {
  return map(itunes.windows, (window) => getWindow(window));
};

const encoders = (options) => {
  return map(itunes.encoders, (encoder) => getEncoder(encoder));
};

const eqPresets = (options) => {
  return map(itunes.eqPresets, (eqPreset) => getEQPreset(eqPreset));
};

const eqWindows = (options) => {
  return map(itunes.eqWindows, (eqWindow) => getEQWindow(eqWindow));
};

const miniplayerWindows = (options) => {
  return map(itunes.miniplayerWindows, (miniplayerWindow) =>
    getMiniplayerWindow(miniplayerWindow)
  );
};

const playlists = (options) => {
  return map(itunes.playlists, (playlist) => getPlaylist(playlist));
};

const playlistWindows = (options) => {
  return map(itunes.playlistWindows, (playlistWidow) =>
    getPlaylistWindow(playlistWidow)
  );
};

const sources = (options) => {
  return map(itunes.sources, (source) => getSource(source));
};

const tracks = (options) => {
  // FIXME: 処理速度が遅い
  return map(itunes.tracks, (track) => getTrack(track));
};

const videoWindows = (options) => {
  return map(itunes.videoWindows, (videoWindow) => getVideoWindow(videoWindow));
};

const visuals = (options) => {
  return map(itunes.visuals, (visual) => getVisual(visual));
};

const userPlaylists = (options) => {
  return map(itunes.userPlaylists, (userPlaylist) =>
    getUserPlaylist(userPlaylist)
  );
};

const subscriptionPlaylists = (options) => {
  return map(itunes.subscriptionPlaylists, (subscriptionPlaylist) =>
    getSubscriptionPlaylist(subscriptionPlaylist)
  );
};

const libraryPlaylists = (options) => {
  return map(itunes.libraryPlaylists, (libraryPlaylist) =>
    getLibraryPlayList(libraryPlaylist)
  );
};

const folderPlaylists = (options) => {
  return map(itunes.folderPlaylists, (folderPlaylist) =>
    getFolderPlaylists(folderPlaylist)
  );
};

const audioCDPlaylists = (options) => {
  return map(itunes.audioCDPlaylists, (audioCDPlaylist) =>
    getAudioCDPlaylist(audioCDPlaylist)
  );
};

const radioTunerPlaylists = (options) => {
  return map(itunes.radioTunerPlaylists, (radioTunerPlaylist) =>
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
  const command = args[0];
  const options = {};
  args
    .slice(1)
    .filter((arg) => /^.+=.+$/.test(arg))
    .forEach((arg) => {
      const [key, value] = arg.split("=");
      options[key] = value;
    });

  switch (command) {
    case "airplayEnabled":
      return itunes.airplayEnabled();
    case "converting":
      return itunes.converting();
    case "currentAirPlayDevices":
      return JSON.stringify(currentAirPlayDevices(options));
    case "currentEncoder":
      return JSON.stringify(currentEncoder(options));
    case "currentEQPreset":
      return JSON.stringify(currentEQPreset(options));
    case "currentPlaylist":
      return JSON.stringify(currentPlaylist(options));
    case "currentStreamTitle":
      return itunes.currentStreamTitle();
    case "currentStreamURL":
      return itunes.converting();
    case "currentTrack":
      return JSON.stringify(currentTrack(options));
    case "currentVisual":
      return JSON.stringify(currentVisual(options));
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
      return JSON.stringify(browserWindow(options));
    case "encoders":
      return JSON.stringify(encoders(options));
    case "eqPresets":
      return JSON.stringify(eqPresets(options));
    case "eqWindows":
      return JSON.stringify(eqWindows(options));
    case "miniplayerWindows":
      return JSON.stringify(miniplayerWindows(options));
    case "playlists":
      return JSON.stringify(playlists(options));
    case "playlistWindows":
      return JSON.stringify(playlistWindows(options));
    case "sources":
      return JSON.stringify(sources(options));
    case "tracks":
      return JSON.stringify(tracks(options));
    case "videoWindows":
      return JSON.stringify(videoWindows(options));
    case "visuals":
      return JSON.stringify(visuals(options));
    case "windows":
      return JSON.stringify(windows(options));
    case "userPlaylists":
      return JSON.stringify(userPlaylists(options));
    case "subscriptionPlaylists":
      return JSON.stringify(subscriptionPlaylists(options));
    case "libraryPlaylists":
      return JSON.stringify(libraryPlaylists(options));
    case "folderPlaylists":
      return JSON.stringify(folderPlaylists(options));
    case "audioCDPlaylists":
      return JSON.stringify(folderPlaylists(options));
    case "radioTunerPlaylist":
      return JSON.stringify(radioTunerPlaylists(options));
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
