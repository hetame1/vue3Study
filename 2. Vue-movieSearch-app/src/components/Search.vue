<template>
  <div class="container">
    <!-- 부트스트랩 form-control을 이용해 검색창을 만드는데 v-model을 통해 양방향 데이터바인딩  -->
    <!-- 기본 입력값을 placeholder로 설정해주고 @keyup.enter를 통해 엔터를 입력했을 때 apply함수 실행 -->
    <input
      class="form-control"
      v-model="title"
      type="text"
      placeholder="Search for Moives, Series & more"
      @keyup.enter="apply" />

    <!-- 필터를 만들기 -->
    <div class="selects">
      <!-- filters 배열에서 filter를 하나씩 불러오는데 name을 통해 'type'은 type으로 'number'은 number으로 'year'은 year으로 양방향 데이터바인딩 함 -->
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <!-- 연도의 기본 값은 All Years -->
        <option
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <!-- 옵션을 통해 필터에 넣을 값을 아이템 배열을 통해 넣음 -->
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>

    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>

export default {
  data() {

    // 데이터들과 필터 배열
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30, 40]
        },
        {
          name: 'year',
          items: (() => {
            const years = []
            // 현재 년도 부터 1985년까지 배열에 저장
            const thisYear = new Date().getFullYear()
            for (let index = thisYear; index >= 1985; index--) {
              years.push(index)
            }
            return years
          })()
        }
      ]
    }
  },

  methods: {
    async apply() {
      // store에 있는 movie에 searchMovies라는 액션에 값을 전달
      this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year 
      })
    }
  }
}

</script>

<style lang="scss" scoped>
@import '~/scss/main';
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
  }
  @include media-breakpoint-down(lg) {
    display: block;
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>