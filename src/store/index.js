import router from '../router'
import { createStore } from 'vuex'
import { setTokenTime } from '../plugins/auth'
import { loginApi } from "../api/login";

const store = createStore({
  state: {
    musicId: JSON.parse(sessionStorage.getItem('musicId')) || undefined,
    userprofile: JSON.parse(sessionStorage.getItem('userprofile')) || undefined,
    token: localStorage.getItem('token') || undefined,
  },
  mutations: {
    getMusicId(state, id) {
      state.musicId = id
      sessionStorage.setItem('musicId', JSON.stringify(id))
      router.push(`/musiclist/${id}`)
    },
    setToken(state, res) {
      state.token = res.token
      localStorage.setItem('token', res.token)
      state.userprofile = res.profile
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
    }
  }
})

export default store
