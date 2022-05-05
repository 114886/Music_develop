import http from '../plugins/http.js'

export function loginApi(params) {
  return http.get('/login/cellphone', params)
}
