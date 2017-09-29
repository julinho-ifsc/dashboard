const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cssnext = require('postcss-cssnext')
const cssnano = require('cssnano')
const easyImport = require('postcss-easy-import')
const notifier = require('node-notifier')

module.exports = {
  entry: ['whatwg-fetch', 'regenerator-runtime/runtime', './src/app.js'],
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: [
                'transform-async-to-generator',
                'transform-regenerator',
                'transform-object-rest-spread'
              ]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
              cache: true,
              formatter: require('eslint-formatter-pretty'),
              emitError: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[local]--[hash:base64]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => {
                  return [
                    easyImport(),
                    cssnext({
                      warnForDuplicates: false
                    }),
                    cssnano({
                      discardUnused: {
                        fontFace: false,
                        keyframes: false
                      },
                      zindex: false,
                      reduceIdents: false
                    })
                  ]
                }
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {
            limit: 4096
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanWebpackPlugin(['public/*.js', 'public/*.css', 'public/.html']),
    new ExtractTextPlugin('style.[contenthash].css'),
    new FriendlyErrorsWebpackPlugin({
      onErrors(severity, errors) {
        if (severity !== 'error') {
          return
        }
        const error = errors[0]

        notifier.notify({
          title: "Webpack error",
          message: severity + ': ' + error.name,
          subtitle: error.file || ''
        })
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}
