/**
 * Created by huangxinxin on 16/9/13.
 */
import moment from 'moment'
import config from '../config'

const resJsonMaker = ({ data = '', msg = '', err = false, json = false } = {}) => {
  if (json && data) {
    try {
      data = JSON.parse(JSON.stringify(data))
    } catch (err) {
      console.log('resJsonMaker', err)
    }
  }
  return {
    data: data || '', message: msg, error: err
  }
}

const getCompleteHost = (req) => {
  let arr = [ req.protocol, '://', req.hostname ]
  if (config.port) {
    arr.push(':' + config.port)
  }
  return arr.join('')
}

const getCompleteUrl = (req) => {
  return getCompleteHost(req) + req.originalUrl
}

const logs = (prefix) => {
  if (prefix) {
    prefix = '[' + prefix + ']'
  }
  return (msg, err) => {
    let args = [ moment().format(config.time.formatStr) + ' ' + prefix + ' => {\n' ]
    if (msg) {
      args.push(msg)
    }
    if (err) {
      args.push('\n Error(\n', err, '\n )')
    }
    args.push('\n}\n')
    console.log.apply(console, args)
  }
}

export {
  resJsonMaker,
  getCompleteHost,
  getCompleteUrl,
  logs
}
