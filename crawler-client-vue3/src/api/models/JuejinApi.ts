import http from '@/api/http'

class JuejinApi {
  private prefix: string

  constructor () {
    this.prefix = '/juejin'
  }

  getJuejin (url: string) {
    return http({
      url: `${this.prefix}/`,
      params: { url },
    })
  }
}

export default new JuejinApi()
