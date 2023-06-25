import { createStore } from 'vuex'
import movie from './movie'
import about from './about'

// 각 스토어에 연결
export default createStore({
  modules: {
    movie,
    about
  }
})