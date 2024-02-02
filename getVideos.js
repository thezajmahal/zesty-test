'use strict'

// Begin unit test requirements
const sinon = require('sinon')
const expect = require('chai').expect
// End unit test requirements

// Import unit to test
const getVideos = require('../app/routes/bin/getVideos')

// Begin unit test
describe('GETVIDEOS.JS', () => {
  it('getVideos() should return an array of videos', (done) => {
    getVideos((videosList) => {
      expect(videosList).to.be.an('object')
      expect(videosList).to.have.all.keys(['documentary', 'commercial', 'music'])
      // And pray that each array has the goods
      done()
    })
  })

})
// End unit test
