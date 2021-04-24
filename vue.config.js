module.exports = {
    configureWebpack: {
      devServer: {
        port: 8080,
        watchOptions: {
          poll: true,
        },
        proxy: {
          '/api': {
            target: "http://localhost:3000",
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
          }
        }
      },
    }
  };