import router from '../router'

export default {
  namespaced: true,
  state: {
    keywords: JSON.parse(sessionStorage.getItem('keywords')) || undefined,
  },
  getters: {
    
  },
  mutations: {
    getKeywords(state, keywords) {
      state.keywords = keywords
      sessionStorage.setItem('keywords', JSON.stringify(keywords))
      router.push(`/search/${keywords}`)
    },
  },
  actions: {
    
  }
}
