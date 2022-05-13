
import http from '../plugins/http.js'

export function getVideoClassification() {
  return http.get('/video/category/list')
}

export function getVideoUnderCategory(params) {
  return http.get('/video/group', params)
}

export function RelatedVideo(id) { // 相关视频
  let params = {
    id: id
  }
  return http.get('/related/allvideo', params)
}

export function VideoDetails(id) { // 视频详情
  let params = {
    id: id
  }
  return http.get('/video/detail', params)
}

export function VideoPlaybackAddress(id) { // 视频播放地址
  let params = {
    id: id
  }
  return http.get('/video/url', params)
}


