import { LinValidator, Rule } from '../pluto'

class UrlValidator extends LinValidator {
  constructor () {
    super()
    this.url = new Rule('isURL', '必须是“标肿”的网址')
  }
}

export {
  UrlValidator
}
