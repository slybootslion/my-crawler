import { Success } from '../error/http-exception'

const success = app => {
  app.context.success = function (ex) {
    this.type = 'application/json'
    const success = new Success(ex)
    let data = {
      code: success.code,
      message: success.message,
      request: `${this.method} ${this.req.url}`,
    }
    this.status = success.status
    this.body = JSON.stringify(data)
  }
}

export default success
