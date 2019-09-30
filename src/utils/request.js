import axios from 'axios'
// import router from '../router/index'
// import { MessageBox, Message } from 'element-ui'
// import { getToken } from '@/utils/auth'
// import baseURL from '../baseurl.config.js'
// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const token = '' // getToken()
    const officeId = '' // getToken('zhzx_web_officeId')
    if (token) {
      config.headers.common['Authorization'] = token
      config.headers.common['officeId'] = officeId
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 200) {
      if (res.status !== 408) {
        // Message({
        //   message: res.message || 'Error',
        //   type: 'error',
        //   duration: 5 * 1000
        // })
      }

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.status === 408) {
        // to re-login
        // MessageBox.confirm('登录超时，请重新登录！', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   router.push({ name: 'Login' })
        // })
      }
      return Promise.reject(new Error(res.messsage || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // if (error.status) {
    //   Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    // }
    return Promise.reject(error)
  }
)

export default service
