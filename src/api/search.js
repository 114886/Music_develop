import http from '../plugins/http.js'

export function searchMusic(params) {
  const pam = JSON.parse(JSON.stringify(params))
  pam.offset = (pam.offset - 1) * pam.limit
  // console.log(pam);
  return http.get('/cloudsearch', pam)
}

export function searchHot() {
  return http.get('/search/hot')
}