import lodash from 'lodash'
import Utils from '../utils'
import HttpException from '../error/http-exception'

const json = app => {
  /**
   * hide 表示想要隐藏的属性
   */
  app.context.json = function (obj, tra = false, hide = []) {
    this.type = 'application/json'
    Utils.unsets(obj, hide)
    let data = Object.create(null)
    if (obj instanceof HttpException) {
      if (tra) transform(obj, data)
      lodash.set(data, 'request', `${this.method} ${this.req.url}`)
      this.status = obj.status
    } else {
      data = obj
    }
    this.body = JSON.stringify(data)
  }
}
// 驼峰转换下划线
function transform (obj, data) {
  const fields = lodash.get(obj, 'fields', [])
  fields.forEach(field => {
    data[Utils.toLine(field)] = lodash.get(obj, field)
  })
}

export default json
