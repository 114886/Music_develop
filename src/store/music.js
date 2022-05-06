
export default {
  namespaced: true,
  state: {
    playlist: [], // 播放列表
    playCurrentIndex: 0 //当前播放索引
  },
  mutations: {
    setPlaylist(state, value) {
      state.playlist = value
    }
  },
  actions: {
    
  }
}
