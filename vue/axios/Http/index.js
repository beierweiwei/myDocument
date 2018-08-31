import axios from 'axios'
import defaultConfig from './config'
import { CODE_MSG } from '@/config/constance'
import { LOGIN_URL } from '@/Api/API'
// import VueRouter from 'vue-router'
const Http = axios.create({...defaultConfig})

export const HandleResponse = (res) => {
  // 加载状态修改为完成状态 
  if (res.config.reqConfig && res.config.reqConfig.loading) {
    res.config.reqConfig.loading = false
  }
  // 没有res.data可能被重定向
  if (!(res && res.status)) return
  if (res.status >= 200 && res.status < 400) {
    console.log(res)
    let msg = CODE_MSG[res.status] || CODE_MSG[res.config.method + '+']
    if (!(res.config.reqConfig && res.config.reqConfig.autoError) && msg) {
      window.$community.$Message.success(msg)
    }
    /* 304状态码，没有返回数据 */
    return res.status == 304 ? {status:'success'} : res.data
  }
}

export const handleError = (error) => {
  // Object.keys(error).map((k) => console.log(k + ':',error[k]))
  if (!error || !error.response) return window.$community.$Message.error(CODE_MSG['def'])
  let env = window.$community.$store.state.sysInfo.ENV || 'production'
  if (error.config.reqConfig && error.config.reqConfig.loading) {
    // 加载状态修改为完成状态
    error.config.reqConfig.loading = false
  }
  if (!(error.config && error.config.reqConfig && error.config.reqConfig.autoError)) {
    if (window.$community) {
       let message = CODE_MSG[error.response && error.response.status] ||  CODE_MSG[error.config.method + '-'] || CODE_MSG['def']
       window.$community.$Message.error(message)
    }
    return false
  }
  else return Promise.reject(error)
}

Http.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/json'
  config.reqConfig = (config.data && config.data.reqConfig) || (config.params && config.params.reqConfig) || config.reqConfig
  if (config.data && config.data.reqConfig !== undefined) delete config.data.reqConfig
  if (config.params && config.params.reqConfig !== undefined) delete config.params.reqConfig
  if (config.reqConfig && config.reqConfig.loading !== undefined) config.reqConfig.loading = true
  return config
})
/* disable no-unused-vars */
Http.interceptors.response.use(HandleResponse, handleError)
export default Http
