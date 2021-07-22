const itunes = Application('iTunes');

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
  })
}

/**
 * return exit code
 * @param {*} code error code 
 */
const returnError = (code = 1) => {
  ObjC.import('stdlib')
  $.exit(code)
}

function run(args) {
  switch(args[0]) {
    case "currentTrack":
      return JSON.stringify(currentTrack())
    default:
      console.log("Unknown Arguments.")
      returnError()
  }
}