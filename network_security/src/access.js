/**
 * Created by huangxinxin on 16/7/11.
 * Access Log
 */

import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
import FileStreamRotator from 'file-stream-rotator'
import config from './config'

export default (app) => {
  let accessLogDirectory = config.path.logsAbs
  fs.existsSync(accessLogDirectory) || fs.mkdirSync(accessLogDirectory)
  let accessLogStream = FileStreamRotator.getStream({
    filename: path.join(accessLogDirectory, 'Access-%DATE%.log'),
    date_format: 'YYYY-MM-DD',
    frequency: 'daily',
    verbose: false
  })
  app.use(morgan('combined', { stream: accessLogStream }))
}
