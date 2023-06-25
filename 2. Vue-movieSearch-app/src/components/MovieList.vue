<template>
  <div class="container">
    <!-- 영화에 목록이 없는 경우 no-result 클래스 추가 -->
    <!-- 있으면 밑에 div 실행 -->
    <div
      :class="{ 'no-result': !movies.length }"
      class="inner">
      <loader v-if="loading" />
      <div
        v-if="message"
        class="message">
        {{ message }}
      </div>
      <div
        v-else
        class="movies">
        <MovieItem
          v-for="movie in movies"
          :key="movie.imdbID"
          :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MovieItem'
import Loader from '~/components/Loader'
import { mapState } from 'vuex'

export default {
  components: {
    MovieItem,
    Loader
  },
  computed: {
    // 맵스테이트를 이용해 movie 모듈의 상태값을 가져옴
    ...mapState('movie', [
      'movies',
      'message',
      'loading'
    ])
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size: 20px;
  }
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>