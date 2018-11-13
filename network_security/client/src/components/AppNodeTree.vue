<template>
    <div id = 'nodetree-panel'>
      <app-title v-bind:icon='icon' v-bind:msgs='msgs'></app-title>
      <div id='Panel' class='view'>
      </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    const d3 = require('d3')
    import AppTitle from './AppTitle.vue'
    export default {
      data () {
        return {
          icon: '<i class = "fa fa-usb" aria-hidden = "true"></i>',
          msgs: '节点树',
          currentPage: 1,
          pageMax: 5,
          nodesLength: 33
        }
      },
      components: { AppTitle },
      methods: {
        HistogramInit (divname, options) {
          options.divWidth = options.divWidthh ? options.divWidth : parseInt($('#' + divname).css('width').split('px')[0])
          options.divHeight = options.divHeight ? options.divHeight : parseInt($('#' + divname).css('height').split('px')[0])
          this.margin = {
            top: options.divHeight * 0.03,
            right: options.divWidth * 0.07,
            bottom: options.divHeight * 0.08,
            left: options.divWidth * 0.07
          }

          this.width = options.divWidth - this.margin.left - this.margin.right
          this.height = options.divHeight - this.margin.top - this.margin.bottom
          this.barPadding = 1
          this.xPadding = this.width * 0.05
          this.yPadding = this.height * 0.05
          this.svg = d3.select('#' + divname).append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
          let that = this
          this.xScale = d3.scaleLinear()
            .range([0, this.width / options.dictLength])
            .domain(d3.range(options.dictLength))
          this.yleftDownScale = d3.scaleLinear()
            .range([this.height * 0.1, this.height / 2])
            .domain([d3.max(options.data, function (d) {
              return d[0]
            }), 0])
          this.yleftUpScale = d3.scaleLinear()
            .range([this.height / 2.5, 0])
            .domain([d3.max(options.data, function (d) {
              return d[1]
            }), 0])
          this.yrightScale = d3.scaleLinear()
            .range([that.margin.top, this.height])
            .domain([d3.max(options.data, function (d) {
              return d[0]
            }) * 1.3, 0])

          this.svgaxisLeftDown = this.svg.append('g').attr('class', 'axis')
            .attr('transform', 'translate(' + this.margin.left + ',' + (this.margin.top + this.height / 2) + ')')
            .attr('id', 'svgaxisLeftDown')
            .call(d3.axisLeft(this.yleftDownScale).ticks(3))
            .style('fill', '#95a5a6')

          this.svgaxisLeftUp = this.svg.append('g').attr('class', 'axis')
            .attr('transform', 'translate(' + (this.margin.left) + ',' + (this.margin.top * 2) + ')')
            .attr('id', 'svgaxisRightUp')
            .call(d3.axisLeft(this.yleftUpScale).ticks(3))
            .attr('fill', '#95a5a6')

          this.svgaxisRight = this.svg.append('g').attr('class', 'axis')
            .attr('transform', 'translate(' + (this.margin.left + this.width) + ',' + (this.margin.top) + ')')
            .attr('id', 'svgaxisRightUp')
            .call(d3.axisRight(this.yrightScale).ticks(3))

          this.svg.selectAll('.axis text')
            .attr('fill', '#95a5a6')
            .attr('font-size', 11)
          this.svg.selectAll('.axis line')
            .attr('stroke', '#95a5a6')

          this.svg.append('g')
          let rect = this.svg.append('g')
            .attr('id', 'rect')
            .attr('transform', 'translate(' + 0 + ',' + this.margin.top + ')')
          that = this
          rect.selectAll('Xrect')
            .data(options.data)
            .enter()
            .append('rect')
            .attr('x', function (d, i) {
              return that.margin.left + i * (that.width / options.dictLength)
            })
            .attr('y', function (d, i) {
              return (that.height - (d[0] * that.height / (2.2 * d3.max(options.data, function (d) {
                return d[0]
              }))))
            })
            .attr('width', function (d, i) {
              return that.width / options.dictLength - that.barPadding * 2
            })
            .attr('height', function (d, i) {
              return d[0] * that.height / (2.2 * d3.max(options.data, function (d) {
                return d[0]
              }))
            })
            .attr('opacity', 0.5)
            .style('fill', '#3F5765')

          rect.selectAll('Xrect')
            .data(options.data)
            .enter()
            .append('rect')
            .attr('x', function (d, i) {
              return that.margin.left + i * (that.width / options.dictLength)
            })
            .attr('y', function (d, i) {
              return that.margin.top
            })
            .attr('width', function (d, i) {
              return that.width / options.dictLength - that.barPadding * 2.2
            })
            .attr('height', function (d, i) {
              return d[1] * that.height / (2.2 * d3.max(options.data, function (d) {
                return d[1]
              }))
            })
            .attr('opacity', 0.5)
            .style('fill', '#FF530D')
        },
        Histogram () {
          let that = this
          this.svg.append('g')
            .attr('id', 'firstLine')

          that.svg.selectAll('.domain').remove()
        },
        MainNodeInf () {
          console.log('asd')
          for (let j = 0; j < 1; j++) {
            let Data = []
            for (let i = 0; i < 30; i++) {
              let temp = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)]
              Data.push(temp)
            }
            this.HistogramInit('Panel', {divHeight: 150, dictLength: 30, data: Data})
          }
        },
        HeatLineInit (divname, options) {
          options.divWidth = options.divWidth ? options.divWidth : parseInt($('#' + divname).css('width').split('px')[0])
          options.divHeight = options.divHeight ? options.divHeight : parseInt($('#' + divname).css('height').split('px')[0])

          this.margin = {
            top: options.divHeight * 0.03,
            right: options.divWidth * 0.07,
            bottom: options.divHeight * 0.08,
            left: options.divWidth * 0.07
          }
          this.width = options.divWidth - this.margin.left - this.margin.right
          this.height = options.divHeight - this.margin.top - this.margin.bottom
          this.barPadding = 1
          this.xPadding = this.width * 0.05
          this.yPadding = this.height * 0.05

          this.svg = d3.select('#' + divname).append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height * 2 + this.margin.top + this.margin.bottom)
            .attr('id', options.num)
            .attr('class', 'relatedNodes')

          let that = this

          this.xScale = d3.scaleLinear()
            .range([0, this.width / options.dictLength])
            .domain(d3.range(options.dictLength))

          this.yleftDownScale = d3.scaleLinear()
            .range([this.height * 0.1, this.height / 2])
            .domain([d3.max(options.data, function (d) {
              return d[0]
            }), 0])

          this.yleftUpScale = d3.scaleLinear()
            .range([this.height / 2.5, 0])
            .domain([d3.max(options.data, function (d) {
              return d[1]
            }), 0])

          this.yrightScale = d3.scaleLinear()
            .range([that.margin.top, this.height])
            .domain([d3.max(options.data, function (d) {
              return d[0]
            }) * 1.3, 0])

          this.svgaxisRight = this.svg.append('g').attr('class', 'axis')
            .attr('transform', 'translate(' + (this.margin.left + this.width) + ',' + (this.margin.top) + ')')
            .attr('id', 'svgaxisRightUp')
            .call(d3.axisRight(this.yrightScale).ticks(3))

          d3.selectAll('.axis text')
            .attr('fill', '#95a5a6')
            .attr('font-size', 12)
          d3.selectAll('.axis line')
            .attr('stroke', '#95a5a6')

          let firstvalueLine = d3.area()
            .x(function (d, i) {
              return that.xScale(i)
            })
            .y0(that.yrightScale(0))
            .y1(function (d, i) {
              return that.yrightScale(d[2])
            })

          let secondvalueLine = d3.area()
            .x(function (d, i) {
              return that.xScale(i)
            })
            .y0(that.yrightScale(0))
            .y1(function (d, i) {
              return that.yrightScale(0) - that.yrightScale(d[3]) + that.yrightScale(0)
            })

          let Line = this.svg.append('g')
            .attr('id', 'firstLine')

          Line.selectAll('Xline')
            .data([options.data])
            .enter()
            .append('path')
            .attr('fill', '#45BF55')
            .attr('stroke', 'none')
            .attr('stroke-width', 2)
            .attr('opacity', 0.5)
            .attr('d', firstvalueLine)
            .attr('transform', 'translate(' + (this.margin.left) + ',' + 0 + ')')

          Line.selectAll('Xline')
            .data([options.data])
            .enter()
            .append('path')
            .attr('fill', 'steelblue')
            .attr('stroke', 'none')
            .attr('stroke-width', 3)
            .attr('opacity', 0.5)
            .attr('d', secondvalueLine)
            .attr('transform', 'translate(' + (this.margin.left) + ',' + 0 + ')')

          this.svg.append('circle')
            .attr('cx', that.xScale(0) - 10)
            .attr('cy', that.yrightScale(0))
            .attr('r', 3)
            .attr('fill', 'grey')
            .attr('transform', 'translate(' + (this.margin.left) + ',' + 0 + ')')

          this.svg.append('line')
            .attr('x1', that.xScale(0) - 10)
            .attr('y1', that.yrightScale(0))
            .attr('x2', that.width)
            .attr('y2', that.yrightScale(0))
            .attr('stroke', 'grey')
            .attr('transform', 'translate(' + (this.margin.left) + ',' + 0 + ')')

          this.svg.append('text')
            .attr('x', that.xScale(0) + 10)
            .attr('y', that.height * 2)
            .attr('font-size', 12)
            .attr('fill', '#95a5a6')
            .style('text-anchor', 'start')
            .text(options.id)

          d3.selectAll('.domain').remove()
          // d3.selectAll('.axis text').remove()
        },
        HeatLine () {
          this.addFooter = function (total) {
            this.svg.attr('height', this.height * 2 + 100)
            this.svg.append('text')
              .attr('x', this.width - 70)
              .attr('y', this.height * 2 + 30)
              .attr('font-size', 12)
              .attr('fill', '#95a5a6')
              .style('text-anchor', 'start')
              .text('top 10 of ' + total + ' Nodes')
          }
        },
        HeatLineInf () {
          let Id = ['10.59.212.181', '220.181.157.93', '101.226.161.183', '106.38.199.36', '140.207.197.241', '106.38.199.36', '10.59.212.142', '10.66.120.187', '10.66.204.123', '10.59.212.181', '106.38.199.36', '10.59.212.142', '10.66.120.187', '10.66.204.123', '10.59.212.181']

          for (let j = 0; j < this.nodesLength; j++) {
            let Data = []
            for (let i = 0; i < 100; i++) {
              let temp = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
              Data.push(temp)
            }
            this.HeatLine()
            this.HeatLineInit('Panel', {divHeight: 30, dictLength: 100, data: Data, id: Id[j], num: (j + 1)})
            if (j === 9) {
              // his.addFooter(10)
            }
          }
          this.Paginate(this.nodesLength)
          d3.select('.previous').on('click', this.prev)
          d3.select('.next').on('click', this.next)
        },
        Paginate (length) {
          console.log(length)
          // let c1 = 'pager'
          // let c2 = 'previous disabled'
          let h1 = 'this.prev()'
          // let c3 = 'next'
          let h2 = 'this.next()'

          let str = "<div class = 'pager' align='right' style='margin: 10px 40px'><button class = 'previous' v-on:click = '" + h1 + "' style='margin: 10px;color: whitesmoke;background-color: #9864CC; border-radius:10px; border:0;'>← Prev</button><button class = 'next'  v-on:click = '" + h2 + "'  style='margin: 10px;color: whitesmoke;background-color: #9864CC; border-radius:10px; border:0;'>Next →</button></div>"
          if (length > 10) {
            console.log(length)
            document.getElementById('Panel').innerHTML += str
            for (let i = 7; i <= length; i++) {
              document.getElementById('' + i).style.display = 'none'
            }
          }
        },
        next () {
          this.currentPage++
          if (this.currentPage > this.pageMax) {
            this.currentPage = this.pageMax
            return
          }
          d3.select('.previous').classed('disabled', false)
          for (let i = 1; i <= this.nodesLength; i++) {
            if ((this.currentPage - 1) * 6 < i && i <= this.currentPage * 6) {
              document.getElementById('' + i).style.display = 'block'
            } else {
              document.getElementById('' + i).style.display = 'none'
            }
          }
          if (this.currentPage === this.pageMax) {
            d3.select('.next').classed('disabled', true)
          }
        },

        prev () {
          this.currentPage--
          if (this.currentPage < 1) {
            this.currentPage = 1
            return
          }
          d3.select('.next').classed('disabled', false)
          for (let i = 1; i <= this.nodesLength; i++) {
            if ((this.currentPage - 1) * 6 < i && i <= this.currentPage * 6) {
              document.getElementById('' + i).style.display = 'block'
            } else {
              document.getElementById('' + i).style.display = 'none'
            }
          }
          if (this.currentPage === 1) {
            d3.select('.previous').classed('disabled', true)
          }
        }
      },
      mounted () {
        this.MainNodeInf()
        this.HeatLineInf()
      }
    }
</script>
<style lang='less' scoped>
    @import './AppNodeTree.less';
</style>