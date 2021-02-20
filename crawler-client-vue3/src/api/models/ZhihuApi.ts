import http from '@/api/http'

class ZhihuApi {
  private prefix: string

  constructor () {
    this.prefix = '/zhihu'
  }

  getZhihu (url: string) {
    return http({
      url: `${this.prefix}/`,
      params: { url },
    })
  }
}

export default new ZhihuApi()
