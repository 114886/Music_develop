import http from '../plugins/http.js'

export function GetFavoriteColumn(params) {
  return http.get('/topic/sublist', params)
}

export function CollectOrCancel(params) {
  return http.get('/playlist/subscribe', params)
}
