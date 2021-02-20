import path from 'path'
import lodash from 'lodash'
import fs from 'fs'

class Config {
  constructor (baseDir = process.cwd()) {
    /**
     * 存储配置的容器
     */
    this.store = {}
    /**
     * 当前工作目录
     */
    this.baseDir = baseDir
    this.init()
  }

  /**
   * 初始化工作目录
   * @param baseDir 工作目录
   */
  init () {
    // 获取工作目录
    const files = fs.readdirSync(path.resolve(`${this.baseDir}/app/config`))
    // 加载 config 目录下的配置文件
    for (const file of files) {
      this.getConfigFromFile(`app/config/${file}`)
    }
  }

  /**
   * 获取单个的配置项
   * ```js
   * const val = config.getItem("key");
   * ```
   *
   * 支持传入默认值，如果不存在该配置项，则返回传入的默认值
   *
   * ```js
   * const val = config.getItem("key","default");
   * // 如果config中存在key的配置项，则返回其配置项
   * // 否则返回 "default"
   * ```
   *
   * @param key 配置项的路径
   * @param defaultVal 可选参数，默认值
   */
  getItem (key, defaultVal) {
    return lodash.get(this.store, key, defaultVal)
  }

  /**
   * 检查是否存在某个配置项
   *
   * ```js
   * const exit = config.hasItem("key");
   * // 如果存在 exit 为true
   * // 不存在，则exit 为false
   * ```
   * @param key 配置项的路径
   */
  hasItem (key) {
    return lodash.has(this.store, key)
  }

  /**
   * 通过硬编码的方式设置配置项
   *
   * ```js
   * config.setItem("name","pedro");
   * // 设置 name 配置项的值为 pedro
   * // 如果config中已存在这个配置项，则覆盖原有的
   * ```
   * @param key 配置项的键
   * @param val 配置项的值
   */
  setItem (key, val) {
    lodash.set(this.store, key, val)
  }

  /**
   * 从js文件中导入配置
   *
   * ```js
   * config.getConfigFromFile("path/file");
   * ```
   * @param filepath js文件的路径，相对当前工作目录的路径
   */
  getConfigFromFile (filepath) {
    const mod = require(path.resolve(this.baseDir, filepath))
    this.store = lodash.merge(this.store, mod)
  }
}

export const config = new Config(path.resolve(__dirname, '../../'))

export default Config
