import { Validator } from 'class-validator'
import lodash from 'lodash'
import validator from 'validator'

/**
 * Validator扩展类
 */
class ExtendedValidator extends Validator {
  /**
   * 检查一个object是否具有某个属性
   * @param obj
   * @param path
   *
   * ```js
   * hasProperty({a:"l"},"a")
   * ```
   */
  hasProperty (obj, path) {
    return lodash.has(obj, path)
  }
  /**
   * 检查一个object的某个属性是否为空
   * @param obj
   * @param path
   *
   * ```js
   * objPropertyIsNotEmpty({ a : { b: "c" }, "a.b" })
   * ```
   */
  objPropertyIsNotEmpty (obj, path) {
    if (!this.hasProperty(obj, path)) {
      return false
    }
    return this.isNotEmpty(lodash.get(obj, path))
  }
  /**
   * 检查一个object的多个属性是否为空
   * @param obj
   * @param paths
   *
   * ```js
   * objPropertiesIsNotEmpty({a: {b:"c", d: "e"}}, ["a.b","a.d"])
   * ```
   */
  objPropertiesIsNotEmpty (obj, paths) {
    for (const path of paths) {
      if (!this.hasProperty(obj, path)) {
        return false
      }
      if (!this.isNotEmpty(lodash.get(obj, path))) {
        return false
      }
    }
    return true
  }
  /**
   * 字符串转int
   * @param input 输入字符串
   * @param radix 精度
   */
  toInt (input, radix) {
    return validator.toInt(input, radix)
  }
  /**
   * 字符串转float
   * @param input 输入字符串
   */
  toFloat (input) {
    return validator.toFloat(input)
  }
  /**
   * 字符串转boolean
   * @param input 输入字符串
   */
  toBoolean (input) {
    return validator.toBoolean(input)
  }
  /**
   * 字符串转Date
   * @param input 输入字符串
   */
  toDate (input) {
    return validator.toDate(input)
  }
  /**
   * 检查字符串是否为float
   * @param str 输入字符串
   * @param options 参数项
   */
  isFloat (str, options) {
    return validator.isFloat(str, options)
  }
  /**
   * 检查number是否为float
   * @param input 输入number
   * @param options 参数项
   */
  isFloat2 (input, options) {
    return validator.isFloat(input + '', options)
  }
  /**
   * 检查字符串是否为int
   * @param str 输入字符串
   * @param options 参数项
   */
  isInt2 (str, options) {
    return validator.isInt(str, options)
  }
  /**
   * 检查number是否为int
   * @param input 输入number
   * @param options 参数项
   */
  isInt3 (input, options) {
    return validator.isInt(input + '', options)
  }
}

/**
 * 全局的校验器
 */
const extendedValidator = new ExtendedValidator()

export {
  ExtendedValidator,
  extendedValidator,
}
