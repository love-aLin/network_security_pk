<!--*author:Ye Zhang *day:2018-1-06 -->
<template>
  <div id = 'timeline-panel'>
      <app-title v-bind:icon="icon" v-bind:msgs="msgs"></app-title>
      <div id="filter">
        <label for="timeSpan" >全局时间跨度：</label >
        <select id="timeSpan" v-model="selected_s" >
            <option v-for="item in items_s" v-bind:value="item.value">{{item.text}}</option>
        </select>
        <label for="timeGranularity" >时间粒度：</label>
        <select id="timeGranularity" v-model="selected_g" >
            <option v-for="item in items_g" v-bind:value="item.value" >{{item.text}}</option>
        </select>

        <span >时刻指示器：<span id="currentTime">2016/8/15 0:00:00</span></span>

        <button id="pause"  value="1">暂停动画</button>
      </div>

      <div class = 'view'>
        <div class="left-indicator">
            <span class="selected">选中时段流量</span>
            <span class="global">全局时段流量</span>
        </div>

        <svg class = 'view-svg'>
          <g class = "timeline_detail"></g>
          <g class = 'container'></g>
        </svg>
      </div>
  </div>
</template>

<script>
  import AppTitle from './AppTitle.vue'
  import TimeLine from './layout/TimeLine.vue'

  const d3 = require('d3')

  export default {
    data () {
      return {
        icon: '<i class="fa fa-line-chart" aria-hidden="true"></i>',
        msgs: '时间轴',

        items_s: [{text: '最近一天', value: '1'}, {text: '最近一周', value: '7'}, {text: '最近一月', value: '30'}],
        selected_s: '1',

        items_g: [{text: '15分钟', value: '15'}, {text: '30分钟', value: '30'}, {text: '60分钟', value: '60'}, {text: '自定义', value: '自定义'}],
        selected_g: '15'
      }
    },
    components: { AppTitle },
    methods: {
      drawTimeLine () {
        let self = this
        let domItem = d3.select(self.$el)
        let svg = domItem.select('.view-svg')
        let width = parseFloat((svg.attr('width')) === null ? (svg.style('width')) : (svg.attr('width')))
        let height = parseFloat((svg.attr('height')) === null ? (svg.style('height')) : (svg.attr('height')))
        self.TimeLine = new TimeLine({
          view: svg,
          width: width,
          height: height,
          timeChangeHandler: self.timeChangeHandler
        })
      },
      timeChangeHandler (params) {
        let self = this
        console.log('timeChange~~', params)
        self.emitEvent('time_change', params)
      },
      emitEvent (name, params) {
        console.log('hello ~~ emit event ', name)
        this.$emit(name, params)
      }
    },
    mounted () {
      let self = this
      self.drawTimeLine()
    }
  }
</script>
<style lang="less" scoped>
  @import "./AppTimeLine.less";
</style>