import KoaRouter from 'koa-router'
import Config from './config'
import Utils from './utils'

const config = new Config()

/* 'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Loader = exports.disableLoading = void 0
const tslib_1 = require('tslib')
const consola_1 = tslib_1.__importDefault(require('consola'))
const sequelize_1 = require('sequelize')
const utils_1 = require('../utils')
const lodash_1 = require('lodash')
const koa_router_1 = tslib_1.__importDefault(require('koa-router'))
const path_1 = tslib_1.__importDefault(require('path'))
const plugin_1 = require('../plugin')
const config_1 = require('../config')
const baseDir = config_1.config.getItem('baseDir', process.cwd()) */

// 当前文件路由是否挂载
// exports.disableLoading = Symbol('disableLoading')
/**
 * 加载器
 * 用于加载插件和路由文件
 */

const baseDir = config.getItem('baseDir', process.cwd())
class Loader {
  constructor (app) {
    this.app = app
    this.loadMainApi(app)
  }
  /**
   * 初始化
   * 挂载 loader 和 插件
   */
  initLoader () {
    this.app.context.loader = this
  }

  /**
   * 加载主应用中的所有路由
   */
  loadMainApi (app) {
    const mainRouter = new KoaRouter()
    this.mainRouter = mainRouter
    // 默认api的文件夹
    let apiDir = config.getItem('apiDir', 'app/api')
    apiDir = `${baseDir}/${apiDir}`
    const files = Utils.getFiles(apiDir)
    for (const file of files) {
      const extension = file.substring(file.lastIndexOf('.'), file.length)
      // 现在只考虑加载.js文件，后续考虑.ts文件
      if (extension === '.js') {
        const mod = require(file)
        // 如果mod 为 koa-router实例
        // 如果disableLoading为true，则不加载这个文件路由
        if (mod instanceof KoaRouter) {
          mainRouter.use(mod.routes()).use(mod.allowedMethods())
        } else if (!mod[exports.disableLoading]) {
          Object.keys(mod).forEach(key => {
            if (mod[key] instanceof KoaRouter) {
              mainRouter.use(mod[key].routes()).use(mod[key].allowedMethods())
            }
          })
        }
      }
    }
    app.use(mainRouter.routes()).use(mainRouter.allowedMethods())
  }
}

export default Loader
