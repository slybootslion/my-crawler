import { openChrome } from './hook/createDriver'
import { By } from 'selenium-webdriver'

class JuejinDao {
  constructor (url) {
    this.url = url
    this.driver = null
    this.data = null
  }

  async getBlog () {
    const url = this.url
    await this.initDriver(url)
    if (this.driver) await this.getContent()
    await this.driver.quit()
    return this.data
  }

  async initDriver (url) {
    this.driver = await openChrome(url)
    await this.driver.sleep(1000)
  }

  async getContent () {
    this.data = {}
    await this.findArticleTitle()
    await this.getContentHtml()
  }

  async findArticleTitle () {
    this.data.title = await this.driver.findElement(By.className('article-title')).getAttribute('innerText')
  }

  async getContentHtml () {
    this.data.content = await this.driver.findElement(By.className('article-content')).getAttribute('innerHTML')
  }
}

export default JuejinDao
