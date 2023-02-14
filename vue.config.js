const { defineConfig } = require("@vue/cli-service");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PUBLIC_PATH = process.env.PUBLIC_PATH;

module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: false,
  publicPath: PUBLIC_PATH ?? "/",
  configureWebpack: {
    optimization: {
      usedExports: true,
    },
    output: {
      filename: "js/weather-widget.js",
    },
    plugins: [new CleanWebpackPlugin()],
  },
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
  },
});
