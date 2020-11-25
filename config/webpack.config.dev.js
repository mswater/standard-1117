const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NyanProgressPlugin = require("nyan-progress-webpack-plugin");
const { SRC_PATH, BUILD_PATH, ASSETS_PATH, ROOT_PATH } = require("./constant.js");

const devConfig = {
  devtool: "cheap-module-source-map",

  mode: "development",

  entry: {
    app: ["react-hot-loader/patch", `${SRC_PATH}/index.js`],
  },

  output: {
    path: BUILD_PATH,
    filename: "[name]-[hash:8].js",
    publicPath: ASSETS_PATH,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        loader: require.resolve("eslint-loader"),
        include: SRC_PATH,
      },
      {
        test: /\.jsx?$/,
        include: SRC_PATH,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-hot-loader",
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              sourceMap: true,
              localIdentName: "[local]",
            },
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: () => {
                return [require("postcss-flexbugs-fixes"), autoprefixer()];
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "[name].[hash:7].[ext]",
        },
      },
    ],
  },

  devServer: {
    host: "127.0.0.1",
    port: "8011",
    stats: "errors-only",
    contentBase: BUILD_PATH,
    hot: true,
    overlay: {
      errors: true,
    },
    publicPath: ASSETS_PATH,
    historyApiFallback: {
      index: `${ASSETS_PATH}index.html`,
    },
  },

  plugins: [
    // new NyanProgressPlugin(), // 进度条
    new CleanWebpackPlugin([BUILD_PATH], {
      root: ROOT_PATH,
      verbose: true,
      dry: false,
    }),
    new HtmlWebpackPlugin({
      title: "react",
      template: path.join(SRC_PATH, "/template.html"),
      filename: "index.html",
      favicon: path.resolve(__dirname, "./../assets/favicon.ico"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = devConfig;
