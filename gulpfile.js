const del = require('del');
const browserSync = require('browser-sync').create();

const gulp = require('gulp');

const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
//const rollupUglify = require('rollup-plugin-uglify');



gulp.task('script', async () => {
  // TODO:关于rollup需要再认真学习一下

  const bundle = await rollup({
    input:`src/main.js`,
    plugins:[
      babel({//这里需要配置文件.babelrc
        exclude:'node_modules/**'
      }),
      nodeResolve({
        jsnext:true,
      })
    // rollupUglify({}, minifyEs6)//压缩es6代码
    ]
  });

  await bundle.write({//返回promise，以便下一步then()
      file: `.tmp/scripts/main.js`,
      format: 'iife',
      sourcemap: true
  });
  
  browserSync.reload();
});


gulp.task('html',() => {
  return gulp.src('demo/index.html')
    .pipe(gulp.dest('.tmp'));
})
gulp.task('clean', function() {
  return del(['.tmp/**']);
});

gulp.task('serve', gulp.series('clean','html','script', () => {
  browserSync.init({
    server: {
      baseDir: ['.tmp'],
      index: 'index.html',
      directory: false,
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    port:9000

  });

  gulp.watch(['src/**/*.js'], gulp.parallel('script'));
}));

