var gulp      = require('gulp');
var sass      = require('gulp-ruby-sass');
var watch     = require('gulp-watch');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var path_bower = 'bower_components';

// A pasta de destino sera a DOCS que é a pasta que o GitHub usa para as pages
var path_dist = "docs"

var libs = {
	fontawesome:{ src:[''], dist:[''] },
	animatecss:{ src:[''], dist:[''] },
	jquery: { src:[''], dist:[''] },
	popperjs:{ src:[''], dist:[''] },
	bootstrap: {
		css: { src:[''], dist:[''] },
		js: { src:[''], dist:[''] }
	},
	pnotify:{ 
		css:{ src:[''], dist:[''] },
		js: { src:[''], dist:[''] }
	},
	angular:{ src:[''], dist:[''] },
	ngStorage:{ src:[''], dist:[''] },
	angularPnotify:{ src:[''], dist:[''] }
};


gulp.task('build', function () {
  return gulp.src("src/index.html").pipe(gulp.dest("./dist"));
   // gulp.src("src/assets/css/style.css").pipe(gulp.dest("./dist"));
});

gulp.task('sass', () =>
    sass('src/assets/sass/**/*.sass').on('error', sass.logError).pipe(gulp.dest('src/assets/css/**/*'))

);



gulp.task('compress', function (cb) {
  pump([
        gulp.src([
        	
        	'bower_components/bootstrap/dist/js/bootstrap.min.js', 
        	'bower_components/pnotify/dist/pnotify.js', 
        	'bower_components/pnotify/dist/pnotify.animate.js'
        	]),
        uglify(),concat('alllibs.min.js'),
        gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('inject', function () {
  var target = gulp.src('./dist/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./dist'));
});



gulp.task('default', function(){
	console.log('teste');
});

gulp.task('watch',['sass'], function() {
    gulp.watch('src/assets/sass/**/*.sass',['sass']);
});

gulp.task('serve', ['watch'], function () {
  return gulp.src('docs')
    .pipe(webserver({
      port: 3000,
      livereload: true,
      open: true
    }));
});