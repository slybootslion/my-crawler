const prefix = 'https://'
const reg = /^\w+[^\s]+(\.[^\s]+){1,}$/

export default function checkUrl (urlVal) {
  if (!urlVal.startsWith('http')) {
    urlVal = prefix + urlVal
  }
  return reg.test(urlVal)
}
