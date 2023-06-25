<template>
  <!-- true 값이여야만 밑에 실행 -->
  <section v-if="hasFruit">
    <h1>Fruits</h1>
    <ul>
      <!-- fruits 배열에 값을 fruit로 하나씩 넣기 -->
      <li
        v-for="fruit in fruits" 
        :key="fruit">
        {{ fruit }}
      </li>
    </ul>
  </section>
  <section v-if="hasFruit">
    <h1>Reverse Fruits</h1>
    <ul>
      <li 
        v-for="fruit in reverseFruits"
        :key="fruit">
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fruits: [
        'Apple', 'Banana', 'Cherry'
      ]
    }
  },
  computed: {
    // fruits 배열이 1개 이상이면 true 반환
    hasFruit() {
      return this.fruits.length > 0
    },
    reverseFruits() {
      return this.fruits.map(fruit => {
        // 'Apple' => ['A','p','p','l','e']
        // => ['e','l','p','p','A'] => 'elppA'
        return fruit.split('').reverse().join('')
      })
    }
  }
}
</script>