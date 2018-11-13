/**
 * Created by xufengchao on 16/9/20.
 */
import {logs} from '../commons/utils'

let _logs = logs('Routers')

export default (router, conf, namespace) => {
  if (namespace.charAt(0) !== '/') {
    namespace = '/' + namespace
  }
  for (let uri in conf) {
    let actions = conf[ uri ]
    if (uri.charAt(0) !== '/') {
      uri = '/' + uri
    }
    let path = [ namespace, uri ].join('')
    actions.forEach((item) => {
      let method = item.method
      let callback = item.callback
      if (callback instanceof Array) {
        callback.forEach((cb) => {
          if (cb instanceof Function) {
            router.route(path)[ method ](cb)
          }
        })
      } else {
        router.route(path)[ method ](callback)
      }
      _logs('Path:' + path + ' Method:' + method)
    })
  }
}
