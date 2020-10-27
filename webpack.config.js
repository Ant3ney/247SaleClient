const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Obfuscator = require('webpack-obfuscator');

const environment = process.env.NODE_ENV;
const devMode = environment === 'development';
const port = 8000;

const config = {
  mode: environment,
  target: 'web',
  devServer: {
    host: '0.0.0.0',
    contentBase: `${__dirname}/dist`,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: port
  },
  devtool: devMode ? 'inline-source-map' : false,
  node: {
    fs: 'empty'
  },
  entry: {
    senpaio: `${__dirname}/entrypoint.ts`
  },  
  output: {
    filename: '[name].js?[hash]',
    path: `${__dirname}/dist/`
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif|mp3|ogg|wav|woff|woff2|ttf|svg|eot|fnt)$/,
        loader: "file-loader",
        options: {
          name: '[path][name].[ext]',
          outputPath: devMode ? '' : 'resources'
        }
      },
      {
        test: /\.html$/,
        loader: 'underscore-template-loader',
        query: {
          engine: 'underscore'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              outputStyle: devMode ? 'expanded' : 'compressed'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /\/(node_modules|libs)\//,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: 'Senpa.io mobile',
      devMode: devMode,
      template: 'src/html/entrypoint.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css?[hash]",
      chunkFilename: "[id].css?[hash]"
    })
  ]
};

if (!devMode) config.plugins.push(
  new Obfuscator ({
    compact: true,
    debugProtection: true,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    rotateStringArray: true,
    seed: Math.random() * 1E5 | 0,
    stringArray: true,
    stringArrayEncoding: 'rc4',
    stringArrayThreshold: 0.8,
  })
);

module.exports = config;
