'use strict'

// Begin unit test requirements
const sinon = require('sinon')
const expect = require('chai').expect
const request = require('supertest')
const fs = require('fs')
const handlebars = require('handlebars')
// End unit test requirements

// Import unit to test
const app = require('../app/worker.js')

// Begin tests
describe('WORKER.JS', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    this.sandbox.restore()
  })

  const agent = request.agent(app)

  it('GET / should render index', (done) => {
    fs.readFile('app/views/index.hbs', (err, data) => {
      // Compile the template and compare against what the server renders
      const compiledView = handlebars.compile(data.toString())()
      agent
      .get('/')
      .expect(compiledView)
      .expect(200, done)
    })
  })

  it('GET /music should render videos with music videos', (done) => {
    agent
    .get('/music')
    .expect(200, done)
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
