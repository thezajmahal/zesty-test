'use strict'

const throng = require('throng')
const os = require('os')

const worker = require('./app/worker')

const workers = process.env.WEB_CONCURRENCY || os.cpus()

const port = process.env.PORT || 8080

throng(workers, startWorker)

function startWorker (id) {
  const listener = worker.listen(port, () => {
    console.log(`started worker ${id} on port ${listener.address().port}`);
  })
}
