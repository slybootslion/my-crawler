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


/*
cat << EOF > /etc/yum.repos.d/google-chrome.repo
[google-chrome]
name=google-chrome
baseurl=http://dl.google.com/linux/chrome/rpm/stable/x86_64
enabled=1
gpgcheck=1
gpgkey=https://dl.google.com/linux/linux_signing_key.pub
EOF
* */
