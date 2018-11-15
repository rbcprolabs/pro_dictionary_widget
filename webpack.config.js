const
  fs = require('fs'),
  path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  { version } = require('./package')

const mode = process.env.NODE_ENV || 'development'

module.exports = {
  mode,

  entry: {
    app: `${__dirname}/src/index.jsx`,
  },

  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
  },

  devtool: mode === 'production' ? false : 'source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'containers': path.resolve(__dirname, 'src/containers'),
      'stores': path.resolve(__dirname, 'src/stores'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'assets': path.resolve(__dirname, 'src/assets'),
    }
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: ['babel-loader'],
    },{
      test: /\.(ico|png|jpg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/',
      },
    },{
      test: /\.svg$/,
      use: [
        'babel-loader',
        {
          loader: 'react-svg-loader',
          options: {
            jsx: true,
          },
        },
      ],
    },{
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]_[local]_[hash:base64]',
            sourceMap: true,
            minimize: true
          },
        },
        'sass-loader'
      ],
    }],
  },

  optimization: {
    minimize: mode === 'production',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // new CopyWebpackPlugin([{
    //   from: './src/extension.json',
    //   to: './',
    // }]),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.DefinePlugin({
      'appVersion': JSON.stringify(version),
    }),
  ],

  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    https: {
      key: fs.readFileSync('./certificate/localhost.key'),
      cert: fs.readFileSync('./certificate/localhost.crt'),
      passphrase: 'localhost',
    },
  },
}
