
export default {
  namespaced: true,
  state: {
    playlist: [], // 播放列表
    playCurrentIndex: 0 //当前播放索引
  },
  mutations: {
    setPlaylist(state, value) {
      state.playlist.push(...value)
    },
    changePlaylist(state, value) {
      state.playlist = [...value]
    },
    setPlayIndex(state, value) {
      state.playCurrentIndex = value
    }
  },
  actions: {
    changePlayList(context, value) {
      for (let i = 0; i < context.state.playlist.length; i++) {
        if (context.state.playlist[i].id === value.id) {
          context.commit('setPlayIndex', i)
          return;
        }
      }
      context.commit('setPlaylist', [value])
    }
  }
}
// {
//   id:1500377533,
//   name:'不要让我后悔',
//   dt: "04:29",
//   al:{
//     name:'出没地带',
//     picUrl:'http://p3.music.126.net/gRMWUKU2ScajuiJDcAdX4Q==/109951165517115227.jpg',
//   },
//   ar:[
//     {
//       name:'孙盛希'
//     }
//   ]
// }