/**
 * Created by huangxinxin on 16/9/15.
 */

var gulp = require('gulp')
var babel = require('gulp-babel')
var util = require('gulp-util')
var clean = require('gulp-clean')
var utils = require('./client/build/utils')
var taskDev = require('./client/build/dev')
var taskPro = require('./client/build/pro')
var src = 'src'
var build = 'build'
var base = __dirname
var doBabel = function (src, dest) {
  util.log('[babel] ' + src + ' => ' + dest)
  return gulp.src(src)
    .pipe(babel({
      presets: [ 'es2015', 'stage-0', 'stage-1', 'stage-2', 'stage-3' ]
    }))
    .pipe(gulp.dest(dest))
}

utils.startBanner()

// client
gulp.task('clientDev', taskDev)
gulp.task('clientPro', taskPro)

// server
gulp.task('clean', function () {
  return gulp.src(build + '/*')
    .pipe(clean({ force: true }))
})

gulp.task('serverPro', [ 'clean' ], function () {
  return doBabel(src + '/**/*.js', build)
})

gulp.task('serverDev', [ 'serverPro' ], function () {
  gulp.watch(src + '/**/*.js', function (event) {
    var file = event.path.replace(base + '/', '')
    var pathArr = file.replace(src + '/', '').split('/')
    pathArr.pop()
    util.log('[watch] ' + file + ' was ' + event.type)
    doBabel(file, build + '/' + pathArr.join('/'))
  })
})

// build all
gulp.task('build', [ 'clientPro', 'serverPro' ])
