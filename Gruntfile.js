module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		dist: 'dist',
		tmp : 'tmp',
		src : 'src',

		clean: {
			tmp: ['<%= tmp %>'],
			dist: ['<%= dist %>']
		},

		copy: {
			src: {
				files: [{
					cwd: '<%= src %>',
					expand:true,
					src: [
						'**/*',
						'!bower_components/**/*'
					],
					dest: '<%= tmp %>'
				}]
			},
			dist: {
				files: [{
					cwd: '<%= tmp %>',
					expand:true,
					src: [
						'**/*'
					],
					dest: '<%= dist %>'
				}]
			},
			bower: {
				files: [{
					cwd: '<%= src %>',
					expand:true,
					src: [
						'bower_components/**/*'
					],
					dest: '<%= dist %>'
				}]
			}
		},

		ngAnnotate: {
			options: {},
			src    : {
				files: [{
					cwd   : '<%= tmp %>',
					expand: true,
					src   : ['**/*.js'],
					dest  : '<%= tmp %>'
				}]
			}
		},

		ngtemplates: {
			myApp: {
				cwd: '<%= src %>/myApp',
				src: '**/*.html',
				dest: '<%= dist %>/myApp/templates.js',
				options: {
					module: 'myApp',
					prefix: './myApp/',
					htmlmin: {
						collapseBooleanAttributes:      false,
						collapseWhitespace:             true,
						removeAttributeQuotes:          false,
						removeComments:                 true, // Only if you don't use comment directives!
						removeEmptyAttributes:          false,
						removeRedundantAttributes:      true,
						removeScriptTypeAttributes:     true,
						removeStyleLinkTypeAttributes:  true
					},
					bootstrap:  function(module, script) {
						return 'define([\'angular\', \'myApp/app/app-module\'], function(angular, app) { '
								+ 'app.run([\'$templateCache\', function($templateCache) {'
									+ script
								+ '}]);'
							+ ' });';
					}
				}
			}
		},

		requirejs: {
			myApp: {
				options: {
					baseUrl: '<%= tmp %>',
					mainConfigFile: [],
					dir: '<%= dist %>',
					wrap: false,
					paths: {
						bower_components: 'empty:',
						angular: 'empty:',
						"angular-ui-router": 'empty:'
					},
					//optimize: 'none',
					optimizeCss: 'none',
					modules: [
						{
							name: 'myApp/app/app'
						}
					]
				}
			}
		},

		watch: {
			src: {
				files: [
					'<%= src %>/**/*',
					'Gruntfile.js'
				],
				tasks: ['build']
			}
		},

		concurrent: {
			server: {
				tasks: ['nodemon:server', 'watch:src'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		nodemon: {
			server: {
				script : 'server.js',
				options: {
					env: {
						ignore  : [
							'node_modules',
							'src',
							'demo'
						],
						NODE_ENV: 'dev'
					}
				}
			}
		}
	});


	grunt.registerTask('build', [
		'clean:tmp',
		'clean:dist',
		'copy:src',
		'ngAnnotate:src',
		'copy:dist',
		'requirejs:myApp',
		'ngtemplates:myApp',
		'clean:tmp',
		'copy:bower'
	]);

	grunt.registerTask('serve', [
		'build',
		'concurrent:server'
	]);

};
