'use strict';

//exports.middleware = [ 'jproxy' ];
/**
 * egg-jproxy default config
 * @member Config#jproxy
 * @property {String} SOME_KEY - some description
 */
exports.jproxy = [
    {
        ip: '127.0.0.1', // ipaddress
        port: 8080,     // port  default:80
        protocal: 'http', // http or https
        host:  'qian.tenpay.com',     // proxy domain
        match: /^\/jproxy\/(.*)\.(cgi|fcgi)/   // match  /jproxy/xxx.cgi
     }
];