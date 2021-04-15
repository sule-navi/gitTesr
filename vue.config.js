/*
 * @Author: Sule
 * @Date: 2021-04-09 16:21:48
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-09 16:36:40
 * @Description: 
 */
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = process.env.VUE_APP_BASE_NAME || "production";

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  lintOnSave: false,
  productionSourceMap: true,
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config) {
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk("single");
    });
  },
};