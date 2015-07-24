var gulp = require('gulp');
var gulpWebpack = require("gulp-webpack");
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config");

gulp.task('build',function(){
    gulp.src('./app/src_dev/main/people.js')
			.pipe(gulpWebpack(webpackConfig))
			.pipe(gulp.dest('./app/src/'))
})


gulp.task('server',function(){
	var port = 8088;
	var compiler = webpack(webpackConfig);

	new webpackDevServer(compiler,{
		contentBase:'./app',
		hot: true,
		quiet:true,
		headers: { 'Access-Control-Allow-Origin': '*' },
		publicPath:'/assets/'
	}).listen(port,function(err){
		console.log('listening: http://localhost:'+port);
	})

})
