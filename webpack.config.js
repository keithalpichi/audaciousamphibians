var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  watch: true,
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "build"),
    filename: "index.js",
    compress: true,
    historyApiFallback: true,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [
      "node_modules"
    ]
  },
  target: "web",
  node: {
    console: true,
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
};
