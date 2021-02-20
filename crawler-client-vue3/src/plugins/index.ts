import initElementPlus from './element-plus'
import { App } from 'vue'
import './style/reset.scss'
import './style/public.scss'

export default function initPlugin (app: App) {
  initElementPlus(app)
}
