
import http from '../plugins/http.js'

export function getNewMv(area) { // 最新mv
  let params = {
    limit: 8,
    area: area
  }
  return http.get('/mv/first', params)
}

export function getWangYiMv() { //网易出品mv
  let params = {
    limit: 8
  }
  return http.get('/mv/exclusive/rcmd', params)
}

export function getRecommendMv() { // 推荐mv
  return http.get('/personalized/mv')
}

export function getAllMv(params) { // 全部mv
  return http.get('/mv/all', params)
}

export function getMvDetail(id) { // mv详情
  let params = {
    mvid: id
  }
  return http.get('/mv/detail', params)
}

export function getMvAddress(id) { // mv播放地址
  let params = {
    id: id
  }
  return http.get('/mv/url', params)
}


