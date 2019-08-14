/**
 * 利用koa的代理中间件
 */

const proxy = require('koa-proxy');

module.exports = options => {
    const myProxy = (opt) => {
      return async (ctx, next) => {
        opt = Object.assign({}, opt);
        let protocal = (opt.protocal||'http');
        // 如果指定了ip，则url用ip加端口拼起来
        if(opt.ip && !opt.url) {
          opt.url = protocal + '://' + opt.ip;
          if(opt.port) opt.url += ':' + opt.port;
          opt.url += (ctx.path || '');
          if(!opt.host) opt.host = ctx.origin;
        }
        // koa-proxy要求带 host protocal
        if(opt.host && !/^http(s)?:\/\//.test(opt.host)) {
          opt.host = protocal + '://' + opt.host;
        }

        await proxy(opt)(ctx, next);
      }
    }
    // 如果是配置的数组，则从第一个开始递归处理
    if(options && Array.isArray(options)) {
      return async (ctx, next) => {
        let handle = async (i) => {
          if(i >= options.length) {
            await next();
          }
          else {            
            let p = myProxy(options[i]);
            await p(ctx, async ()=> {
              await handle(i+1);
            });
          }
        };
        await handle(0);
      };
    }
    return myProxy(options);
  };