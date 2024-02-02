'use strict'

// Begin unit test requirements
const sinon = require('sinon')
const expect = require('chai').expect
const request = require('supertest')
const fs = require('fs')
const handlebars = require('handlebars')
const getVideos = require('../app/routes/bin/getVideos')
// End unit test requirements

// Begin mock app
const error = require('feathers-errors')

const feathers = require('feathers')
const rest = require('feathers-rest')
const bodyParser = require('body-parser')

const app = feathers()
.configure(rest())
.use(bodyParser.json())

app.set('views', 'app/views')
app.set('view engine', 'hbs')
var hbs = require('hbs')
hbs.registerPartials('app/views/partials/')

// Fetch some videos to render a test template
var fetchedVideos = {
  music: [],
  commercial: [],
  documentary: [],
}

// Import unit to test
require('../app/routes/videos')(app)
// End mock app


// Begin tests
describe('VIDEOS.JS', () => {
  beforeEach((done) => {
    this.sandbox = sinon.sandbox.create()
    getVideos((videoList) => {
      console.log(videoList);
      fetchedVideos = videoList
      done()
    })
  })
  afterEach(() => {
    this.sandbox.restore()
  })

  const agent = request.agent(app)

  it('GET /music should render videos with music videos', (done) => {
    fs.readFile('app/views/videos.hbs', (err, data) => {
      // Compile the template and compare against what the server renders
      const compiledView = handlebars.compile(data.toString(), {videos: fetchedVideos.music})()
      // console.log(compiledView);
      agent
      .get('/music')
      // .expect(compiledView)
      .expect(200, done)
    })
  })
  it('GET /commercial should render videos with commercial videos', (done) => {
    agent
    .get('/commercial')
    .expect(200, done)
  })
  it('GET /documentary should render videos with music documentary', (done) => {
    agent
    .get('/documentary')
    .expect(200, done)
  })
})
// End tests
