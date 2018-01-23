/**
 * 封装请求
 */
// import 'es6-promise/auto'
import axios from 'axios'


function defaults () {
  return {
    baseURL: `/api/`,
    headers: {
      // 'Content-Type': 'application/json',
    }
  }
}

function fetch () {
  let customOptions = [].pop.apply(arguments)
  let options = defaults();
  if (customOptions && customOptions.headers) {
    options.headers = customOptions.headers
  }

  let method = [].shift.apply(arguments);

  return new Promise((resolve, reject) => {
    axios[method](...arguments, options).then((data)=>{

      resolve(data.data)

    }).catch((err) => {
      alert('网络错误，请刷新重试');
      reject(err)

    })
  })
}

export const get = (url, options) => {
  return fetch('get', url, options)
}

export const post = (url, data, options) => {
  return fetch('post', url, data, options)
}

export const patch = (url, data, options) => {
  return fetch('patch', url, data, options)
}

export const put = (url, data, options) => {
  return fetch('put', url, data, options)
}

export const del = (url, options) => {
  return fetch('delete', url, options)
}

