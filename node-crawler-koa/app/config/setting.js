const path = require('path')

const NODE_ENV = process.env.NODE_ENV
const isProduction = NODE_ENV && NODE_ENV.trim() === 'production'
const uploadBasePath = isProduction ? '/www/wwwroot/static' : 'D:\\Code\\web-example\\static'
const uploadBaseURL = isProduction ? 'https://static.slybootslion.com/' : 'http://static1.sketchmac.com/'

module.exports = {
  port: 39004,
  NODE_ENV,
  isProduction,
  countDefault: 10,
  pageDefault: 0,
  // 指定工作目录，默认为 process.cwd() 路径
  baseDir: path.resolve(__dirname, '../../'),
  staticPath: path.resolve(__dirname, '../../dist'),
  accessExp: 60 * 60 + 30, // 2h + 0.5分钟 单位秒
  refreshExp: 60 * 60 * 24 * 7, // 设置refresh_token的过期时间，默认7天
  uploadBasePath,
  uploadBaseURL,
  maxFileSize: 10 * 1024 * 1024, // 10m
  captchaExp: 60 * 10, // 验证码过期时间 (10分钟)
}
