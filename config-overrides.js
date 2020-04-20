const { override, fixBabelImports, addWebpackAlias, addLessLoader } = require('customize-cra');
const path = require("path");
module.exports = override(
  // 实现antd /ant-mobile的按需引入

  fixBabelImports('pc', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css',
    style: true, //主题才能生效
  }),
  // fixBabelImports('mobile', {
  //   libraryName: 'antd-mobile',
  //   libraryDirectory: 'es',
  //   style: 'css',
  // }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
  //别名配置
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "./src"),
    ["@a"]: path.resolve(__dirname, "./src/assets"),
    ["@v"]: path.resolve(__dirname, "./src/views"),
    ["@c"]: path.resolve(__dirname, "./src/components")
  })
);