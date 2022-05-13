import router from '../router'

export default {
  namespaced: true,
  state: {
    vid: sessionStorage.getItem('vid') || undefined,
    mvid: sessionStorage.getItem('mvid') || undefined,
    params: JSON.parse(sessionStorage.getItem('mvparams')) || {}
  },
  mutations: {
    getVid(state, id) {
      state.vid = id
      sessionStorage.setItem('vid', id)
      router.push(`/video/${id}`)
    },
    getMVid(state, id) {
      state.mvid = id
      sessionStorage.setItem('mvid', id)
      router.push(`/mv/${id}`)
    },
    getparams(state, val) {
      state.params = val
      sessionStorage.setItem('mvparams', JSON.stringify(val))
      router.push('/allMv')
    }
  },
  actions: {

  }
}
