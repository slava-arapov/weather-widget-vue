const { defineConfig } = require("@vue/cli-service");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: false,
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
