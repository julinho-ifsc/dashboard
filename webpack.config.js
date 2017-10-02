const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')
const cssnext = require('postcss-cssnext')
const cssnano = require('cssnano')
const easyImport = require('postcss-easy-import')
const notifier = require('node-notifier')

module.exports = env => {
  const config = {
    entry: {
      app: './src/app.js',
      vendor: ['offline-plugin/runtime', 'regenerator-runtime/runtime', 'wretch', 'whatwg-fetch']
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'public'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: 'babel-loader'
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
              limit: 4096,
              noquotes: true
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
            title: 'Webpack error',
            message: severity + ': ' + error.name,
            subtitle: error.file || ''
          })
        }
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': env.prod ? JSON.stringify('production') : JSON.stringify('development')
      })
    ]
  }

  if (env.prod) {
    config.output.filename = '[name].[chunkhash].js'
    config.plugins = [
      ...config.plugins,
      new OfflinePlugin({
        AppCache: false,
        ServiceWorker: {events: true}
      }),
      new webpack.HashedModuleIdsPlugin(),
      new WebpackChunkHash()
    ]
  }

  return config
}
