import router from '../router'

export default {
  namespaced: true,
  state: {
    vid: sessionStorage.getItem('vid') || undefined,
  },
  mutations: {
    getVid(state, id) {
      state.vid = id
      sessionStorage.setItem('vid', id)
      router.push(`/video/${id}`)
    },
  },
  actions: {

  }
}
