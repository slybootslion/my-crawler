import HttpException from './http-exception'
import CodeMessage from '../code-message'

const NODE_ENV = process.env.NODE_ENV
const isProduction = NODE_ENV && NODE_ENV.trim() === 'production'
/**
 * 全局异常处理中间件
 */
const error = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.type = 'application/json'
    if (err instanceof HttpException) {
      ctx.status = err.status || 500
      ctx.body = JSON.stringify({
        code: err.code,
        message: err.message,
        request: `${ctx.method} ${ctx.req.url}`,
      })
    } else {
      // 开发环境
      // 未知异常处理 开发模式直接抛出异常
      if (!isProduction) throw err
      // 生产环境
      ctx.body = JSON.stringify({
        code: 9999,
        message: CodeMessage.getMessage(9999),
        request: `${ctx.method} ${ctx.req.url}`,
      })
    }
  }
}

export default error
