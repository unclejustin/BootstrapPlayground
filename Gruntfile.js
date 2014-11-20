/*jslint node: true */
'use strict';

var pkg = require('./package.json');

//Using exclusion patterns slows down Grunt significantly
//instead of creating a set of patterns like '**/*.js' and '!**/node_modules/**'
//this method is used to create a set of inclusive patterns for all subdirectories
//skipping node_modules, bower_components, dist, and any .dirs
//This enables users to create any directory structure they desire.
var createFolderGlobs = function (fileTypePatterns) {
	fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
	var ignore = ['node_modules', 'bower_components', 'dist', 'temp', 'coverage'];
	var fs = require('fs');
	return fs.readdirSync(process.cwd())
		.map(function (file) {
			     if (ignore.indexOf(file) !== -1 ||
			         file.indexOf('.') === 0 || !fs.lstatSync(file).isDirectory()) {
				     return null;
			     } else {
				     return fileTypePatterns.map(function (pattern) {
					     return file + '/**/' + pattern;
				     });
			     }
		     })
		.filter(function (patterns) {
			        return patterns;
		        })
		.concat(fileTypePatterns);
};

module.exports = function (grunt) {

	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		                 connect:    {
			                 main:{
				                 options:{
					                 port:9001
				                 }
			                 }
		                 },
		                 watch:      {
			                 main:{
				                 options:{
					                 livereload:       true,
					                 livereloadOnError:false,
					                 spawn:            false
				                 },
				                 files:  [
					                 createFolderGlobs(['*.js', '*.scss', '*.html']), '!_SpecRunner.html', '!.grunt'
				                 ],
				                 tasks:  [] //all the tasks are run dynamically during the watch event handler
			                 }
		                 },
		                 jshint:     {
			                 main:{
				                 options:{
					                 jshintrc:'.jshintrc'
				                 },
				                 src:    createFolderGlobs('*.js')
			                 }
		                 },
		                 clean:      {
			                 before:{
				                 src:['dist', 'temp']
			                 },
			                 after: {
				                 src:['temp']
			                 }
		                 },
		                 sass:       {
			                 production:{
				                 options:{},
				                 files:  {
					                 'temp/app.css':'app.scss',
					                 'app.css':'app.scss'
				                 }
			                 }
		                 },
		                 ngtemplates:{
			                 main:{
				                 options:{
					                 module: pkg.name,
					                 htmlmin:'<%= htmlmin.main.options %>'
				                 },
				                 src:    [createFolderGlobs('*.html'), '!index.html', '!_SpecRunner.html'],
				                 dest:   'temp/templates.js'
			                 }
		                 },
		                 copy:       {
			                 main:{
				                 files:[
					                 {src:['img/**'], dest:'dist/'},
					                 {
						                 src:   ['bower_components/font-awesome/fonts/**'],
						                 dest:  'dist/',
						                 filter:'isFile',
						                 expand:true
					                 }
					                 //{src: ['bower_components/angular-ui-utils/ui-utils-ieshiv.min.js'], dest: 'dist/'},
					                 //{src: ['bower_components/select2/*.png','bower_components/select2/*.gif'], dest:'dist/css/',flatten:true,expand:true},
					                 //{src: ['bower_components/angular-mocks/angular-mocks.js'], dest: 'dist/'}
				                 ]
			                 }
		                 },
		                 dom_munger: {
			                 read:  {
				                 options:{
					                 read:[
						                 {selector:'script[data-concat!="false"]', attribute:'src', writeto:'appjs'},
						                 {
							                 selector: 'link[rel="stylesheet"][data-concat!="false"]',
							                 attribute:'href',
							                 writeto:  'appcss'
						                 }
					                 ]
				                 },
				                 src:    'index.html'
			                 },
			                 update:{
				                 options:{
					                 remove:['script[data-remove!="false"]', 'link[data-remove!="false"]'],
					                 append:[
						                 {selector:'body', html:'<script src="app.full.min.js"></script>'},
						                 {selector:'head', html:'<link rel="stylesheet" href="app.full.min.css">'}
					                 ]
				                 },
				                 src:    'index.html',
				                 dest:   'dist/index.html'
			                 }
		                 },
		                 cssmin:     {
			                 main:{
				                 src: ['temp/app.css', '<%= dom_munger.data.appcss %>'],
				                 dest:'dist/app.full.min.css'
			                 }
		                 },
		                 concat:     {
			                 main:{
				                 src: ['<%= dom_munger.data.appjs %>', '<%= ngtemplates.main.dest %>'],
				                 dest:'temp/app.full.js'
			                 }
		                 },
		                 ngAnnotate: {
			                 main:{
				                 src: 'temp/app.full.js',
				                 dest:'temp/app.full.js'
			                 }
		                 },
		                 uglify:     {
			                 main:{
				                 src: 'temp/app.full.js',
				                 dest:'dist/app.full.min.js'
			                 }
		                 },
		                 htmlmin:    {
			                 main:{
				                 options:{
					                 collapseBooleanAttributes:    true,
					                 collapseWhitespace:           true,
					                 removeAttributeQuotes:        true,
					                 removeComments:               true,
					                 removeEmptyAttributes:        true,
					                 removeScriptTypeAttributes:   true,
					                 removeStyleLinkTypeAttributes:true
				                 },
				                 files:  {
					                 'dist/index.html':'dist/index.html'
				                 }
			                 }
		                 },
		                 imagemin:   {
			                 main:{
				                 files:[
					                 {
						                 expand:true, cwd:'dist/',
						                 src:   ['**/{*.png,*.jpg}'],
						                 dest:  'dist/'
					                 }
				                 ]
			                 }
		                 },
		                 karma:      {
			                 options:     {
				                 frameworks:           ['jasmine'],
				                 preprocessors:        {
					                 'directive/**/*.js':  'coverage',
					                 'partial/**/*.js':    'coverage',
					                 'app.js':             'coverage'
				                 },
				                 files:                [  //this files data is also updated in the watch handler, if updated change there too
					                 '<%= dom_munger.data.appjs %>',
					                 '<%= ngtemplates.main.dest %>',
					                 'bower_components/angular-mocks/angulsar-mocks.js',
					                 'directive/**/*.html',
					                 createFolderGlobs(['*-spec.js'])
				                 ],
				                 logLevel:             'ERROR',
				                 reporters:            ['mocha', 'progress', 'html', 'coverage'],
				                 htmlReporter:         {
					                 outputFile:'tests/units.html'
				                 },
				                 coverageReporter:     {
					                 type:'html',
					                 dir: 'coverage/'
				                 },
				                 autoWatch:            false, //watching is handled by grunt-contrib-watch
			                 },
			                 all_tests:   {
				                 browsers: ['Chrome'],
				                 singleRun:false
			                 },
			                 one_test:   {
				                 browsers: ['PhantomJS'],
				                 singleRun:true
			                 },
			                 during_watch:{
				                 browsers: ['PhantomJS'],
				                 singleRun:true
			                 }
		                 }
	                 });

	grunt.registerTask('build', [
		'jshint', 'clean:before', 'sass', 'dom_munger', 'ngtemplates', 'cssmin', 'concat', 'ngAnnotate', 'uglify',
		'copy',
		'htmlmin', 'imagemin', 'clean:after'
	]);
	grunt.registerTask('serve', ['dom_munger:read', 'sass', 'jshint', 'ngtemplates', 'concat', 'connect', 'watch']);
	grunt.registerTask('test', ['dom_munger:read', 'karma:one_test']);
	grunt.registerTask('all_tests', ['dom_munger:read', 'karma:all_tests']);

	grunt.event.on('watch', function (action, filepath) {
		//https://github.com/gruntjs/grunt-contrib-watch/issues/156

		var tasksToRun = [];

		if (filepath.lastIndexOf('.js') !== -1 && filepath.lastIndexOf('.js') === filepath.length - 3) {

			//lint the changed js file
			grunt.config('jshint.main.src', filepath);
			tasksToRun.push('jshint');

			//find the appropriate unit test for the changed file
			var spec = filepath;
			if (filepath.lastIndexOf('-spec.js') === -1 || filepath.lastIndexOf('-spec.js') !== filepath.length - 8) {
				spec = filepath.substring(0, filepath.length - 3) + '-spec.js';
			}

			//if the spec exists then lets run it
			if (grunt.file.exists(spec)) {
				var files = [].concat(grunt.config('dom_munger.data.appjs'), grunt.config('ngtemplates.main.dest'));
				files.push('bower_components/angular-mocks/angular-mocks.js');
				files.push(spec);
				files.push('directive/**/*.html');
				grunt.config('karma.options.files', files);
				tasksToRun.push('karma:during_watch');
			}
		}

		//if index.html changed, we need to reread the <script> tags so our next run of karma
		//will have the correct environment
		if (filepath === 'index.html') {
			tasksToRun.push('dom_munger:read');
		}

		if (filepath.lastIndexOf('.scss') !== -1 && filepath.lastIndexOf('.scss') === filepath.length - 5) {
			tasksToRun.push('sass');
		}

		grunt.config('watch.main.tasks', tasksToRun);

	});
};
