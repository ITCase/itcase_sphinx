'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*'] });

var browserify = require('browserify'),
    browserSync = require('browser-sync'),
    del = require('del'),
    fs = require('fs'),
    mainBowerFiles = require('main-bower-files'),
    minimist = require('minimist'),
    runSequence = require('run-sequence');

var map = require('vinyl-map'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream');

var TARGET_CSS_FILE = '__theme.css',
    TARGET_JS_FILE = '__theme.js',
    BROWSERIFY_FILE = 'main.js';

var CSS_PATH = './itcase_sphinx_theme/itcase/static/css/',
    JS_PATH = './itcase_sphinx_theme/itcase/static/js/',
    IMG_PATH = './itcase_sphinx_theme/itcase/static/img/',
    FONT_PATH = './itcase_sphinx_theme/itcase/static/fonts/';

var TARGET_CSS_PATH = CSS_PATH + TARGET_CSS_FILE,
    TARGET_JS_PATH = JS_PATH + TARGET_JS_FILE;

var CSS_FILES = [
  './itcase_sphinx_theme/itcase/static/css/*.css',
  './itcase_sphinx_theme/itcase/static/css/**/*.css',
  '!itcase_sphinx_theme/itcase/static/css/badge_only.css',
  '!itcase_sphinx_theme/itcase/static/css/' + TARGET_CSS_FILE
];

var JS_FILES = [
  './itcase_sphinx_theme/itcase/static/js/*.js',
  './itcase_sphinx_theme/itcase/static/js/**/*.js',
  '!itcase_sphinx_theme/itcase/static/js/' + TARGET_JS_FILE
];

var TEMPLATES_FILES = [
  './itcase_sphinx_theme/itcase/*.html',
  './itcase_sphinx_theme/itcase/**/*.html'
];

var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('browser-sync', function() {
  browserSync({
    proxy: '127.0.0.1:8000',
    reloadDelay: 3000,
    logLevel: 'info',
    open: false
  });
});

gulp.task('bower-js', function() {

  return gulp.src(mainBowerFiles(
      { filter: (/.*\.(js|map)$/i) }),
      { base: 'bower_components' })
    .pipe(plugins.rename(function(path) {
      path.dirname = path.dirname.slice(0, path.dirname.indexOf('/') + 1);
    }))
    .pipe(gulp.dest(JS_PATH + 'vendor/'))
    .pipe(map(function(code, filename) {
      plugins.util.log('Bower JS ' +
      plugins.util.colors.green(filename));
    }));
});


gulp.task('bower-css', function() {
  return gulp.src(mainBowerFiles(
      { filter: (/.*\.css$/i) }),
      { base: 'bower_components' })
    .pipe(plugins.rename(function(path) {
      path.dirname = path.dirname.slice(0, path.dirname.indexOf('/') + 1);
    }))
    .pipe(gulp.dest(CSS_PATH + 'vendor/'))
    .pipe(map(function(code, filename) {
      plugins.util.log('Bower CSS ' +
      plugins.util.colors.green(filename));
    }));
});


gulp.task('bower-img', function() {
  return gulp.src(mainBowerFiles(
      { filter: (/.*\.(png|jpg|gif)$/i) }),
      { base: 'bower_components' })
    .pipe(plugins.rename(function(path) {
      path.dirname = path.dirname.slice(0, path.dirname.indexOf('/') + 1);
    }))
    .pipe(gulp.dest(IMG_PATH + 'vendor/'))
    .pipe(map(function(code, filename) {
      plugins.util.log('Bower Images ' +
      plugins.util.colors.green(filename));
    }));
});


gulp.task('bower-font', function() {
  return gulp.src(mainBowerFiles(
      { filter: (/.*\.(eot|otf|svg|ttf|woff|woff2)$/i) }),
      { base: 'bower_components' })
    .pipe(plugins.rename(function (path) {
      path.dirname = path.dirname.slice(0, path.dirname.indexOf('/') + 1);
    }))
    .pipe(gulp.dest(FONT_PATH))
    .pipe(map(function(code, filename) {
      plugins.util.log('Bower Fonts ' +
      plugins.util.colors.green(filename));
    }));
});


gulp.task('browserify', function() {
  function bundle(b, sourceName) {
    return b.bundle()
      .pipe(source(sourceName))
      .pipe(buffer())
      .pipe(plugins.sourcemaps.init({loadMaps: true}))
      .pipe(plugins.if(options.env === 'production',
        plugins.uglify()))
      .pipe(plugins.if(options.env === 'development',
        plugins.sourcemaps.write('./')))
      .pipe(gulp.dest(JS_PATH))
      .pipe(map(function(code, filename) {
        plugins.util.log('Browserify ' +
        plugins.util.colors.green(filename));
      }))
      .pipe(plugins.shell([
        'touch ./example/index.rst'
      ]))
      .pipe(browserSync.reload({ stream:true }));
  }
  bundle(browserify(
    { entries: JS_PATH + BROWSERIFY_FILE }), TARGET_JS_FILE);
});


gulp.task('clean', function() {
  del([JS_PATH + 'vendor/', CSS_PATH + 'vendor/', IMG_PATH + 'vendor/',
       TARGET_CSS_PATH, TARGET_JS_PATH], function (err, paths) {
    plugins.util.log('Deleted files/folders: ' +
    plugins.util.colors.red(paths.join('\n')));
  });
});


gulp.task('css', function() {
  var processors = [
      require('postcss-nested'),
      require('autoprefixer-core')({
        browsers: [
          'Firefox >= 3',
          'Explorer >= 6',
          'Opera >= 9',
          'Chrome >= 15',
          'Safari >= 4',
          '> 1%'
        ],
        cascade: false
      }),
      require('postcss-css-variables'),
      require('postcss-opacity')
    ];
  return gulp.src(CSS_FILES)
    .pipe(plugins.newer(TARGET_CSS_PATH))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.postcss(processors))
    .on('error', function(err) {
      plugins.util.log(plugins.util.colors.red('PostCSS Error'),
      plugins.util.colors.yellow(err.message));
    })
    .pipe(plugins.cssBase64({
      extensions: ['png', 'jpg', 'gif'],
      maxWeightResource: 100,
    }))
    .on('error', function(err) {
      plugins.util.log(plugins.util.colors.red('Base64 Error'),
      plugins.util.colors.yellow(err.message));
    })
    .pipe(plugins.modifyCssUrls({
      modify: function (url, filePath) {
        if(filePath.indexOf('vendor') > -1) {
          if(url.indexOf('./font') > -1) {
            url = './../' + url.substring(url.indexOf('font'));
          } else if(url.indexOf('./img') > -1) {
            url = './../img/vendor/' + url.substring(url.indexOf('img'));
          }
          if(url.match(/.*\.(png|jpg|gif)$/i)) {
            url = './../img/vendor/' + url.substring(url.indexOf('/'));
          }
          return url;
        } else {
          return url;
        }
      }
    }))
    .pipe(plugins.concat(TARGET_CSS_FILE))
    .pipe(plugins.if(options.env === 'development',
      plugins.sourcemaps.write('.')))
    .pipe(plugins.if(options.env === 'production',
      plugins.minifyCss({ keepSpecialComments: 0 })))
    .pipe(gulp.dest(CSS_PATH))
    .on('error', plugins.util.log)
    .pipe(plugins.filter('*.css'))
    .pipe(map(function(code, filename) {
      plugins.util.log('CSS ' +
      plugins.util.colors.green(filename));
    }))
    .pipe(plugins.shell([
      'touch ./example/index.rst'
    ]))
    .pipe(browserSync.reload({ stream:true }));
});


gulp.task('html', function() {
  return gulp.src(TEMPLATES_FILES)
    .pipe(plugins.shell([
      'touch ./example/index.rst'
    ]))
    .pipe(browserSync.reload({ stream:true }));
});


gulp.task('watch', function() {

  plugins.watch(JS_FILES,{ verbose: true },
    plugins.batch(function(cb) {
      gulp.start('browserify');
      cb();
    }));

  plugins.watch(CSS_FILES,{ verbose: true },
    plugins.batch(function(cb) {
      gulp.start('css');
      cb();
    }));

  plugins.watch(TEMPLATES_FILES, { verbose: true },
    plugins.batch(function(cb) {
      gulp.start('html');
      cb();
    }));

});

gulp.task('bump', function(){
  return gulp.src(['./bower.json', './package.json'])
    .pipe(plugins.bump())
    .pipe(gulp.dest('./'));
});


gulp.task('commit-changes', function() {
  return gulp.src('.')
    .pipe(plugins.git.commit('Bumped version', { args: '-a -m' }));
});

gulp.task('push-changes', function(cb) {
  plugins.git.push('origin', 'master', cb);
});

gulp.task('create-new-tag', function(cb) {
  var version = getPackageJsonVersion();
  plugins.git.tag(version, 'Created Tag for version:' + version, function(error) {
    if(error) {
      return cb(error);
    }
    plugins.git.push('origin', 'master', { args: '--tags' }, cb);
  });

  function getPackageJsonVersion() {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  }
});

gulp.task('pypi', plugins.shell.task([
  'python setup.py sdist upload'
]));

gulp.task('release', function (callback) {
  options.env = 'production';
  runSequence(
    'bower',
    'build',
    'bump',
    'commit-changes',
    //'push-changes',
    'create-new-tag',
    //'pypi',
    function (error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('RELEASE FINISHED SUCCESSFULLY');
      }
      callback(error);
    });
});


gulp.task('default', ['browser-sync', 'watch']);
gulp.task('bower', ['bower-js', 'bower-css', 'bower-img', 'bower-font']);
gulp.task('build', ['bower', 'css', 'browserify']);
gulp.task('release', ['bower', 'build', 'bump']);