var webpack = require('webpack');
var path = require('path');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js')

function absPath(p){
  return path.join(__dirname,p);
}

module.exports = {
  entry: {

    people: [
    'webpack-dev-server/client?http://localhost:8088',
    'webpack/hot/only-dev-server',
    './app/src_dev/main/people.js'
    ]
  },
  output: {
    path: path.join(__dirname,'app/src'),
    publicPath: './assets/',
    filename: '[name].js'
  },
  resolve: {

    extensions: ['', '.js', '.jsx', '.css'],
    alias:{
      app:      absPath('./app/src_dev'),
    	vendor:   absPath('./app/src_dev/vendor'),

      src:      absPath('./app/src_dev'),
      modules:  absPath('./app/src_dev/modules'),
      common:   absPath('./app/src_dev/modules/common'),
      people:     absPath('./app/src_dev/modules/people'),


      // 常用库
      // React:    absPath('./app/src_dev/vendor/react/react'),
      jquery:   absPath('./app/src_dev/vendor/jquery/dist/jquery'),
      // flux:     absPath('./app/src_dev/vendor/flux/Flux'),
      bootstrap:absPath('./app/src_dev/vendor/bootstrap/dist/')
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot-loader','babel-loader'],
      include: path.join(__dirname, 'app/src_dev')
    }, {
      test: /\.jsx$/,
      loader: ['babel','jsx?harmony']
    },{
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    },{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },{
      test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=8192'
    }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
