'use strict'

// Begin unit test requirements
const sinon = require('sinon')
const expect = require('chai').expect
const request = require('supertest')
const fs = require('fs')
const handlebars = require('handlebars')
// End unit test requirements

// Begin mock app
const error = require('feathers-errors')

const feathers = require('feathers')
const rest = require('feathers-rest')
const bodyParser = require('body-parser')

const app = feathers()
.configure(rest())
.use(bodyParser.json())

app.set('views', 'app/views');
app.set('view engine', 'hbs');
var hbs = require('hbs');

// Import unit to test
require('../app/routes/index')(app)
// End mock app

// Begin unit tests
describe('INDEX.JS', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    this.sandbox.restore()
  })

  const agent = request.agent(app)

  // Load partials
  const partialsDir = 'app/views/partials/'
  fs.readdir(partialsDir, (err, data) => {
    for (var i = 0; i < data.length; i++) {
      let filenames = data
      let selector = i
      fs.readFile(`${partialsDir}${filenames[selector]}`, (err, partialBuffer) => {
        let partialName = filenames[selector].slice(0, -4)
        let partial = partialBuffer.toString()
        handlebars.registerPartial(partialName, partial)
        hbs.registerPartial(partialName, partial)
      })
    }
  })

  it('GET / renders index page', (done) => {
    fs.readFile('app/views/index.hbs', (err, data) => {
      // Compile the template and compare against what the server renders
      const compiledView = handlebars.compile(data.toString())()
      agent
      .get('/')
      .expect(compiledView)
      .expect(200, done)
    })
  })
})
