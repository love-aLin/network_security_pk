<!-- 入口文件 -->
<!--*author:Ye Zhang *day:2018-1-06  -->
<template>
</template>
<script>//  eslint-disable-next-line linebreak-style

/* eslint-disable linebreak-style,no-multiple-empty-lines,linebreak-style,linebreak-style,padded-blocks,no-undef */

const d3 = require('d3')
//  const _ = require('lodash')
export default class TimeLine {
  constructor (layoutPara) {
    let self = this
    self.view = layoutPara.view
    self.viewWidth = layoutPara.width
    self.viewHeight = layoutPara.height
    self.timeChangeHandler = layoutPara.timeChangeHandler
    self.drawView(self.view)
  }
  drawView (view) {

    let self = this
    let timeChangeHandler = self.timeChangeHandler
    let margin = {left: 65, right: 30, top: self.viewHeight * 0.60, bottom: 20}
    let width = self.viewWidth - margin.left - margin.right
    let height = self.viewHeight * 0.4 - margin.bottom
    let xScale = d3.scaleTime().domain([new Date(2016, 7, 15), new Date(2016, 7, 17)]).rangeRound([0, width])
    let xScale2 = d3.scaleTime().rangeRound([0, width])
    let yScale = d3.scaleLinear().range([height, 0]).domain([0, 100])
    let yScale2 = d3.scaleLinear().range([height, 0])
    let array = []
    let yAxis = d3.axisLeft().scale(yScale).ticks(3)
    //  主时间轴
    let container = view.select('.container').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
    //  细节时间轴
    let containerDetail = view.select('.timeline_detail').attr('transform', 'translate(' + margin.left + ', ' + self.viewHeight * 0.18 + ')')
    let timeStart = new Date(2016, 7, 15).valueOf() //  获取毫秒数
    let timeEnd = new Date(2016, 7, 17).valueOf()
    let average = Math.floor((timeEnd - timeStart) / 100)
    //  模拟数据
    for (let i = 0; i <= 100; i++) {
      let timeCurrent = new Date(timeStart + average * i)
      array.push({'time': timeCurrent, 'flow': Math.floor(Math.random() * 100)})
    }

    initMainTimeline()

    //  选择时间跨度后重新初始化主时间轴
    $('#timeSpan').change(function () {
      initMainTimeline()
    })

    //  1为暂停，0为重启
    $('#pause').click(function () {
      let count = parseInt(document.getElementById('pause').value)
      if (count === 1) {
        pause()
      } else {
        restart()
      }
    })
    /* *******************************主时间轴******************************* */
    function initMainTimeline () {

      container.selectAll('g').remove()
      view.selectAll('defs').remove()
      let timeSpan = document.getElementById('timeSpan').value

      let dataArray = []
      let itemBefore
      let data = array
      //  获取在timeSpan时间段的数据
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          itemBefore = data[i].time.valueOf()
        }
        let timeInterval = timeSpan * 24 * 60 * 60 * 1000//  转换为毫秒数
        let itemCurrent = data[i].time.valueOf()
        let interVal = Math.abs(itemCurrent - itemBefore)
        if (interVal <= timeInterval) {
          dataArray.push(data[i])
        } else {
          break
        }
      }
      //  重新设置范围
      xScale.domain([dataArray[0].time, dataArray[dataArray.length - 1].time])

      // console.log(dataArray)

      // let timeInterval = timeSpan
      view.append('defs').append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height)

      let area = d3.area()
      .curve(d3.curveBasis)
      .x(function (d) {
        return xScale(d.time)
      })
      .y0(height)
      .y1(function (d) {
        return yScale(d.flow)
      })

      container.append('g')
      .attr('class', 'area')
      .append('path')
      .datum(dataArray)
      .attr('d', area)
      .attr('fill', '#2B516C')

      container.append('g')
      .attr('class', 'axis axis--grid')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale)
          .ticks(d3.timeHour, 1)
          .tickSize(-height)
          .tickFormat(function () { return null }))
      .selectAll('.tick')
      .classed('tick--minor', function (d) { return d.getHours() })


      container.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale)
          .ticks(d3.timeHour.every(3))
          .tickPadding(0))
      .attr('text-anchor', null)
      .selectAll('text')
      .attr('x', -20)
      .attr('y', 10)



      container.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(0,0)')
      .attr('stroke', 'grey')
      .call(d3.axisLeft().scale(yScale).ticks(3))
      .selectAll('path')
      .attr('stroke', 'grey')
      .attr('stroke-opacity', 0.1)

      container.append('g')
      .attr('class', 'brush')
      .call(d3.brushX()
          .extent([[0, 0], [width, height]])
          .on('end', brushended))
    }



    /* *******************************细节时间轴******************************* */

    let area2 = d3.area()
      .curve(d3.curveBasis)
      .x(function (d) {
      // alert(parseTime(d3.keys(d)[0]))
        return xScale2(d.time)
      })
      .y0(height)
      .y1(function (d) {
        return yScale2(d.flow)
      })

    xScale2.domain(xScale.domain())
    yScale2.domain(yScale.domain())
    containerDetail.append('g')
      .attr('class', 'area-detail')
      .append('path')
      .datum(array)
      .attr('clip-path', 'url(#clip)')
      .attr('d', area2)
      .attr('fill', '#2B516C')


    containerDetail.append('g')
      .attr('class', 'axis axis--grid')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale2)
      .ticks(d3.timeHour, 1)
      .tickSize(-height)
      .tickFormat(function () { return null }))
      .selectAll('.tick')
      .classed('tick--minor', function (d) { return d.getHours() })


    containerDetail.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale2)
      .ticks(d3.timeHour.every(3))
      .tickPadding(0))
      .attr('text-anchor', null)
      .selectAll('text')
      .attr('x', -20)
      .attr('y', 10)



    containerDetail.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(0,0)')
      .attr('stroke', 'grey')
      .call(yAxis)
      .selectAll('path')
      .attr('stroke', 'grey')
      .attr('stroke-opacity', 0.1)

    let brushDetailX = d3.brushX()
    let timeGranularity = document.getElementById('timeGranularity').value
    let spacing = calculateSpacing(timeGranularity)
    containerDetail.append('g')
      .attr('class', 'brush-detail')
      .call(brushDetailX.extent([[0, 0], [width, height]])
      .on('end.det', brushDetail))
      .call(brushDetailX.move, [0, spacing])




    // 选择时间粒度后，改变brush框的大小
    $('#timeGranularity').change(function () {
      changeBrushRect()
    })
    function changeBrushRect () {
      timeGranularity = document.getElementById('timeGranularity').value
      if (timeGranularity === '自定义') {
        return false
      }

      spacing = calculateSpacing(timeGranularity)

      let brushRectX1 = parseInt(d3.select('.brush-detail').select('.selection').attr('x'))
      let brushRectX2 = 0
      if (!isNaN(brushRectX1)) {
        brushRectX2 = brushRectX1 + spacing
      } else {
        brushRectX1 = 0
        brushRectX2 = brushRectX1 + spacing
      }
      console.log(brushRectX1, brushRectX2)
      d3.select('.brush-detail').call(brushDetailX.move, [brushRectX1, brushRectX2])
    }

    // 根据时间粒度设置动画
    let rectWidth = 0
    let timer = setInterval(brushMove, 1500, d3.now())
    pause()// 初始时不播放动画

    function brushMove () {
      let brushRectX1 = parseInt(d3.select('.brush-detail').select('.selection').attr('x'))
      let brushRectX2 = 0
      if (timeGranularity === '自定义') {
        rectWidth = parseInt(d3.select('.brush-detail').select('.selection').attr('width'))
        spacing = rectWidth
      }
      if (!isNaN(brushRectX1)) {
        brushRectX2 = brushRectX1 + spacing
      } else {
        brushRectX1 = 0
        brushRectX2 = 0
        spacing = 0
      }
      d3.select('.brush-detail').call(brushDetailX.move, [brushRectX1 + spacing, brushRectX2 + spacing])
      if (brushRectX2 + spacing >= width) {
        d3.select('.brush-detail').call(brushDetailX.move, [width - spacing, width])
        pause()// 暂停
      }
    }

    // 计算时间粒度对应的间距
    function calculateSpacing (timeGranularity) {
      let startTime = xScale2.invert(0)// 坐标轴最开始的时间
      let endTime = startTime.valueOf() + timeGranularity * 60 * 1000   // 转换为毫秒
      let spacing = xScale2(new Date(endTime)) - 0
      return spacing
    }

    function pause () {
      clearInterval(timer)
      $('#pause').val(0)// 改变状态，下一次为重启
      $('#pause').text('播放动画')
    }

    function restart () {

      let brushRectX1 = parseInt(d3.select('.brush-detail').select('.selection').attr('x'))
      let brushRectX2 = brushRectX1 + spacing
      if (brushRectX2 + spacing >= width) {
        d3.select('.brush-detail').call(brushDetailX.move, [0, spacing])
      }
      timer = setInterval(brushMove, 5000, d3.now())// 设置动画刷新频率
      $('#pause').val(1)// 改变状态，下一次为暂停
      $('#pause').text('暂停动画')
    }
    /* *******************************主时间轴刷新函数******************************* */

    function brushended () {
      if (!d3.event.sourceEvent) return //  Only transition after input.
      if (!d3.event.selection) {
      // 与主时间轴相同
        xScale2.domain(xScale.domain())
        containerDetail.select('path').attr('d', area2)
        containerDetail.select('.axis--x')
          .call(d3.axisBottom(xScale2)
          .ticks(d3.timeHour.every(3))
          .tickPadding(0))

        containerDetail.select('.axis--grid')
          .call(d3.axisBottom(xScale2)
          .ticks(d3.timeHour, 1)
          .tickSize(-height)
          .tickFormat(function () { return null }))
        return //  Ignore empty selections.
      }
      let d0 = d3.event.selection.map(xScale.invert)
      let d1 = d0.map(d3.timeHour.round)
      // 在细节时间轴中重装数据，重装比例尺

      xScale2.domain([d1[0], d1[1]])
      containerDetail.select('path').attr('d', area2)
      containerDetail.select('.axis--x')
      .call(d3.axisBottom(xScale2)
          .ticks(d3.timeHour.every(1))
          .tickPadding(0))

      containerDetail.select('.axis--grid')
      .call(d3.axisBottom(xScale2)
          .ticks(d3.timeHour, 1)
          .tickSize(-height)
          .tickFormat(function () { return null }))

      changeBrushRect()// 比例变化重新绘制rect大小

      //  If empty when rounded, use floor & ceil instead.
      if (d1[0] >= d1[1]) {
        d1[0] = d3.timeHour.floor(d0[0])
        d1[1] = d3.timeHour.floor(d1[0])
      }

      d3.select(this).transition().call(d3.event.target.move, d1.map(xScale))

      /*
       let res = []
       res[0] = convertTimeFormat(d1[0])
       res[1] = convertTimeFormat(d1[1])
       window.testTime = res
       timeChangeHandler(res)
       */

    }
    /* *******************************详细时间轴刷新函数******************************* */
    function brushDetail () {

      if (!d3.event.sourceEvent) return //  Only transition after input.
      if (!d3.event.selection) return
      let d = d3.event.selection
      let time = xScale2.invert(d[0])
      $('#currentTime').html(formatDate(time))

      let interval = xScale2.invert(d[1]) - time
      let intervalMinute = Math.round(interval / 1000 / 60)

      // 把自定义设置为选中
      if ((intervalMinute !== 15) && (intervalMinute !== 30) && (intervalMinute !== 60)) {

        let kk = document.getElementById('timeGranularity').getElementsByTagName('option')
        for (let i = 0; i < kk.length; i++) {
          if (kk[i].value === '自定义') {
            kk[i].selected = true
            timeGranularity = '自定义'
            break
          }
        }
      }
      // 获得数据，更新视图
      let d0 = d3.event.selection.map(xScale.invert)
      let res = []
      res[0] = convertTimeFormat(d0[0])
      res[1] = convertTimeFormat(d0[1])
      window.testTime = res
      timeChangeHandler(res)

    }
    function formatTen (num) {
      return num > 9 ? (num + '') : ('0' + num)
    }

    function formatDate (date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      var str = year + '/' + month + '/' + day + ' ' + formatTen(hour) + ':' + formatTen(minute) + ':' + formatTen(second)
      // alert(str)
      return str

    }
    function convertTimeFormat (timeInDate) {
      let year = timeInDate.getFullYear()
      let month = timeInDate.getMonth()
      let day = timeInDate.getDate() + 1
      let hour = timeInDate.getHours()
      let minute = timeInDate.getMinutes()
      let second = timeInDate.getSeconds()
      let res = ''
      res = res + year + (month >= 10 ? month : '0' + month) + (day >= 10 ? day : '0' + day)
      res = res + (hour >= 10 ? hour : '0' + hour) + (minute >= 10 ? minute : '0' + minute)
      res = res + (second >= 10 ? second : '0' + second) + '000000'
      return res
    }
  }
}
</script>

<style lang='less'>
    @import './TimeLine.less';
</style>