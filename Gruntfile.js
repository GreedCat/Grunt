module.exports =  function(grunt){
	//复制文件 grunt-contrib-copy
	grunt.loadNpmTasks('grunt-contrib-copy');
	//监视文件变化 grunt-contrib-watch
	grunt.loadNpmTasks('grunt-contrib-watch');
	// 配置服务器 grunt-contrib-contact
	grunt.loadNpmTasks('grunt-contrib-connect');
	// 编译sass文件
	grunt.loadNpmTasks('grunt-contrib-sass');
	// 编译less文件
	grunt.loadNpmTasks('grunt-contrib-less');
	// 合并文件
	grunt.loadNpmTasks('grunt-contrib-concat');
	// 压缩js文件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// 压缩css
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// 压缩图像
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	//任务配置
	grunt.initConfig({
		//copy任务 task配置
		copy:{
			//目标 target配置

			// 复制html
			html:{
				src	: 'index.html',
				dest: 'dist/'
			},
			// 复制css
			style:{
				src	: 'css/*.css', 
				dest: 'dist/'
			},

			// 复制js
			js:{
				src	: 'js/**/*.js',
				dest: 'dist/'
			}
		},
		// 监视文件变化
		watch:{
			// 监视html文件变化
			html:{
				options:{
					livereload:true //实时刷新
				},
				// 监视某文件
				files:['index.html'],
				// 发生变化执行任务下或任务下的目标
				tasks:['copy:html']
			}
		},
		// 服务器配置 ，每个目标都可以配置一台服务器
		connect:{
			server:{
				options:{
					// 服务器端口号可随意改
					port:8000,
					// 服务需要访问的根目录
					base:'dist',

					// 服务器只有在 grunt 运行的时候才会运行,也就是 grunt 结束了任务，这个服务器也就会关掉了
					// ,想让它一直运行下去，可以加上一个 keepalive  如：grunt:connect:server:keepalive ，在访问localhost:端口号

					livereload:true  //表示是否需要实时刷新功能,当为true时也需要为需要实时刷新的目标配置options:{livereload:true}
				}
			}
		},

		// 编译sass文件
		sass:{
			// 目标
			dist:{
				options:{
					style:'expanded'
				},
				files:{
					// 第一个值为编译后目标文件 ，第二个值为编译前目标文件
					'css/module.css':'css/module.scss'
				}
			}
		},
		// 编译less文件
		less:{
			// 目标
			dist:{
				files:{
					// 第一个值为编译后目标文件 ，第二个值为编译前目标文件
					'css/style.css':'css/style.less'
				}
			}
		},
		// 合并文件
		concat:{
			js:{
				options:{
					banner:'/* Grunt course by Grace */\n',
					footer:'/* the end */\n'
				},
				src:['js/module/module.js','js/index.js'],
				dest:'dist/js/app.js'
			}
		},
		// 压缩js文件
		uglify:{
			dist:{
				// 这里是concat任务下js目标的dest目录下的文件
				src:'<%= concat.js.dest %>',
				dest:'dist/js/app.min.js'
			}
		},
		// 压缩css文件
		cssmin:{
			dist:{
				// 这里是concat任务下js目标的dest目录下的文件
				src:'dist/css/module.css',
				dest:'dist/css/module.min.css'
			}
		},

		// 压缩图像
		imagemin:{
			dist:{
				expanded:true,
				// 这里是concat任务下js目标的dest目录下的文件
				src:'images/**/*.{jpg,png,jpeg}',
				dest:'dist/images'
			}
		},		
	});

	// 实时刷新多任务共同执行
	grunt.registerTask('serve',['connect','watch']);
	// 合并后压缩文件
	grunt.registerTask('build',['concat','uglify']);

};

