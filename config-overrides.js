const { alias } = require("react-app-rewire-alias"); //導入alias函式
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = function override(config) {
  //導出接受config參數(webpack配置)的override函式
  alias({
    //簡化路徑
    "@/components": "src/components",
    "@/pages": "src/pages",
    "@/utilities": "src/utilities",
    "@/api": "src/api",
    "@/hooks": "src/hooks",
    "@/assets": "src/assets",
    "@/router": "src/router",
    "@/context": "src/context",
  })(config); //調用alias函式
  // config.plugins = [...config.plugins, new BundleAnalyzerPlugin()]; // 合併 plugins 配置

  return config; //返回變更後的webpack配置
};
