#Webpack + Gulp 搭建 React 开发环境

##webpack
Webpack是一个模块加载器，它把所有的资源都当作是模块，js,css,图片等等。所以在 Webpack 中，js可以引入CSS，CSS可以嵌入图片。对应各种不同文件类型的资源，Webpack都有对应的loader，比如 JSX 用的 JSX-loader.

官方网址：http://webpack.github.io/

###CommonJS 与 AMD 的支持
Webpack 对 CommonJS 的 AMD 的语法做了兼容, 方便迁移代码, 不过实际上, 引用模块的规则是依据 CommonJS 来的。所以我们可以同时使用 CommonJS 的 AMD 的语法，但建议使用 CommonJS .

####CommonJS 语法

    var m1 = require('module1')
    var m2 = require('module2')
    var m3 = require('module3')


####AMD 语法

    define(['module1','module2','module3'],
      function(m1,m2,m3){
        // your code
    })

在 AMD 语法中，依然是按照CommonJS查找模块，只是语法上兼容而已.

###使用方法
####安装与运行

    npm install -g webpack

先全局安装webpack，就可以在命令行中使用webpack了。如果当前目录中有webpack的配置文件 config.js ,使用webpack命令运行 webpack 。

    webpack config.js

运行时还可以加写参数以显示更详细的信息，比如

    //显示详细的错误信息
    webpack config.js --display-error-details  

###基本配置项

webpack 配置项 官方文档：http://webpack.github.io/docs/configuration.html

一般情况，新建一个 webpack.config.js ，把配置信息写在里面。

    //webpack.config.js
    var webpack = require('webpack');

    module.exports = {
      entry:{},
      output:{},
      resolve:{},
      module:{},
      plugins:[]
    }

####entry:入口文件配置项

entry中放入口相关的配置，可配置多个入口，打包的时候，会根据入口文件打包成多个文件。

    entry:{
      people: './app/main/people.js',
      company: './app/main/company.js',
      task: './app/main/task.js'
      // 放更多的入口文件....
    }

####output:打包后输出配置
output中配置打包后的输出配置，比如输出路径，输出文件名.

    output:{
      path: path.join(__dirname , '/app'), // 输出路径
      filename: '[name].js' // 输出文件名，[name] 会根据entry的配置项的键输出多个文件，
    }


####resolve:查找模块配置

resolve中配置查找模块的规则，可配置需要查找的文件后缀名，别名等等。

    resolve:{
      extensions: ['', '.js', '.jsx', '.css'],
      alias: {
        jquery: path.join(__dirname,'app/vendor/jquery'),
        bootstrap: path.join(__dirname,'app/vendor/bootstrap'),

        people: path.join(__dirname,'app/modules/people'),
        company: path.join(__dirname,'app/modules/company'),
        task: path.join(__dirname,'app/modules/task'),
      }
    }

resolve.extensions:如果 require('./bootstrap'),将会依次查找文件{ bootstrap -> bootstrap.js -> bootstrap.jsx -> bootstrap.css  }是否存在，如果存在则加载，如果不存在则继续查找下一项配置,最后如果没找到则抛出错误.
resolve.alias: 路径的别名，方便引入文件的时候简写.

####module:使用webpack模块
module 配置是使用Webpack的模块的地方，其中loader就是这里配置的， Webpack 中的 loader 是 webpack 最激动人心的东西，可以让 webpack  自动的帮我们处理我们的代码， 比如解析 jsx ，编译 es6 等等。
webpack的loader列表：http://webpack.github.io/docs/list-of-loaders.html

    module: {
      loaders:[
        {
          test: /\.js$/,
          loaders: ['babel-loader','jsx-loader?'],
          include: path.join(__dirname, 'app'),
          exclude: path.join(__dirname, 'app/vendor')
        },{
          test:/\.jsx$/,
          loader:'babel-loader!jsx-loader?',
        }
      ]
    }

module.loaders:配置webpack的loader

*   `test`:正则表达式，匹配文件名使用该条规则
*   `loaders`: 数组，依次是需要使用的loader
*   `loader`: 字符串，依次是需要使用的loader，各个loader使用 ! 分隔开
*   `include`: 数组或者字符串，包含的路径
*   `exclude`: 数组或者字符串，排除的路径
  


####plugins:使用webpack插件
plugins 是加载webpack插件的地方，比如uglify、optimize等等
plugins列表：http://webpack.github.io/docs/list-of-plugins.html

    plugins:[
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.WatchIgnorePlugin()
    ]

plugins是一个数组，里面是各个插件的实例集合


##Gulp
在我们的工作流程里，应该尽量减少重复的工作，借助Gulp可以自动帮我们执行我们设置的任务

###安装Gulp
首先需要全局安装一些gulp，以便能在命令行中使用

    npm install -g gulp

###新建任务
在gulp默认配置中，gulp所有任务都是写在 `Gulpfile.js`文件中。所以先在根目录新建一个`Gulpfile.js`文件

####注册一个普通任务

    gulp.task('taskName1',function(){
      // 任务详情
    })

####注册一个有依赖的任务

    gulp.task('taskName2',['taskName1','otherTask'],function(){
      // 任务详情
    })

###运行任务

直接运行命令 `gulp` 会执行Gulpfile.js 中注册的名为`default`的任务，

    gulp

运行其他任务，可以使用`gulp 任务名`形式

    gulp taskName

要运行多个任务，直接在后面继续添加任务名

    gulp taskName1 taskName2 taskName3 ....

###Gulp语法
以压缩css任务为例
    
    var minify = require('gulp-minify');
 
    gulp.task('miniCss', function() {
      gulp.src('lib/*.css')
        .pipe(minify({
            exclude: ['tasks'],
            ignoreFiles: ['.combo.css', '-min.css']
        }))
        .pipe(gulp.dest('dist'))
    });

    gulp.task('watchCss',function(){
      gulp.watch('lib/*.css',[miniCss]);
    })

*   `gulp.src()`: globs，可以使用数组处理多个globs，简单地说就是 找出想要处理的文件
*   `pipe()`: 管道，每个管道里面，你可以指定它的功能，去处理文件
*   `gulp.dest()`: 把处理好的文件放到指定的地方 
*   `gulp.watch()`:监听文件，当文件变化后执行任务

##Webpack + Gulp 搭建 React 开发环境
我们注册一个可以打包React项目的任务，和一个可以即时预览的任务

目录结构大概为这样子


    webpack-gulp
    |-app/
    | |-main/
    | | |-people.js
    | | |-company.js
    | | |-file.js
    | | |-...



###依赖库

* gulp
* gulp-webpack  
* gulp-util
* webpack
* webpack-dev-server  //webpack 开发服务
* react-hot-loader    //即时预览 react
* jsx-loader          // 编译jsx
* babel-loader        // 编译ES6
* css-loader          // 引入样式时需使用该loader
* style-loader
* file-loader
* url-loader

* react               // 方便引入未编译的 react


###项目架构

###打包任务

###react-hot-loader 实时预览
