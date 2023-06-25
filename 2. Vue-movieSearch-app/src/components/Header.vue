<template>
  <header>
    <Logo />
    <!-- 클릭할 버튼을 만드는데 navigations 배열을 불러와서 name으로 생성 -->
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <!-- router-link 이용해 꺼내온 배열에서 href 주소부분을 :to로 연결 -->
        <router-link
          :to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link">
          {{ nav.name }}
        </router-link>
      </div>
    </div>
    <div
      class="user"
      @click="toAbout">
      <img
        src="https://avatars.githubusercontent.com/u/121005861?v=4"
        alt="KIMJIHOON" />
    </div>
  </header>
</template> 

<script>
import Logo from '~/components/Logo'
import { mapState } from 'vuex'

export default {

  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/tt4520988',
          path: /^\/movie/ //정규표현식 /movie로 시작하는 단어
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  methods: {
    isMatch(path) {
      if(!path) {
        return false
      }
      console.log(this.$route)
      return path.test(this.$route.fullPath)
    },
    toAbout() {
      this.$router.push('/about')
    }
  },
  computed: {
    ...mapState('about', [
      'image',
      'name'
    ])
  },
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/main';

header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%;
    }
  }
  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>