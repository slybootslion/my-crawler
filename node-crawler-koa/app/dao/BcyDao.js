import { By, until } from 'selenium-webdriver'
import { creatDriver } from './hook/createDriver'

const findElement = async url => {
  const driver = await creatDriver()
  const urls = []
  await driver.get(url).then(async () => {
    let containers = await driver.wait(until.elementsLocated(By.className('img-wrap-inner')), 2000)
    const len = containers.length
    for (let i = 0; i < len; i++) {
      const item = containers[i]
      const imgElements = await item.findElement(By.css('img'))
      const url = await imgElements.getAttribute('src')
      urls.push(url)
    }
    await driver.quit()
  })

  return urls
}

class BcyDao {
  constructor (data) {
    this.data = data
  }

  async getXiaoJieJie () {
    const url = this.data
    return findElement(url)
  }
}

export default BcyDao
