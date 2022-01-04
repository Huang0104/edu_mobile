module.exports = {
  productionSourceMap: false,
  css: {
    extract: false
  },
  chainWebpack: config => {
    config.module
    .rule('images')
    .use('image-webpack-loader')
    .loader('image-webpack-loader')
    .options({
      disable: true
    })
    .end()
  },
  configureWebpack: {
    // 通过 CDN 引⼊
    externals: {
      'vue': 'Vue',
      'vant': 'vant'
    }
  }
}