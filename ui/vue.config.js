// Vue.config.js 配置选项
module.exports = {
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: true,
    devServer: {
        open: false,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: true,
        proxy: {
            '/': {
                target: process.env.VUE_APP_DOMAIN,
                changeOrigin: true,
            }
        },
    },
}