import { createRouter, createWebHistory } from 'vue-router'

const routerHistory = createWebHistory()
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
          path:'/musiclist/:id',
          component: () => import('../components/Music.vue'),
        },
        {
          path: '/search/:id',
          component: () => import('../views/Search/searchMusic.vue'),
        },
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
