module.exports = {
    configureWebpack: {
      devServer: {
        port: 3000,
        watchOptions: {
          poll: true,
        },
        proxy: {
          '/api': {
            target: "http://localhost:3001",
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
          }
        }
      },
    }
  };