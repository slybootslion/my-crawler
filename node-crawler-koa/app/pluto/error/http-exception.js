import lodash from 'lodash'

import CodeMessage from '../code-message'

class HttpException extends Error {
  /**
   * 构造函数
   * @param ex 可选参数，通过{}的形式传入 / 也可以直接传 code
   */
  constructor (ex) {
    super()
    /**
     * http 状态码
     */
    this.status = 500
    /**
     * 返回的信息内容
     */
    this.message = CodeMessage.getMessage(9999)
    /**
     * 特定的错误码
     */
    this.code = 9999
    // this.fields = ['message', 'code']
    this.exceptionHandler(ex)
  }

  exceptionHandler (ex) {
    // 可以直接传一个 code
    if (lodash.isInteger(ex)) {
      this.code = ex
      this.message = CodeMessage.getMessage(ex)
      return
    }
    if (ex && ex.code && lodash.isInteger(ex.code)) {
      const code = ex.code
      this.code = code
      this.message = CodeMessage.getMessage(code)
    }
    if (ex && ex.message) {
      this.message = ex.message
    }
  }
}

/**
 * 成功
 */
export class Success extends HttpException {
  constructor (ex) {
    super()
    this.status = 201
    this.message = CodeMessage.getMessage(0)
    this.code = 0
    this.exceptionHandler(ex)
  }
}

/**
 * 失败
 */
export class Failed extends HttpException {
  constructor (ex) {
    super()
    this.status = 400
    this.message = CodeMessage.getMessage(9999)
    this.code = 9999
    this.exceptionHandler(ex)
  }
}

/**
 * 认证失败
 */
export class AuthFailed extends HttpException {
  constructor (ex) {
    super()
    this.status = 401
    this.message = CodeMessage.getMessage(10000)
    this.code = 10000
    this.exceptionHandler(ex)
  }
}

/**
 * 资源不存在
 */
export class NotFound extends HttpException {
  constructor (ex) {
    super()
    this.status = 404
    this.message = CodeMessage.getMessage(10020)
    this.code = 10020
    this.exceptionHandler(ex)
  }
}

/**
 * 参数错误
 */
export class ParametersException extends HttpException {
  constructor (ex) {
    super()
    this.status = 400
    this.message = CodeMessage.getMessage(10030)
    this.code = 10030
    this.exceptionHandler(ex)
  }
}

/**
 * 令牌失效或损坏
 */
export class InvalidTokenException extends HttpException {
  constructor (ex) {
    super()
    this.status = 401
    this.message = CodeMessage.getMessage(10040)
    this.code = 10040
    this.exceptionHandler(ex)
  }
}

/**
 * 令牌过期
 */
export class ExpiredTokenException extends HttpException {
  constructor (ex) {
    super()
    this.status = 422
    this.message = CodeMessage.getMessage(10050)
    this.code = 10050
    this.exceptionHandler(ex)
  }
}

/**
 * 服务器未知错误
 */
export class UnknownException extends HttpException {
  constructor (ex) {
    super()
    this.status = 400
    this.message = CodeMessage.getMessage(9999)
    this.code = 9999
    this.exceptionHandler(ex)
  }
}

/**
 * 字段重复
 */
export class RepeatException extends HttpException {
  constructor (ex) {
    super()
    this.status = 400
    this.message = CodeMessage.getMessage(10060)
    this.code = 10060
    this.exceptionHandler(ex)
  }
}

/**
 * 禁止操作
 */
export class Forbidden extends HttpException {
  constructor (ex) {
    super()
    this.status = 403
    this.message = CodeMessage.getMessage(10070)
    this.code = 10070
    this.exceptionHandler(ex)
  }
}

/**
 * 请求方法不允许
 */
export class MethodNotAllowed extends HttpException {
  constructor (ex) {
    super()
    this.status = 405
    this.message = CodeMessage.getMessage(10080)
    this.code = 10080
    this.exceptionHandler(ex)
  }
}

/**
 * refresh token 获取失败
 */
export class RefreshException extends HttpException {
  constructor (ex) {
    super()
    this.status = 401
    this.message = CodeMessage.getMessage(10100)
    this.code = 10100
    this.exceptionHandler(ex)
  }
}

/**
 * 文件体积过大
 */
export class FileTooLargeException extends HttpException {
  constructor (ex) {
    super()
    this.status = 413
    this.message = CodeMessage.getMessage(10110)
    this.code = 10110
    this.exceptionHandler(ex)
  }
}

/**
 * 文件数量过多
 */
export class FileTooManyException extends HttpException {
  constructor (ex) {
    super()
    this.status = 413
    this.message = CodeMessage.getMessage(10120)
    this.code = 10120
    this.exceptionHandler(ex)
  }
}

/**
 * 文件扩展名不符合规范
 */
export class FileExtensionException extends HttpException {
  constructor (ex) {
    super()
    this.status = 406
    this.message = CodeMessage.getMessage(10130)
    this.code = 10130
    this.exceptionHandler(ex)
  }
}

/**
 * 请求过于频繁，请稍后重试
 */
export class LimitException extends HttpException {
  constructor (ex) {
    super()
    this.status = 401
    this.message = CodeMessage.getMessage(10140)
    this.code = 10140
    this.exceptionHandler(ex)
  }
}

export default HttpException
