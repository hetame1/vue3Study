<template>
  <button @click="handler">
    Click me!
  </button>
  <ul>
    <li
      v-for="{ id, name } in newFruits"
      :key="id">
      {{ name }}-{{ id }}
    </li>
  </ul>
</template>

<script>
// 고유한 형태의 아이디를 만듬
import shortid from 'shortid'

export default {
  data() {
    return {
      fruits: ['Apple', 'Banana', 'Cherry']
    }
  },
  computed: {
    newFruits() {
      return this.fruits.map(fruit => ({
          id: shortid.generate(),
          name: fruit,
        })
      )
    }  
  },
  methods: {
    handler() {
      this.fruits.push('Oragne')
    }
  }
}
</script>