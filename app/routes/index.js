'use strict'

// Begin module requirements
const error = require('feathers-errors')
// End module requirements

// Begin service definition
module.exports = (app) => {
  app.get('/', (req, res, next) => {
    res.render('index.hbs', { title: 'Zesty Productions' })
  })
}
// End service definition
