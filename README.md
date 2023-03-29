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

## 클래스와 스타일 바인딩

Vue.js에서는 데이터 바인딩을 사용하여 요소의 클래스와 스타일을 동적으로 조작할 수 있습니다.

```jsx
<template>
  <h1
    :class="{ active: isActive }"
    @click="activate">
    Hello?!({{ isActive }})
  </h1>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    activate() {
      this.isActive = true
    }
  }
}
</script>

<style scoped>
  .active {
    color: red;
    font-weight: bold;
  }
</style>
```

Vue.js에서 클래스 바인딩을 사용하면 요소의 클래스를 동적으로 조작할 수 있다

위의 예제에서는 `:class="{ active: isActive }"` 를 사용하여 컴포넌트의 데이터 속성인 isActive 의 값에 따라 h1 요소에 클래스를 추가하고 있다

active 클래스가 isActive 값이 true 일 때 추가되며, 이 속성은 스코프 CSS 스타일에 의해 스타일링됨

클래스 바인딩을 사용하면 동적으로 클래스를 추가하거나 제거할 수 있으며, Vue.js에서는 객체, 배열 또는 객체와 배열의 조합을 사용하여 클래스를 조작할 수 있다

객체를 사용하면 클래스 이름과 값을 매핑할 수 있으며, 배열을 사용하면 클래스 이름을 조건부로 추가할 수 있다

```jsx
<template>
  <h1
    :style="[fontStyle, backgroundStyle]"
    @click="changeStyle">
    Hello?!
  </h1>
</template>

<script>
export default {
  data() {
    return {
      fontStyle: {
        color: 'orange',
        fontSize: '30px'
      },
      backgroundStyle: {
        backgroundColor: 'black'
      }
    }
  },
  methods: {
    changeStyle() {
      this.fontStyle.color = 'red'
      this.fontStyle.fontSize = '50px'
    }
  }
}
</script>
```

Vue.js에서 스타일 바인딩을 사용하면 요소의 스타일을 동적으로 조작할 수 있다

위의 예제에서는 `:style="[fontStyle, backgroundStyle]"` 를 사용하여 컴포넌트의 데이터 속성인 fontStyle과 backgroundStyle 의 값을 h1 요소의 스타일 속성에 추가하고 있다

fontStyle과 backgroundStyle 모두 자바스크립트 객체이며, h1 요소의 스타일 속성에 추가할 수 있는 스타일 속성의 이름과 값을 매핑하는 키-값 쌍으로 구성

스타일 바인딩을 사용하면 동적으로 스타일 속성을 추가하거나 제거할 수 있으며, Vue.js에서는 객체, 배열 또는 객체와 배열의 조합을 사용하여 스타일 속성을 조작할 수 있다

객체를 사용하면 스타일 속성의 이름과 값을 매핑할 수 있으며, 배열을 사용하면 스타일 속성의 값을 조건부로 추가할 수 있다

위 코드에서는 클릭 이벤트에 응답하여 changeStyle() 메소드가 호출되고 있으며, 이 메소드는 fontStyle의 color와 fontSize 속성을 변경하여 h1 요소의 스타일을 업데이트

```jsx
<template>
  <button @click="handler()">
    Click me!
  </button>
  <h1 v-show="isShow"> 
    Hello?!
  </h1>
  <h1 v-if="isShow">
    Hello!!
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
    }
  }
}
</script>
```

Vue.js에서는 조건부 렌더링을 사용하여 요소를 동적으로 표시하거나 숨길 수 있다

`v-show` 디렉티브를 사용하면 요소를 표시하거나 숨길 수 있으며, `v-if` 디렉티브를 사용하면 요소를 동적으로 추가하거나 제거할 수 있다

`v-show` 디렉티브는 요소를 숨기지만 실제 DOM에서 요소를 유지하며, `v-if` 디렉티브는 요소를 제거한다

또한, `v-show` 디렉티브는 `v-if` 디렉티브보다 더 경제적으로 사용할 수 있지만, 빈번한 업데이트에는 `v-if` 디렉티브를 사용하는 것이 좋음