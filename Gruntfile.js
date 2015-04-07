module.exports = function (grunt) {
	"use strict";
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('./package.json'),
		tasks: grunt.file.readJSON('./tasks.json'),
		
		dir: {
			css: './source/styles/css/',
			styl: './source/styles/styl/',
			temp: './temp/'
		},
		
		stylus: {},
		
		csslint: {},
		
		concat: {},
		
		cssmin: {}
	});

	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', 'Run compilation', function () {
		
		grunt.config('stylus.compile', {
			options: {
				compress: false,
				linenos: false,
				paths: ['./source/styles/styl/helpers'],
				import: ['_mixins']
			},
			files: [
				{
					expand: true,
					cwd: '<%= dir.styl %>',
					src: ['*.styl'],
					dest: '<%= dir.css %>',
					ext: '.css'
				}
			]
		});
		
		grunt.config('csslint.superficial', {
			options: {
				"box-sizing": false,
				"universal-selector": false,
				"unqualified-attributes": false,
				"outline-none": false,
				"compatible-vendor-prefixes": false
			},
			src: [
				'<%= dir.css %>reset.css',
				'<%= dir.css %>reset-additional.css'
			]
		});
		
		grunt.config('concat.common', {

			src: [
				'<%= dir.css %>reset.css',
				'<%= dir.css %>reset-additional.css'
			],
			dest: '<%= dir.temp %>temp.css'

		});
		
		grunt.registerTask('compilation', ['stylus', 'csslint', 'concat']);
		grunt.task.run('compilation');
		
	});

};