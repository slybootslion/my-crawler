import KoaRouter from 'koa-router'
import { UrlValidator } from '../validator'
import WeChatDao from '../dao/WeChatDao'

const juejinApi = new KoaRouter({
  prefix: '/wechat',
})

juejinApi.get('/', async ctx => {
  const v = await new UrlValidator().validate(ctx)
  const { url } = v.get('query')
  const res = await new WeChatDao(url).getArticle()
  ctx.json(res)
})

export default juejinApi
