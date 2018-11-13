/**
 * Created by huangxinxin on 16/8/22.
 */
import style from './style.less'
import template from './template.html'
import {updateTestData} from '../vuex/actions'
import {testData, testDataUpdateStatus} from '../vuex/getters'
import AppNetwork from '../components/AppNetwork.vue'
import AppNodeTree from '../components/AppNodeTree.vue'

export default{
  template,
  vuex: {
    actions: {
      updateTestData
    },
    getters: {
      testData, testDataUpdateStatus
    }
  },
  data () {
    return {
      style,
      message: 'Hello World :)',
      isSuccess: false,
      isFailed: false,
      httpData: {
        demoMysql: null,
        demoPerson: null,
        postDemoPerson: null
      }
    }
  },
  components: { AppNetwork, AppNodeTree },
  computed: {
    privateTestData: {
      get () {
        return this.testData
      },
      set (v) {
        this.updateTestData(v)
      }
    },
    className () {
      let obj = {}
      obj[ style[ 'hl-span' ] ] = this.isSuccess
      obj[ style[ 'hl-span-error' ] ] = this.isFailed
      return obj
    }
  },
  watch: {
    testDataUpdateStatus (now) {
      if (this.CommonsConfig.debug) {
        console.log(now)
        this.isSuccess = this.VuexUtils.isStatusEqual(now, this.VuexMutations.TEST_DATA_UPDATE_SUCCESS)
        this.isFailed = this.VuexUtils.isStatusEqual(now, this.VuexMutations.TEST_DATA_UPDATE_FAILED)
      }
    }
  },
  methods: {
    getDemoMysql () {
      this.$http.get('/api/demo-mysql')
        .then((res) => {
          window.test_res = res.body
          this.httpData.demoMysql = res.body
        }, (res) => {
          this.httpData.demoMysql = res.body
        })
    },
    getDemoPerson () {
      this.$http.get('/api/demo-person')
        .then((res) => {
          this.httpData.demoPerson = res.body
        }, (res) => {
          this.httpData.demoPerson = res.body
        })
    },
    postDemoPerson () {
      this.$http.post('/api/demo-person', {
        name: 'name-' + Math.random(),
        sex: [ 'F', 'M' ][ ~~(Math.random() * 2) ],
        description: 'some desc -' + Math.random()
      }).then((res) => {
        this.httpData.postDemoPerson = res.body
      }, (res) => {
        this.httpData.postDemoPerson = res.body
      })
    }
  },
  ready () {
    // test
    // this.getDemoMysql()
    // this.getDemoPerson()
  }

}
