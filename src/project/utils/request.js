import axios from 'axios'
// create an axios instance
const service = axios.create({
  baseURL: '/retail', // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // config.headers.common['Authorization'] = token
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  res => {
    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 200) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.status === 401) {
        // to re-login
        location.href = "manage/login";
      }
      return Promise.reject(new Error(res.messsage || 'Error'))
    } else {
      let data = res.data;
      if (data.status !== 200) {
        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (data.status === 401) {
          // to re-login
          location.href = "/manage/login";
        }
        return Promise.reject(new Error(res.messsage || 'Error'))
      }
      return data;
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
