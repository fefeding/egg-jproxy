module.exports = app => {
    // 将 jproxy 中间件放到最前面    
    app.config.coreMiddleware.unshift('jproxy');
  };