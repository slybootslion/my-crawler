import { config } from './pluto'
import { createApp } from './app'

const run = async () => {
  const app = await createApp()
  const port = config.getItem('port')
  const NODE_ENV = config.getItem('NODE_ENV')
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}, NODE_ENV: ${NODE_ENV}`)
  })
}

// 启动应用
run()
