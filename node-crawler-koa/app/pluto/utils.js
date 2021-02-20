import fs from 'fs'
import lodash from 'lodash'

const Utils = {}

// 获取文件夹下所有文件名
function getFiles (dir) {
  let res = []
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const name = dir + '/' + file
    if (fs.statSync(name).isDirectory()) {
      const tmp = getFiles(name)
      res = res.concat(tmp)
    } else {
      res.push(name)
    }
  }
  return res
}

function unsets (obj, props) {
  props.forEach(prop => {
    lodash.unset(obj, prop)
  })
}

// 下划线转换驼峰
function toHump (name) {
  return name.replace(/_(\w)/g, (_, letter) => {
    return letter.toUpperCase()
  })
}

// 驼峰转换下划线
function toLine (name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

/**
 * 获得实例的所有字段名
 * @param obj 实例
 * @param option 参数项
 */
function getAllFieldNames (obj, option) {
  let keys = Reflect.ownKeys(obj)
  return prefixAndFilter(keys, option)
}

/**
 * 获取一个实例的所有方法
 * @param obj 对象实例
 * @param option 参数
 */
function getAllMethodNames (obj, option) {
  let methods = new Set()
  // tslint:disable-next-line:no-conditional-assignment
  while ((obj = Reflect.getPrototypeOf(obj))) {
    let keys = Reflect.ownKeys(obj)
    keys.forEach(k => methods.add(k))
  }
  let keys = Array.from(methods.values())
  return prefixAndFilter(keys, option)
}

function prefixAndFilter (keys, option) {
  option &&
  option.prefix &&
  (keys = keys.filter(key => key.toString().startsWith(option.prefix)))
  option && option.filter && (keys = keys.filter(option.filter))
  return keys
}

Utils.getFiles = getFiles
Utils.unsets = unsets
Utils.toHump = toHump
Utils.toLine = toLine
Utils.getAllFieldNames = getAllFieldNames
Utils.getAllMethodNames = getAllMethodNames

export default Utils
