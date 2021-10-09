/* eslint-disable */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (mode) => ({
  mode,
  context: path.resolve(__dirname, './src'),

  entry: {
    app: ['./entry.tsx'],
    vendor: ['./ui/main.scss'],
  },

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, './assets'),
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.json', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: [mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
});
