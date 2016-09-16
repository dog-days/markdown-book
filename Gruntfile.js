var webpack = require('webpack')
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack_config = require('./webpack.config.js');
//var vendor = require('./src/vendor.js');
var config = Object.assign({}, webpack_config, {
    devtool: '',
    entry: {
        app: './src/index.jsx',
        //vendor: vendor,
		//libs : ['react','antd'], 
    },
    resolve: Object.assign(webpack_config.resolve, {
    }),
	module: {
        loaders: [
			{ test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]'},
			{ 
            	test: /\.js[x]?$/, 
            	loader: 'babel',
				exclude: /node_modules/,//不解析node_modules的es6语法 
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css") },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!sass") },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
		//new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js", ['app']),
		//new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js", []),
		//new webpack.optimize.CommonsChunkPlugin("libs", "libs.bundle.js", ['vendor', 'chunk']),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("production") //定义为生产环境
        }),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('css/styles.css', {
            allChunks: true
        }),
    ]
});
//console.log(config.entry);
module.exports = function(grunt) {
    grunt.initConfig({
        webpack: {
            production: config
        },
        compress: {
            main: {
                options: {
                    mode: 'zip',
					archive: function(){
						return 'publish-' + grunt.template.today('yyyymmddHHMMss') + '.zip';
					}
                },
                expand: true,
                cwd: 'public/',
                src: ['**/*'],
            }
        },
		clean: {
			folder: ['public/js/']
		}
        
    });
    //grunt.loadNpmTasks('grunt-contrib-compass');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-string-replace');	
    //grunt.loadNpmTasks('grunt-contrib-htmlmin');
    //grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');	
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask("default", ['clean','webpack','compress']);
}
