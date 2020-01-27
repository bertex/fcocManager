const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BabelPolfill= require("babel-polyfill");

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/main.js'],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  resolve: {
    alias: {
      "./images/layers.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/layers.png"
      ),
      "./images/layers-2x.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/layers-2x.png"
      ),
      "./images/marker-icon.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/marker-icon.png"
      ),
      "./images/marker-icon-2x.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/marker-icon-2x.png"
      ),
      "./images/marker-shadow.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/marker-shadow.png"
      )}
    },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(gif|svg|jpg|png|shp)$/,
        loader: "file-loader"
      },
      {
        test: /\.js$/,
        loader : 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.(s*)[a|c]ss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ],

      }
    ]
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'FCOC Gestor de Mapes',
      showErrors: true
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
};

