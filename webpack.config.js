const path = require("path")

module.exports = {
  entry: {
    index: ["@babel/polyfill", "./src/index.js"],
    edit: ["@babel/polyfill", "./src/edit.js"]
  },
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "[name]-bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  devServer: {
      contentBase: path.resolve(__dirname, "public"),
      watchContentBase: true,
      publicPath:"/dist/"
  },
  devtool: "source-map"
}