import http from '@/api/http'

class WeChatApi {
  private prefix: string

  constructor () {
    this.prefix = '/wechat'
  }

  getWeChat (url: string) {
    return http({
      url: `${this.prefix}`,
      params: {
        url,
      },
    })
  }
}

export default new WeChatApi()
