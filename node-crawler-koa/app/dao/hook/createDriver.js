import { Builder } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'

export const creatDriver = async () => {
  const opts = new Options()
  return new Builder().setChromeOptions(opts.headless()).forBrowser('chrome').build()
}

export const openChrome = async url => {
  const driver = await creatDriver()
  await driver.get(url)
  return driver
}
