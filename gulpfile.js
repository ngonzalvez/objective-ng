var gulp = require('gulp-param')(require('gulp'), process.argv);
var plugins = require('gulp-load-plugins')();

var PATHS = {
  SRC: [
    'src/Injectable.js',
    'src/Controller.js',
    'src/Directive.js',
    'src/Service.js',
    'src/Factory.js',
    'src/Module.js',
    'src/ng.js'
  ],
  DEST: 'dist/'
};


/**
 * Watch the files for changes.
 */
gulp.task('watch', ['js'], function() {
  gulp.watch(PATHS.SRC.JS, ['js']);
});


/**
 * Generate the JS bundle, compress it and mangle it.
 */
gulp.task('js', function() {
  gulp
    .src(PATHS.SRC)
    .pipe(plugins.debug({ title: 'Processing script:' }))
    .pipe(plugins.babel({
      presets: ['es2015-loose'],
      plugins: [
        'syntax-class-properties',
        'transform-class-properties'
      ]
    }))
    .pipe(plugins.concat('bootstrap-ng.min.js'))
    .pipe(gulp.dest(PATHS.DEST));
});


/**
 * Bump version.
 */
gulp.task('bump', function(minor, major, patch, prerelease) {
  var pkg = gulp.src('./package.json');
  var version = {
    type: null,
    preid: null
  };

  if (minor) {
    version.type = 'minor';
  }

  if (major) {
    version.type = 'major';
  }

  if (patch) {
    version.type = 'patch';
  }

  if (prerelease) {
    version.type = 'prerelease';
    version.preid = prerelease;
  }

  pkg
    .pipe(plugins.bump(version))
    .pipe(gulp.dest('./'));
});


