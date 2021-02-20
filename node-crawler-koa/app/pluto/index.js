import Loader from './loader'
import error from './error'

export { config } from './config'
export * from './error/http-exception'
export * from './extend'
export * from './validator/lin-validator'
/**
 * 初始化并获取配置
 */
// ;(function () {
//   // 获取工作目录
//   const baseDir = path.resolve(__dirname, '../../')
//   config.init(baseDir)
//   const files = fs.readdirSync(path.resolve(`${baseDir}/app/config`))
//
//   // 加载 config 目录下的配置文件
//   for (const file of files) {
//     config.getConfigFromFile(`app/config/${file}`)
//   }
// })()

export {
  Loader,
  error,
}
