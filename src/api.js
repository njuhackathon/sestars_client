import axios from 'axios';

const baseURL = 'http://47.100.97.128:8000/';

function get (path, config) {
  return new Promise((resolve, reject) => {
    axios.get(path, {
      baseURL,
      responseType: 'json',
    }).then(res => {
      if (res.status === 200) {
        if (res.data.success === true) {
          resolve(res.data)
        } else {
          reject(res.data.msg)
        }
      } else {
        reject(`服务器错误: ${res.status}`)
      }
    }).catch(reason => reject(reason))
  })
}

function post (path, data) {
  return new Promise((resolve, reject) => {
    axios.post(path, data, {
      baseURL,
      timeout: 3000,
      responseType: 'json'
    }).then(res => {
      if (res.status === 200) {
        if (res.data.success === true) {
          resolve(res.data)
        } else {
          reject(res.data.msg)
        }
      } else {
        reject(`服务器错误: ${res.status}`)
      }
    }).catch(reason => reject(reason))
  })
}

function put (path, data) {
  return new Promise((resolve, reject) => {
    axios.put(path, data, {
      baseURL,
      timeout: 3000,
      responseType: 'json'
    }).then(res => {
      if (res.status === 200) {
        if (res.data.success === true) {
          resolve(res.data)
        } else {
          reject(res.data.msg)
        }
      } else {
        reject(`服务器错误: ${res.status}`)
      }
    }).catch(reason => reject(reason))
  })
}

function del(path, params) {
  return new Promise((resolve, reject) => {
    axios.delete(path, {
      params,
      baseURL,
      timeout: 3000,
      responseType: 'json'
    }).then(res => {
      if (res.status === 200) {
        if (res.data.success === true) {
          resolve(res.data)
        } else {
          reject(res.data.msg)
        }
      } else {
        reject(`服务器错误: ${res.status}`)
      }
    }).catch(reason => reject(reason))
  })
}

export default {
  get,
  post,
  put,
  del
}
