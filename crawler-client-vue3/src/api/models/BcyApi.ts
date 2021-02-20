import http from '@/api/http'

class BcyApi {
  private prefix: string

  constructor () {
    this.prefix = '/bcy'
  }

  getXiaoJieJie (params: { url: string }) {
    return http({
      url: `${this.prefix}`,
      params,
    })
  }
}

export default new BcyApi()
