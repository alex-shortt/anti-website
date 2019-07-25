const path = require("path")
var webpack = require("webpack")

const siteConfig = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif|ttf)$/,
        use: ["file-loader"]
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
}

const shopConfig = {
  entry: "./shop",
  output: {
    filename: "./shop/shop_bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ['@babel/react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif|ttf)$/,
        use: ["file-loader"]
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
}

module.exports = [siteConfig, shopConfig]