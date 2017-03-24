const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sequence = require('run-sequence');
const del = require('del');
const plumber = require('gulp-plumber');
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');
const fs = require('fs');
const path = require('path');
const merge = require('merge-stream');

const JS = ['samples/**/*.js'];

let scriptsPath = './samples/';

function getFolders(dir) {
	return fs.readdirSync(dir)
	  .filter((file) => {
		return fs.statSync(path.join(dir, file)).isDirectory();
	  });
}

gulp.task('js', () => {
	let folders = getFolders(scriptsPath);

	let tasks = folders.map((folder) => {
		return gulp.src([`!samples/${folder}/build/*` ,`samples/${folder}/**/*.js`])
			.pipe(plumber())
			.pipe(sourcemaps.init())
			.pipe(babel())
			.pipe(plumber.stop())
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(`./samples/${folder}/build`));
   });

   return merge(tasks);
});

gulp.task('list', () => {
	const folders_list = getFolders(scriptsPath);
	let uri_list = {};
	for (var i = 0; i < folders_list.length; i++) {
		uri_list[folders_list[i]] = { 
			url: `http://examples.rodin.io/samples/${folders_list[i]}/`,
			git: `https://github.com/RodinJS/Rodin-Samples/tree/master/samples/${folders_list[i]}/`
		};
	}
	fs.writeFile('./list.json', JSON.stringify(uri_list, null, 2) , 'utf-8');
});

gulp.task('watch', () => {
	gulp.watch(JS, ['js']);
});

gulp.task('connect', () => {
	connect.server({
		root: './',
		port: 9090,
		livereload: true
	});
});

gulp.task('default', (done) => {
	sequence(['js', 'list'], done);
});

gulp.task('dev', (done) => {
	sequence(['js', 'connect', 'watch'], done);
});
