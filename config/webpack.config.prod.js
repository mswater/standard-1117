const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NameAllModulesPlugin = require("name-all-modules-plugin");
const HappyPack = require("happypack");
const ModuleConcatenationPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const NyanProgressPlugin = require("nyan-progress-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const { ROOT_PATH, SRC_PATH, BUILD_PATH, VENDORS } = require("./constant.js");


const ASSETS_PATH = "/";

const prodConfig = {
  mode: "production",
  context: ROOT_PATH,
  target: "web",
  stats: "errors-only",
  entry: {
    app: `${SRC_PATH}/index.js`,
    lib: VENDORS,
  },

  output: {
    path: BUILD_PATH,
    filename: "[name]-[hash:8].js",
    chunkFilename: "js/[name]-[hash:8].chunk.js",
    publicPath: ASSETS_PATH,
  },

  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   enforce: "pre",
      //   loader: require.resolve("eslint-loader"),
      //   include: SRC_PATH,
      // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["happypack/loader?id=babel"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: require.resolve("css-loader"),
            options: {
              hmr: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"],
                  flexbox: "no-2009",
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[hash:7].[ext]",
        },
      },
    ],
  },

  /**
   * 为 vendor 单独打包（第三方库或者基础组件库）
   * 为 runTime 的代码单独打包
   * 为不同入口的公共代码打一个包
   * 为异步加载的代码打一个包
   */

  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        // 项目公共组件
        common: {
          test: (module) => {
            return module.type === "javascript/auto";
          },
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 30,
          priority: 1,
        },
        libs: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          name: "libs",
          minChunks: 1,
          priority: -10,
          minSize: 10,
          enforce: true,
        },
        // 将每一个入口抽取的单独的 css 文件合成一个 chunk
        style: {
          test: /\.css$/,
          name: "style",
          chunks: "all",
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
    nodeEnv: "production",
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\.min\.js$/,
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: true,
        uglifyOptions: {
          compress: {
            unused: true,
            warnings: false,
            drop_debugger: true,
          },
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            removeAll: true,
          },
        },
        canPrint: true,
      }),
    ],
  },

  plugins: [
    new NyanProgressPlugin(), // 进度条
    new CleanWebpackPlugin([BUILD_PATH], {
      root: ROOT_PATH,
      verbose: true,
      dry: false,
    }),
    new HappyPack({
      id: "babel",
      loaders: ["babel-loader?compact=true"],
    }),
    new ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new HtmlWebpackPlugin({
      title: "react",
      inject: true,
      template: path.join(SRC_PATH, "/template.html"),
      favicon: path.join(ROOT_PATH, "/assets/favicon.ico"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyURLs: true,
      },
    }),
    new NameAllModulesPlugin(),
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk.mapModules((m) => path.relative(m.context, m.request)).join("_");
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash:5].css",
      chunkFilename: "css/[id]-[hash:5].css",
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  devtool: "source-map"
};

if (process.env.ANALYZE) {
  prodConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = prodConfig;
