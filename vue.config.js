module.exports = {
    devServer: {
        port:8080,
        proxy: {
            '^/': {
                target: 'http://localhost/',
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '^/':''
                }
            }
        }
    }
}