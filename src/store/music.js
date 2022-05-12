import { getLyric } from "../api/music";

export default {
  namespaced: true,
  state: {
    playlist: [], // 播放列表
    playCurrentIndex: undefined, //当前播放索引
    lyric: [],
    currentTime: 0,
    intervalId: 0
  },
  getters: {
    MusicLyric(state) {
      let arr = state.lyric.map((item) => {
        let min = parseInt(item.slice(1, 3))
        let sec = parseInt(item.slice(4, 6))
        let mill = parseInt(item.slice(7, 10))
        return {
          min,
          sec,
          mill,
          lyric: item.slice(10, item.length),
          context: item,
          time: mill + sec * 1000 + min * 60 * 1000 - 200
        }
      });
      arr.forEach((item, i) => {
        if (i == arr.length - 1) {
          item.pre = 9999
        } else {
          item.pre = arr[i + 1].time
        }
      });
      return arr
    }
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
    },
    changeMusicLyric(state, value) {
      state.lyric = value
    },
    setCurrentTime(state, value) {
      state.currentTime = value
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
    },
    getMusicLyric({ commit }, params) {
      // 获取歌词
      getLyric(params).then((res) => {
        // console.log(res.lrc.lyric);
        let musicLyric = res.lrc.lyric.split(/\n/gis);
        // console.log(musicLyric);
        commit('changeMusicLyric', musicLyric)
      });
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