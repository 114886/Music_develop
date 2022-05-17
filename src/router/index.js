import { createRouter, createWebHashHistory } from 'vue-router'

const routerHistory = createWebHashHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      redirect: '/home/findmusic',
      component: () => import('../views/Home.vue'),
      children: [
        {
          path: '/musiclist/:id',
          component: () => import('../components/Music.vue'),
        },
        {
          path: '/video/:id',
          component: () => import('../components/video/Video.vue'),
        },
        {
          path: '/allMv',
          component: () => import('../components/video/AllMv.vue'),
        },
        {
          path: '/mv/:id',
          component: () => import('../components/video/MVplay.vue'),
        },
        {
          path: '/search/:id',
          component: () => import('../views/Search/searchMusic.vue'),
        },
        {
          path: '/recommend',
          component: () => import('../views/Recommend/Recommendedsonglist.vue'),
        },
        {
          path: '/video',
          component: () => import('../views/Videocollection/Video.vue'),
        },
        // {
        //   path: '/shoucang',
        //   component: () => import('../views/Collection/Collection.vue'),
        // },
        {
          path: '/home/findmusic',
          redirect: '/home/findmusic/find',
          component: () => import('../views/FindMusic/FindM.vue'),
          children: [
            {
              path: '/home/findmusic/find',
              component: () => import('../views/FindMusic/Find.vue'),
            },
            {
              path: '/home/findmusic/musicList',
              component: () => import('../views/FindMusic/MusicLIst.vue'),
            },
            {
              path: '/home/findmusic/rankingList',
              component: () => import('../views/FindMusic/RankingList.vue'),
            },
          ]
        }
      ]
    }
  ]
})

export default router;
