import KoaRouter from 'koa-router'
import { UrlValidator } from '../validator'
import ZhihuDao from '../dao/ZhihuDao'

const zhihuApi = new KoaRouter({
  prefix: '/zhihu',
})

zhihuApi.get('/', async ctx => {
  const v = await new UrlValidator().validate(ctx)
  const { url } = v.get('query')
  const res = await new ZhihuDao(url).getArticle()
  ctx.json(res)
})

export default zhihuApi
