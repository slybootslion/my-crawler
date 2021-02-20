import KoaRouter from 'koa-router'
import { UrlValidator } from '../validator'
import JuejinDao from '../dao/JuejinDao'

const juejinApi = new KoaRouter({
  prefix: '/juejin',
})

juejinApi.get('/', async ctx => {
  const v = await new UrlValidator().validate(ctx)
  const { url } = v.get('query')
  const res = await new JuejinDao(url).getBlog()
  ctx.json(res)
})

export default juejinApi
