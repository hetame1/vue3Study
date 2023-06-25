<template>
  <h1>{{ message }}</h1>
  <h1>{{ count }}</h1>

  <button @click="increase">
    Click
  </button>

  <input
    type="text"
    v-model="message" />
</template>

<script>

export default {
  data() {
    return {
      message: '',
      count: 0
    }
  },
  methods: {
    increase() {
      this.count++
    }
  }
}
</script>