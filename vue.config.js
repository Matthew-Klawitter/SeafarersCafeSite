module.exports = {
    configureWebpack: {
      devServer: {
        port: 3000,
        watchOptions: {
          poll: true,
        },
      },
    }
  };