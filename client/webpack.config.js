const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_API_URL: JSON.stringify(process.env.REACT_APP_API_URL),
        REACT_APP_CLOUDINARY_CLOUD_NAME: JSON.stringify(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME),
        REACT_APP_CLOUDINARY_API_KEY: JSON.stringify(process.env.REACT_APP_CLOUDINARY_API_KEY),
        REACT_APP_CLOUDINARY_API_SECRET: JSON.stringify(process.env.REACT_APP_CLOUDINARY_API_SECRET),
        REACT_APP_CLOUDINARY_UPLOAD_PRESET: JSON.stringify(process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public')
    },
    port: 3000,
    hot: true,
    open: true,
    proxy: [{
      context: ['/api'],
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false
    }]
  }
};