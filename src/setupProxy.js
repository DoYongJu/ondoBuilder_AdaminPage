// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/v1', // 프록시 대상 경로
    createProxyMiddleware({
      target: 'http://192.168.1.36:3030', // 프록시할 서버의 주소
      changeOrigin: true,
    })
  );
};
