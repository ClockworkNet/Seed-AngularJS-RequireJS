module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		watch: {
			server: {
				files: [
					'server.js',
					'Gruntfile.js'
				]
			}
		},

		concurrent: {
			server: {
				tasks: ['nodemon:server', 'watch:server'],
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


	grunt.registerTask('serve', [
		'concurrent:server'
	]);

};
