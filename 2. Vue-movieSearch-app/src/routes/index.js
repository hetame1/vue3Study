import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import Movie from './Movie'
import NotFound from './NotFound'

export default createRouter({
  // Hash, History 모드
  // #을 붙여서 사이트에 접속
  history: createWebHashHistory(),
  // pages 구분
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    } ,
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
    
  ]
})