import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import Http from 'vue-resource'
import App from 'APPS/index.vue'
import Store from '../vuex/index'
import config from '../commons/config'

// 原型链安装
Vue.prototype.CommonsConfig = config

Vue.use(Http)

let run = function () {
  return new Vue({
    el: '#my-app',
    replace: false,
    components: { App },
    store: Store
  })
}

run()
