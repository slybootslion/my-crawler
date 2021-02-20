import KoaRouter from 'koa-router'
import { UrlValidator } from '../validator'
import BcyDao from '../dao/BcyDao'

const bcyApi = new KoaRouter({
  prefix: '/bcy',
})

bcyApi.get('/', async ctx => {
  const v = await new UrlValidator().validate(ctx)
  const { url } = v.get('query')
  const res = await new BcyDao(url).getXiaoJieJie()
  ctx.json(res)
})

export default bcyApi
