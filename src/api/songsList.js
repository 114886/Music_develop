import http from '../plugins/http.js'

// 获取精品歌单第一首作为顶尖推荐
export function getTopOneSong() {
  let params = {
    limit: 1
  }
  return http.get('/top/playlist/highquality', params)
}

// 获取最热的歌单
export function getHotSongs(params) {
  const pam = JSON.parse(JSON.stringify(params))
  pam.offset = (pam.offset - 1) * pam.limit
  return http.get('/top/playlist', pam)
}

// 热门歌单分类
export function getHotMusicPag() {
  return http.get('/playlist/hot')
}




