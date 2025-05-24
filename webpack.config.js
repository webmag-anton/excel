const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'
  const isDev = !isProd

  const getFilename = (ext) => isDev ?
    `[name].bundle.${ext}` :
    `[name].[contenthash].bundle.${ext}`

  const getPlugins = () => {
    const base = [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/favicon.ico'),
            to: path.resolve(__dirname, 'dist')
          }
        ]
      }),
      new MiniCssExtractPlugin({
        filename: getFilename('css')
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode)
      })
    ]

    if (isDev) {
      base.push(new ESLintPlugin())
    }

    return base
  }

  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: [
        'core-js/stable', // babel polyfills
        'regenerator-runtime/runtime', // babel polyfills
        './index.js'
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: getFilename('js'),
      clean: true
    },

    devServer: {
      port: 3000,
      // open: true,
      hot: true,
      watchFiles: './src',
      client: {
        overlay: {
          warnings: false,
          errors: true
        }
      }
    },

    devtool: isDev ? 'source-map' : false,

    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core')
      }
    },

    plugins: getPlugins(),

    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  }
}
