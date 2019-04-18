const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: __dirname + "/build",
    publicPath: "/",
    filename: "bundle.js"
  },
  resolve: { extensions: [".js", ".jsx", ".json", ".ts", ".tsx"] },
  devServer: {
    contentBase: path.resolve("build"),
    compress: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    disableHostCheck: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        use: { loader: "file-loader" }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: { loader: "graphql-tag/loader" }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.worker\.ts$/,
        use: {
          loader: "worker-loader"
        }
      },
      { test: /\.tsx?$/, use: { loader: "ts-loader" } },
      { enforce: "pre", test: /\.js$/, use: { loader: "source-map-loader" } }
    ]
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: "app",
      files: { manifest: "manifest.json" },
      inject: false,
      links: ["https://fonts.googleapis.com/css?family=Share:400,700"],
      mobile: true,
      template: require("html-webpack-template"),
      title: "Cashflow / Continual finance tracking",
    }),
  ]
};
