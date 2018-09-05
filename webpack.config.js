var path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index/index.js",
  output: {
    path: __dirname + "/static",
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"],
            plugins: [
              "transform-decorators-legacy",
              "transform-class-properties",
              "syntax-object-rest-spread"
            ]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "static"),
    compress: true,
    port: 9000,
    hot: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index/index.html",
      filename: "./index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
