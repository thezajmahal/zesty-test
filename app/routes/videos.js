'use strict'

// Begin module requirements
const error = require('feathers-errors')
const getVideos = require('./bin/getVideos')
const bunyan = require('bunyan')
// End module requirements

// Begin video fetcher
var fetchedVideos = {
  music: [],
  commercial: [],
  documentary: [],
}

getVideos((videoList) => {
  fetchedVideos = videoList
})

setInterval(() => {
  getVideos((videoList) => {
    fetchedVideos = videoList
  })
}, 60000)
// End video fetcher

// Begin service definition
module.exports = (app) => {
  app.get('/music', (req, res, next) => {
    res.render('videos', { title: 'Music Videos - Zesty Productions', videos: fetchedVideos.music})
  })
  app.get('/commercial', (req, res, next) => {
    res.render('videos', { title: 'Commercials - Zesty Productions', videos: fetchedVideos.commercial})
  })
  app.get('/documentary', (req, res, next) => {
    res.render('videos', { title: 'Documentaries - Zesty Productions', videos: fetchedVideos.documentary})
  })
}
// End service definition
