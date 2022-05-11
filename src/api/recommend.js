import http from '../plugins/http.js'

export function getRecommend() {
  return http.get('/recommend/songs')
}