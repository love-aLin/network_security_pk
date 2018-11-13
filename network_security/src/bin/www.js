/**
 * Module dependencies.
 */

import http from 'http'
import url from 'url'
import fs from 'fs'
import path from 'path'
import config from '../config'
import {app, server} from '../app'

let port = app.get('port')
let apiPort = app.get('apiPort')

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error)=> {
  if (error.syscall !== 'listen') {
    throw error
  }
  let bind = 'Port ' + port
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.log(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.log(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  console.log('访问地址: ' + config.secheme + '://' + config.host + ':' + port + '/')
  console.log('APIDoc: ' + config.secheme + '://' + config.host + ':' + apiPort + '/')
}

/**
 * Create HTTP server.
 */
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * API Server in dev env
 **/
if (!config.pro) {
  http.createServer((request, response) => {
    try {
      let requestUrl = url.parse(request.url).pathname
      if (requestUrl === '/') {
        requestUrl = '/index.html'
      }
      response.writeHead(200)
      let fileStream = fs.createReadStream(path.join(config.path.base, '/bin/apidoc', requestUrl))
      fileStream.pipe(response)
      fileStream.on('error', (e) => {
        response.writeHead(404) // assume the file doesn't exist
        response.end()
      })
    } catch (e) {
      response.writeHead(500)
      response.end()
    }
  }).listen(apiPort)
}
