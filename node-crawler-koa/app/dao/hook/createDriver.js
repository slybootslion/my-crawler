import { Builder } from 'selenium-webdriver'

export const creatDriver = async () => {
  return new Builder().forBrowser('chrome').build()
}

export const openChrome = async url => {
  const driver = await creatDriver()
  await driver.get(url)
  return driver
}
