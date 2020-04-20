import request from './request'

const api = {
  // 登录
  login(data) {
    return request('/admin/login/login', data)
  }
}
export default api