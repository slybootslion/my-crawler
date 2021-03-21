import KoaRouter from 'koa-router'
import { UrlValidator } from '../validator'
import BcyDao from '../dao/BcyDao'
import { PwdValidator } from '../validator/bcy'

const bcyApi = new KoaRouter({
  prefix: '/bcy',
})

bcyApi.get('/', async ctx => {
  const v = await new UrlValidator().validate(ctx)
  const { url } = v.get('query')
  const res = await new BcyDao(url).getXiaoJieJie()
  ctx.json(res)
})

bcyApi.post('/', async ctx => {
  const v = await new PwdValidator().validate(ctx)
  const { password } = v.get('body')
  ctx.json({ password })
})

export default bcyApi
