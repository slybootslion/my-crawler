import Koa from 'koa'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import koaStatic from 'koa-static'
import { config, Loader, error, success, json } from './pluto'

/**
 * 跨域支持
 * @param app koa实例
 */
function applyCors (app) {
  app.use(cors())
}

/**
 * 解析Body参数
 * @param app koa实例
 */
function applyBody (app) {
  // 参数解析
  app.use(koaBody({
    multipart: true,
  }))
}

/**
 * json logger 扩展
 * @param app koa实例
 */
function applyDefaultExtends (app) {
  json(app)
  success(app)
}

/**
 * loader 加载插件和路由文件
 * @param app koa实例
 */
function applyLoader (app) {
  const loader = new Loader(app)
  loader.initLoader()
}

/*
* 静态资源服务器
* */
function staticServe (app) {
  app.use(koaStatic(config.getItem('staticPath')))
}

/**
 * 初始化Koa实例
 */
async function createApp () {
  const app = new Koa()
  app.use(error)
  applyBody(app)
  applyCors(app)
  applyDefaultExtends(app)
  applyLoader(app)
  staticServe(app)
  return app
}

module.exports = { createApp }
