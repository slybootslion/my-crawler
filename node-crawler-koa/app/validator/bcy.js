import { LinValidator, Rule } from '../pluto'

class UrlValidator extends LinValidator {
  constructor () {
    super()
    this.url = new Rule('isURL', '必须是“标肿”的网址')
  }
}

class PwdValidator extends LinValidator {
  constructor () {
    super()
    this.password = [
      new Rule(
        'matches',
        '密码需要6-32个数字字母组合',
        /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/
      ),
    ]
  }
}

export {
  UrlValidator,
  PwdValidator,
}
