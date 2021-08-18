module.exports = {
    configureWebpack: {
      devServer: {
        port: 8080,
        headers: {"Access-Control-Allow-Origin": "*"},
        watchOptions: {
          poll: true,
        }
      }
    }
  };