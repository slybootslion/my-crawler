import axios, { AxiosRequestConfig, Method } from 'axios'
import { ElMessage } from 'element-plus'
import { MessageType } from 'element-plus/es/el-message/src/types'

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  baseURL: 'http://localhost:39004/',
  timeout: Infinity, // 请求超时时间设置
  validateStatus (status: number) {
    return status >= 200 && status < 510
  },
  method: 'get',
}

function showMessage (message: string, type: MessageType = 'error', duration = 1200) {
  ElMessage({ message, type, duration })
}

// 定义接口
interface PendingType {
  url?: string;
  method?: Method;
  params?: unknown;
  data?: unknown;
  cancel: Function;
}

// 取消重复请求
const pending: Array<PendingType> = []
const CancelToken = axios.CancelToken
// axios 实例
// 创建请求实例
const instanceAxios = axios.create(config)

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key
    const list: PendingType = pending[key]
    // 当前请求在数组中存在时执行函数体
    if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试')
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}

instanceAxios.interceptors.request.use(config => {
  removePending(config)

  config.cancelToken = new CancelToken(cancel => {
    pending.push({ url: config.url, method: config.method, params: config.params, data: config.data, cancel: cancel })
  })

  if (!config.url) {
    showMessage('请求必须有url')
    throw new Error('axiosInterceptors')
  }
  if (!config.method) {
    throw new Error('axiosInterceptors')
  }
  config.method = config.method?.toLowerCase() as Method

  // 判断是否包含文件类型
  if (config.method === 'post') {
    let hasFile = false
    Object.keys(config.data).forEach(key => {
      if (typeof config.data[key] === 'object') {
        const item = config.data[key]
        if (item instanceof FileList ||
          item instanceof File ||
          item instanceof Blob) {
          hasFile = true
        }
      }
    })

    // 检测到存在文件使用FormData提交数据
    if (hasFile) {
      const formData = new FormData()
      Reflect.ownKeys(config.data).forEach(key => formData.append(key.toString(), config.data[key]))
      config.data = formData
    }
  }

  return config
}, err => Promise.reject(err))

function handleServerActiveException (code: number, message: string) {
  return new Promise((resolve, reject) => {
    // token异常，没有权限，需要重新登录

    if (message) {
      if (Array.isArray(message)) message = message[0]
      showMessage(message)
    }
    reject(message)
  })
}

instanceAxios.interceptors.response.use(
  async res => {
    removePending(res.config)
    const { code, message } = res.data
    // 没有异常
    if (res.status.toString().charAt(0) === '2') return res.data
    // 全局异常处理
    // 服务器主动抛出的异常
    return handleServerActiveException(code, message)
  },
  error => {
    // 服务器非主动异常
    // 没有返回错误内容
    if (!error.response) {
      showMessage('服务器错误')
    } else if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      showMessage('请求超时')
    }
    return Promise.reject(error)
  },
)

export default instanceAxios
