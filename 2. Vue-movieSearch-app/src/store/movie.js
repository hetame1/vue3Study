import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {

  // 해당 js파일이 모듈화되어 사용될 수 있다는 것을 명시적으로 나타냄
  namespaced: true,
  
  // data를 뜻함
  state: () => ({
    movies: [],
    message: 'Search for the movie title!',
    loading: false,
    theMovie: {}
  }),
  // Computed
  getters: {},
  mutations: {
    // 변이 method 
    // 통합적으로 state를 갱신하는 로직
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        // state.movies = payload.movies
        // state.message = payload.message
        // state에 payload에서 받은 데이터들을 할당하는데 이 작업을 forEach문을 이용해 자동화
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  // 비동기 데이터를 수정하는 방식을 제외한 메서드
  actions: {
    async searchMovies({ state, commit }, payload) {
      // loading 값이 true면 밑에 코드 실행 안함
      // 엔터나 검색 버튼 여러번 누르는거 방지
      if (state.loading) return  
    
      // 검색이 실행됐을 때                         
      commit('updateState', {
        message: '',
        loading: true
      })
      try {
        // res 값에 fetchMovie 함수 값
      const res = await _fetchMovie({
        // payload 값 전달, 없는 page만 따로 전달
        ...payload,
        page: 1
      })

      // 불러온 값을 객체구조분해해서 사용
      // 하나는 파스칼케이스 하나는 카멜케이스로 작성되어있는데 이건 omdb에서 제공하는방식
      const { Search, totalResults } = res.data
      console.log(res.data)

      // state에 값을 바로 넣지 못하기 때문에 mutations를 이용해야 함
      commit('updateState', {
        movies: _uniqBy(Search, 'imdbID')
      })

      console.log(totalResults) // 313
      console.log(typeof totalResults) // String
      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10) // 올림처리

      // 추가 요청 전송
      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1) {

          if ( page > (payload.number / 10) ) break
      
          const res = await _fetchMovie({
            // payload 값 전달, 없는 page만 따로 전달
            ...payload,
            page
          })
          const { Search } = res.data
          // movies에 추가적으로 넣어줘야함
          // 그냥 바로 넣으면 덮어씌어버리기 때문에 전개연산자를 통해 기존 데이터를 전개해주고 뒤에 Search를 전개
          commit('updateState', {
            movies: [
              ...state.movies, 
              ..._uniqBy(Search, 'imdbID')]
          })
        }
      }

      } catch (message) {
        // 에러가 발생하게 되면 updateState 변이 메소드를 실행
        commit('updateState', {
          // 초기화
          movies: [],
          // 에러메시지를 활용
          message
        })
        // 검색이 완료되었을 때
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },

    // payload를 통해 id값 전달
    async searchMovieWithID({ state, commit }, payload) {
      if (state.loading) return
      
      commit('updateState', {
        theMovie: {},
        loading: true
      })

      try {
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

// 현재 파일 내부에서만 처리
function _fetchMovie(payload) {
  // payload 값을 객체 구조분해해서 사용
  const { title, type, year, page, id } = payload
  // api_key
  const OMDB_API_KEY = '7035c60c'
  // omdbapi 연결
  // 삼항연산자를 이용해 id 값이 있으면 위에 링크를 통해 개별영화정보를 가져옴
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y${year}&page=${page}`

  // 비동기
  return new Promise((resolve, reject) => {
    axios.get(url)
      // 정상적으로 가져왔을 때 then 실행
      .then(res => {
        // omdbapi에서 문제가 발생해도 then이 실행되는 경우가 있어
        // 조건을 추가해서 추가로 거부해줘야함
        if (res.data.Error) {
          reject(res.data.Error)
        }
        resolve(res)
      })
      // 문제가 발생했을 때 실행
      .catch((err) => {
        reject(err.message)
      })
  })
}