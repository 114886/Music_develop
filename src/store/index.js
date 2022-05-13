import router from '../router'
import { createStore } from 'vuex'
import { setTokenTime } from '../plugins/auth'
import { loginApi } from "../api/login";
import music from './music';
import search from './search';
import video from './video';

const store = createStore({
  state: {
    musicId: JSON.parse(sessionStorage.getItem('musicId')) || undefined,
    isPlay: false,
    userprofile: JSON.parse(sessionStorage.getItem('userprofile')) || undefined,
    token: localStorage.getItem('token') || undefined,
    durationNum: 0,
    ComparisonList: JSON.parse(sessionStorage.getItem('ComparisonList')) || {},
    panduanindex: 1
  },
  mutations: {
    changepanduanindex(state, val) {
      state.panduanindex = val
    },
    changeComparisonList(state, value) {
      state.ComparisonList = value
    },
    getDurationNum(state, value) {
      state.durationNum = value
    },
    changeIsPlay(state, value) {
      state.isPlay = value
    },
    getMusicId(state, id) {
      state.musicId = id
      sessionStorage.setItem('musicId', JSON.stringify(id))
      router.push(`/musiclist/${id}`)
    },
    setToken(state, res) {
      // console.log(res);
      state.token = res.token
      localStorage.setItem('token', res.token)
      state.userprofile = res.profile
      if (res.account) {
        state.userprofile.userId = res.account.id
      }
      sessionStorage.setItem('userprofile', JSON.stringify(res.profile))
    },
  },
  actions: {
    login({ commit }, form) {
      return new Promise((resolve, reject) => {
        loginApi(form).then(res => {
          commit('setToken', res)
          setTokenTime()
          router.replace('/')
          window.location.reload()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout({ commit }) {
      commit('setToken', '')
      localStorage.clear()
      sessionStorage.clear()
      router.replace('/')
      window.location.reload()
    }
  },
  modules: {
    music, search, video
  }
})

export default store
