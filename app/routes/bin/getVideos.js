'use strict'

// Begin dependencies
const Vimeo = require('vimeo').Vimeo
// End dependencies

var lib = new Vimeo(process.env.VIMEO_CLIENT_ID, process.env.VIMEO_CLIENT_SECRET, process.env.VIMEO_ACCESS_TOKEN);

module.exports = (callback) => {
  const albums = [
    {
      name: 'music',
      albumURL: 'users/zestyproductions/albums/3905617/videos',
    },
    {
      name: 'documentary',
      albumURL: 'users/zestyproductions/albums/4074478/videos',
    },
    {
      name: 'commercial',
      albumURL: 'users/zestyproductions/albums/3905616/videos',
    },
  ]
  getArrayFromAlbums(albums, (listOfVideos) => {
    callback(listOfVideos)
  })
}

function getArrayFromAlbums(albums, callback) {
  // if API call fails and passes in empty object
  if(!albums) callback(null)
  // Crate array for videos to be added to
  let fetchedVideos = {}
  for (var i = 0; i < albums.length; i++) {
    // Define local vars for getVideoAtPath callback
    const localAlbums = albums
    const z = i
    // Fetch album's videos
    getVideoAtPath(albums[i].albumURL, (err, body) => {
      fetchedVideos[localAlbums[z].name] = []
      if(err) callback(err, null)
      else {
        // For each video in the album, add it to an array in a labled object in fetchedVideos
        for (var i = 0; i < body.data.length; i++) {
          fetchedVideos[localAlbums[z].name].push({
            name: body.data[i].name,
            thumb: `https:\//i.vimeocdn.com/video/${body.data[i].pictures.uri.substring(27, 36)}_480x219.jpg`,
            embed: body.data[i].embed.html,
            uri: `@{body.data[i].uri}?api=1&player_id=displayed-video`
          })
        }
      }
      // When all videos have been fetched, call back with the object
      if(fetchedVideos.commercial && fetchedVideos.documentary && fetchedVideos.music) callback(fetchedVideos);
    })
  }
}

function getVideoAtPath(path, callback) {
  lib.request({
    method: 'GET',
    path: path,
    query: {
      per_page: 15,
      filter_embeddable: true
    },
  }, (err, body, status) => {
    callback(err, body)
  })
}
