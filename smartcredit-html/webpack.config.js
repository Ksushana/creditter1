const path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const isProduction = process.env.NODE_ENV === 'production';

const generateHtmlPlugins = templateDir => {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts.slice(0, -1).join('.'); // parts[0];
    const extension = parts[parts.length - 1];

    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
    });
  });
};

const htmlPlugins = generateHtmlPlugins('./src/html/views');

const PRODUCTION_MODE = 'production';

const config = {
  entry: ['whatwg-fetch', './src/js/index.js', './src/styles/main.scss'],
  output: {
    filename: './js/bundle.js',
  },
  devtool: false,
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: false,
        extractComments: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/, // this for swiper transpile
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        include: path.resolve(__dirname, 'src/styles'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/html/includes'),
        use: ['raw-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/style.bundle.css',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/fonts',
        to: './fonts',
      },
      {
        from: './src/favicon',
        to: './favicon',
      },
      {
        from: './src/images',
        to: './images',
      },
      {
        from: './src/icons',
        to: './icons',
      },
      {
        from: './src/emails',
        to: './',
      },
    ]),
    new ImageminPlugin({
      disable: !isProduction, // Disable during development
      test: /images\/\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '95-100',
      },
    }),
  ].concat(htmlPlugins),
};

module.exports = (env, { mode }) => {
  if (mode === PRODUCTION_MODE) {
    config.plugins.push(new CleanWebpackPlugin('dist'));
  }

  return config;
};
