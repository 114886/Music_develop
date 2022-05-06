import http from '../plugins/http.js'

//首页轮播
export function getMusicList(params) {
  return http.get('/playlist/detail', params)
}

export function getMusic(params) {
  return http.get('/song/detail', params)
}



