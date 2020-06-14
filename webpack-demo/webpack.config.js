const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false  }),//cleans dist after every build, removes any old files or unused files
    new HtmlWebpackPlugin({ //creates new index.html for us (or replaces the one we already have), adds all files for us, so if we change names we don't have to do it anymore in indx.thml
        title: 'Output Management'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};

/*

Asset Management
*Setting up assets
* Files, xcel, css, html, js, images

Output Management:
*Multiple files
*Dynamic HTML


Development:
*Source Maps
*Dev environment



*/