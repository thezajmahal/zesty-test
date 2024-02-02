'use strict'

const error = require('feathers-errors')

const feathers = require('feathers')
const rest = require('feathers-rest')
const bodyParser = require('body-parser')

const app = feathers()
.configure(rest())
.use(bodyParser.json())
.use(feathers.static('public'));

app.set('views', 'app/views');
app.set('view engine', 'hbs');
var hbs = require('hbs');
hbs.registerPartials('app/views/partials/')

require('../app/routes/index')(app)
require('../app/routes/videos')(app)
require('../app/routes/about')(app)

// Exception tracking
// if(process.env.NODE_ENV === 'production') {
//   var raygunClient = new raygun.Client().init({ apiKey: process.env.RAYGUN_APIKEY });
//   app.use(raygunClient.expressHandler)
// }

// Propper errors for clients
// require('./bin/errorHandler')(app)

module.exports = app
