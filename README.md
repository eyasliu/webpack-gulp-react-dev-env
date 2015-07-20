#Webpack + Gulp 搭建 React 开发环境

##webpack
Webpack是一个模块加载器，它把所有的资源都当作是模块，js,css,图片等等。所以在 Webpack 中，js可以引入CSS，CSS可以嵌入图片。对应各种不同文件类型的资源，Webpack都有对应的loader，比如 JSX 用的 JSX-loader.

###CommonJS 与 AMD 的支持
Webpack 对 CommonJS 的 AMD 的语法做了兼容, 方便迁移代码不过实际上, 引用模块的规则是依据 CommonJS 来的。所以我们可以同时使用 CommonJS 的 AMD 的语法，但建议使用 CommonJS .

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


##Gulp

###新建任务

###运行任务


##Webpack + Gulp 搭建 React 开发环境

###依赖库

###项目架构

###打包任务

###react-hot-loader 实时预览
