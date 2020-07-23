module.exports = {
  lintOnSave: false,
  assetsDir: 'assets',
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}
