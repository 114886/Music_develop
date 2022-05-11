import store from '../store/index'
import router from '.'
import { ElMessage } from 'element-plus'

const BlackList = ['/recommend']

router.beforeEach((to, from, next) => {
  if (store.state.userprofile != undefined) {
    next()
  } else {
    if (BlackList.includes(to.path)) {
      ElMessage({
        message: '您未登录，请登录后查看',
        type: 'warning',
      })
    } else {
      next()
    }
  }
})
