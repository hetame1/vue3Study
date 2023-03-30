<template>
  <input
    type="text"
    @keydown.enter="handler" />
</template>

<script>
export default {
  methods: {
    handler() {
      console.log('Enter!!')
    }
  }
}
</script>