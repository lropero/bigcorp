const path = require('path')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true
  },
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
