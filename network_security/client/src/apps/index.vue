<!-- 入口文件 -->
<template>
  <div id="App">
    <app-network v-bind:params-msg="paramsMsg"></app-network>
    <app-node-tree></app-node-tree>
    <app-time-line @time_change="handleTimeChange"></app-time-line>
    <app-filter></app-filter>
  </div>
</template>
<script>
  // import template from './template.html'
  import {updateTestData} from '../vuex/actions'
  import {testData, testDataUpdateStatus} from '../vuex/getters'
  import AppNetwork from '../components/AppNetwork.vue'
  import AppNodeTree from '../components/AppNodeTree.vue'
  import AppTimeLine from '../components/AppTimeLine.vue'
  import AppFilter from '../components/AppFilter.vue'

  export default{
    // template,
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
        message: 'Hello World :)',
        isSuccess: false,
        isFailed: false,
        httpData: {
          demoMysql: null,
          demoPerson: null,
          postDemoPerson: null
        },
        paramsMsg: ''
      }
    },
    components: { AppNetwork, AppNodeTree, AppTimeLine, AppFilter },
    computed: {
      privateTestData: {
        get () {
          return this.testData
        },
        set (v) {
          this.updateTestData(v)
        }
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
      },
      handleTimeChange (res) {
        console.log('index vue!! hanle time change~~', res)
        this.paramsMsg = {
          where: {
            start_time: {
              $gte: res[0],
              $lt: res[1]
            }
          },
          limit: 5000
        }
      }
    },
    mounted () {
      // test
      // this.getDemoMysql()
      // this.getDemoPerson()
    }
  }
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>