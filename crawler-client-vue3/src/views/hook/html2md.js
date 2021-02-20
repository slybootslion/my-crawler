import { Sitdown } from 'sitdown'
import { applyWechatRule } from '@sitdown/wechat'
import { applyJuejinRule } from '@sitdown/juejin'
import { applyZhihuRule } from '@sitdown/zhihu'

function html2md (html, type = 'wechat') {
  const sitdown = new Sitdown({
    keepFilter: ['style'],
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
  })

  switch (type) {
    case 'wechat':
      sitdown.use(applyWechatRule)
      break
    case 'juejin':
      sitdown.use(applyJuejinRule)
      break
    case 'zhihu':
      sitdown.use(applyZhihuRule)
      break
    default:
      sitdown.use(applyWechatRule)
  }

  return sitdown.HTMLToMD(html)
}

export default html2md
