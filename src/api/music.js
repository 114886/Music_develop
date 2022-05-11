import http from '../plugins/http.js'

export function getMusicList(params) {
  return http.get('/playlist/detail', params)
}

export function getMusic(params) {
  return http.get('/song/detail', params)
}

export function getLyric(params) {
  return http.get('/lyric', params)
}




