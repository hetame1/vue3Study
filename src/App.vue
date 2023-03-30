<template>
  <div
    class="Hi"
    @scroll="changeColor()">
  </div>
  <h1 v-show="isShow"> 
    Hello?!
  </h1>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      count: 0
    }
  },
  methods: {
    handler() {
      this.isShow = !this.isShow
      this.count += 1
    },
    changeColor() {
      S
    }
  }
}
</script>
