## 라이프 사이클

```js
export default {
  data() {
    return {
      count: 2
    }
  },
  beforeCreate() { // 컴포넌트가 생성되기 전
    console.log('Before Create!', this.count)
  },
  created() { // 컴포넌트가 생성된 직후에 연결
    console.log('Created!', this.count)
  },
  beforeMount() { // HTML 연결되기 전
    console.log("Before Mount!")
    console.log(console.log(document.querySelector('h1')))
  },
  mounted() {
    console.log('Mounted') // 연결이 되고 난 직후
    console.log(document.querySelector('h1'))
  }
}
```
라이프사이클 메소드는 beforeCreate, created, beforeMount, mounted 총 4개가 있으며, 각각 컴포넌트의 라이프사이클에 따라 호출

beforeCreate 메소드는 컴포넌트가 생성되기 전에 호출되며, 

created 메소드는 컴포넌트가 생성된 직후에 호출

beforeMount 메소드는 컴포넌트가 DOM에 마운트되기 전에 호출되며, 

mounted 메소드는 컴포넌트가 DOM에 마운트된 직후에 호출

## 컴포넌트 템플릿

```js
<template>
  <h1 
    :[attr]="'active'"
    @[event]="add">
    {{ msg }}
  </h1>
</template>

<script>
export default {
  data() {
    return {
      msg: 'active',
      attr: 'class',
      event: 'click'
    }
  },
  methods: {
    add() {
      this.msg += '!'
    }
  }
}
</script>

<style scoped>
  .active {
    color: royalblue;
    font-size: 100px;
  }
</style>

```

이 템플릿은 동적 속성 및 이벤트 리스너를 사용하며, v-bind 및 v-on 디렉티브를 사용하여 데이터 속성이 속성 및 이벤트 리스너에 바인딩

포넌트에는 스코프 CSS 스타일도 있습니다.

- v-bind 디렉티브: 약어인 ":" 를 사용하여 데이터 속성을 DOM 속성에 바인딩
    
    위의 코드에서는 :[attr]="'active'" 를 사용하여 컴포넌트의 데이터 속성인 attr을 h1 DOM 요소의 class 속성에 바인딩하고 있다
    
- v-on 디렉티브: 약어인 "@" 를 사용하여 이벤트 리스너를 추가
    
    위의 코드에서는 @[event]="add" 를 사용하여 컴포넌트의 데이터 속성인 event 를 h1 DOM 요소의 click 이벤트에 연결하고 있으며, 이때 add() 메소드가 호출
    
- 스코프 CSS: scoped 속성을 사용하여 컴포넌트에 스코프 CSS를 적용
    
    위의 코드에서는 .active 클래스를 선언하고 h1 요소에 적용하고 있다

## Computed

```jsx
<template>
  <button @scroll="add">
    ADD
  </button>
  <h1>{{ reversedMessage }}</h1>
  <h1>{{ reversedMessage }}</h1>
  <h1>{{ reversedMessage }}</h1>
  <h1>{{ reversedMessage }}</h1>
</template>

<script>
export default {
  data() {
    return {
      // Getter, Setter
      msg: 'Hello Computed!'
    }
  },
  computed: {
    // Getter
    // reversedMessage() {
    //   return this.msg.split('').reverse().join('')
    // }
    // Getter, Setter
    reversedMessage: {
      get() {
        return this.msg.split('').reverse().join('')
      },
      set(newValue) {
        this.msg = newValue
      }
    }
  },
  methods: {
    add() {
      this.msg += '!?'
    }
  }
}
</script>
```

computed 속성은 Vue.js의 기능 중 하나로, 컴포넌트 내 다른 속성들의 상태를 기반으로 속성을 정의

이 속성은 의존하는 속성 중 어떤 것이 변경되면 자동으로 업데이트 

예시에는 `msg` 데이터 속성의 메시지를 뒤집는 `reversedMessage` computed 속성이 정의되어 있음

computed 속성은 의존하는 속성을 업데이트할 수 있는 setter를 가질 수도 있음

위 코드에서는 `reversedMessage` computed 속성을 정의하고 있음

이 속성은 `msg` 데이터 속성의 값을 뒤집어 반환

computed 속성은 일반적으로 getter 함수만 가지고 있지만, 이 예제에서는 `reversedMessage` computed 속성이 읽기와 쓰기 모두 가능하도록 getter와 setter 함수를 모두 정의하고 있음

`reversedMessage` 속성을 읽을 때는 `get()` 함수가 호출되며, 쓸 때는 `set()` 함수가 호출