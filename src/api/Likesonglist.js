import http from '../plugins/http.js'

export function addLikeList(params) {
  return http.get('/playlist/create', params)
}

export function addSongToList(params) {
  return http.get('/playlist/tracks', params)
}

export function getUserLike(params) {
  return http.get('/user/playlist', params)
}
