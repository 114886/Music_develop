import http from '../plugins/http.js'

export function getAlltoplist() {
  return http.get('/toplist')
}





