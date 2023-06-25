## 라이프 사이클

라이프사이클 메소드는 beforeCreate, created, beforeMount, mounted 총 4개가 있으며, 각각 컴포넌트의 라이프사이클에 따라 호출

`beforeCreate` 메소드는 컴포넌트가 생성되기 전에 호출

`created` 메소드는 컴포넌트가 생성된 직후에 호출

`beforeMount` 메소드는 컴포넌트가 DOM에 마운트되기 전에 호출

`mounted` 메소드는 컴포넌트가 DOM에 마운트된 직후에 호출

## HTML 출력
```jsx
<p> 텍스트 보간법: {{ Html }} </p>
data() {
  return {
    Html: "hello"
  }
}
```
---
### 속성 바인딩

HTML 속성 내에 이중중괄호를 사용할 수 없기 때문에
```jsx
<div v-bind:style> Hello </div>
// bind는 단축할 수 있음
<div :style="스타일"> Hello </div>
data() {
  return {
    스타일: 'color : blue'
  }
}
```
v-bind를 사용해야하는데 v-bind는 축약하여 :만 사용해도 됨

---
## Computed

- 컴퓨티드 속성은 템플릿의 데이터 표현을 더 직관적이고 간결하게 도와주는 속성

- 템플릿안에 계산식이 많아지면 가독성이 안좋아짐

- 컴퓨티드안에 있는 계산된 데이터는 캐싱이라는 기능이 있기 때문에 한번 연산을 해놓으면 반복적으로 연산을 하지 않음

```jsx
<template>
  <h1>{{ reversedMessage }}</h1>
  <h1>{{ reversedMessage }}</h1>
</template>

computed: {
  reversedMessage() {
    return this.msg.split('').reverse().join('')
  }
}
```
- Computed는 기본적으로 getter를 이용해 값을 가져온다
- 필요의 경우 setter도 이용할 수 있음
---
## Watch

- 대부분의 경우 computed 속성이 더 적합하지만 사용자가 만든 감시자가 필요한 경우에 사용

- Vue 인스턴스의 특정 프로퍼티가 변경될때 지정한 콜백함수가 실행되는 기능 

- 특정한 데이터가 변경되는 것을 감시해서 추가적인 로직을 만들때 사용
```jsx
watch: {
  reversedMessage(newValue /* 변경된 값 */) {
    console.log('reversedMessage:', newValue)
  }
}
```
---
## 클래스와 스타일 바인딩

### 객체로 바인딩 하기
```jsx
<div :class="{ active: isActive }"></div>
```
- isActive 데이터 속성의 의해 클래스 존재 여부가 결정
- isActive가 true 이면 클래스="active"
- 여러 클래스를 넣는것도 가능

예를들어
```jsx
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }">
</div>
```
isActive가 true이고 hasError도 true이면
<div class="static active text-dange"></div>

### 배열로 바인딩 하기

```jsx
<div :class="[activeClass, errorClass]"></div>

data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```
이런식으로 배열을 사용하면 결과는
<div class="active text-danger"></div>

---

## 조건부 렌더링

```jsx
<h1 v-if="type === A">A</h1>
<h1 v-else-if="type === B "> B</h1>
<h1 v-else>C</h1>
```
Vue.js에서는 조건부 렌더링을 사용하여 요소를 동적으로 표시하거나 숨길 수 있다

v-show 디렉티브를 사용하면 요소를 표시하거나 숨길 수 있으며, v-if 디렉티브를 사용하면 요소를 동적으로 추가하거나 제거할 수 있다

v-show 디렉티브는 요소를 숨기지만 실제 DOM에서 요소를 유지하며, v-if 디렉티브는 요소를 제거한다

또한, v-show 디렉티브는 v-if 디렉티브보다 더 경제적으로 사용할 수 있지만, 빈번한 업데이트에는 v-if 디렉티브를 사용하는 것이 좋음

## 리스트 렌더링
```jsx
<ul>
  <li 
    v-for="fruit in fruits" 
    :key="fruit">
    {{ fruit }}
  </li>
</ul>

data() {
  return {
    fruits: ['Apple', 'Banana', 'Cherry']
  }
}
```

v-for을 이용하여 배열을 리스트로 렌더링할 수 있음
key는 Vue의 각각의 노드에 고유한 ID를 지정해 줄 때 사용
Vue는 감시 중인 변이 메소드를 래핑하면(배열의 데이터를 변경하면) 화면에 출력이 갱신되는 반응성을 갖고 있음

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

## 이벤트 핸들링

일반적으로 v-on 디렉티브는 단축 문법으로 @ 기호를 사용하며,
DOM 이벤트를 수신하고 트리거될 때, 사전 정의해둔 JavaScript 코드를 실행할 수 있음
`v-on:click="handler"` 또는 줄여서 `@click="handler"`와 같이 사용합

- 인라인에 직접 작성하는 것은 좋지 않음
- 메서드를 따로 만들어서 사용하는것이 좋음

```jsx
<button @click="handler/* (인수값을 넣으면 밑에서 활용을 할수있음) */">Click</button>

methods: {
  handler(event) {
    console.log(event)
  }
}
```

### 이벤트 수식어
```jsx
  .prevent // 기본 동작을 방지
  .once // 단 한번만 실행
  `이벤트 버블링`
  .stopPropagation // 이벤트 버블링을 통해서 부모요소를 클릭하는 걸 방지함
  .stop // 위와 같음
  .capture // 반대로 동작하도록 만듬
  .self // 자기 자신의 영역을 정확히 클릭했을때만 동작
  .passive // 동작과 로직처리를 독립적으로 작동시켜 부하를 줄일수 있음
```
수식어를 체이닝 형태로 붙여서 여러개를 사용할 수 있음


### 키 수식어
```jsx
<input
  type="text"
  @keydown.enter/* 케밥케이스로 작성한 키 */ ="handler" />

methods: {
  handler(event) {
    if (event.key === 'Enter') {
      console.log('Enter!!')
    }
  }
}
```
인풋에 엔터를 입력하면 Enter 출력

### 폼 입력 바인딩
```jsx
<h1> {{ msg }} </h1>
<input
  type="text"
  v-model="msg" />

data() {
    return {
      msg: 'Hello World!'
    }
  }
```
- 양방향 데이터 바인딩
입력한 값을 msg로 바로 적용시켜줌

# 컴포넌트

## Prop

- Prop은 부모-자식 관계의 Components 관계에서 실행된다
  - 부모 컴포넌트 안의 자식 `html태그 안에` 넘겨줄 prop을 선언한다
  - 자식 컴포넌트의 script안에 `props안에 데이터 타입`(String, Array, Object..)을 명시해야하고, 디폴트값을 설정할 수 있다

- 부모 컴포넌트에서 보내준 prop 데이터를 `자식 컴포넌트에서 직접 변형`이 불가능하다

### slot

- slot은 부모 컴포넌트에서 자식 컴포넌트의 엘리먼트를 지정할때 사용

```jsx

// 부모 컴포넌트
<ChildComponent>
  <button>버튼</button>
</ChildComponent>

import ChildComponent from "자식 컴포넌트"

// 자식 컴포넌트
<div>
  <!--부모에서 정의한 '버튼'이 위치합니다 -->
  <slot></slot>
</div>
```

- slot에 이름을 붙여 사용 순서를 정해주는것도 가능

```jsx
// 부모 컴포넌트
<template>
  <MyBtn>
    <template #icon>
      <span>(B)</span>
    </template>
    <template #text>
      <span>Banana</span>
    </template>
  </MyBtn>
</template>

// 자식 컴포넌트
<template>
  <div class="btn">
    <slot name="icon"></slot>
    <slot name="text"></slot>
  </div>
</template>
```

## 속성 상속

- 부모 컴포넌트의 html 요소에 `class` 속성으로 값을 입력하면 자식 컴포넌트에 `class`이름의
  클래스에 상속이 됨

```jsx
App.vue(부모 컴포넌트)
<MyBtn class="orosy" style="color: red">Banana</MyBtn>

MyBtn.vue(자식 컴포넌트)
<template>
  <div class="btn"> // 최상위 요소(Root Element)
    <slot></slot>
  </div>
</template>

```

- 유의해야 할 점은 자식 컴포넌트안에 `template` 태그 안에 최상위 요소가 2개 이상있는 경우
  어디에 상속이 되어야하는지 판단할 수 없기 때문에 두 요소 모두 상속이 되지 않음

`inheritAttrs: false` 어떠한 속성들을 상속하지 않겠다 

그러나 위와 같이 속성 상속의 옵션을 사용하지 않겠다고 명시한 경우, 필요하다면 개별적으로
속성 상속을 사용할 수 있습니다

`$attrs`을 사용하면 됩니다

```jsx
<template>
  <div class="btn">
    <slot></slot>
  </div>
  <h1 :class="$attrs.class" :style="$attrs.style"></h1> // 속성 상속
</template>
```
- 하지만 이러한 경우 속성을 모두 입력해주어야 하기 때문에 부모 컴포넌트의 모든 속성을
  상속하는 방법도 있으며, 이는
```jsx
<h1 v-bind="$attrs"></h1>
```
를 사용하면 된다 ( 약어 금지 )

### Emit

- `emit`은 다른 `component`에게 `현재 component`의 `event`나 `data`를 전달하기 위해 사용

```jsx
// 부모 컴포넌트
<MyBtn @jihoon="log">Banana</MyBtn>

methods: {
  log() {
    console.log('Click!!')
  }
}

// 자식 컴포넌트

<div class="btn">
  <slot></slot>
</div>
<h1 @click="$emit('jihoon')">A</h1>

<script>
export default {
  emits: [
    'jihoon'
  ]
}
</script>
```

### provide, inject

부모에서 작성한 데이터 값을 자식컴포넌트가 사용하려면 prop을 이용해야 하는데,
자식 밑에 자식이 계속 생길수록 prop을 계속 작성해야 한다.

그것을 다른 방법으로 사용할수 있는데 그때 사용하는 것이 provide와 inject이다

부모컴포넌트에 provide를 이용해 값을 저장하고 자식컴포넌트에서 inject를 이용해 값을 쓰면 된다

```jsx
// 부모 컴포넌트
data() {
  return {
    message: 'Hello World'
  }
},
provide() {
  return {
    msg: this.message
  }
}

// 자식 컴포넌트 
inject: ['msg']
```

**주의 해야 할 점**
- 반응성을 유지할 수가 없음
- 이것을 해결할 수 있는 방법이 있는데 computed를 이용하면됨

```jsx
import { computed } from 'vue'

provide() {
  return {
    msg: computed(() => this.message)
  }
}

// 출력할 때 msg.value 를 이용해야 함
```

### Refs

원래 자바스크립트에서 <h1>내용</h1> 내용을 추출하려면
document.querySelector('h1') 을 이용하거나 id를 추가해 검색을 한다
vue에서는 이걸 간단하게 하는걸 지원하는데

```jsx
<h1 ref="hello">
  Hello World!
</h1>

mounted() {
  const h1El = this.$refs.hello
  console.log(h1El.textContent)
}
```

## 컴포지션

코드를 가독성 좋게 바꿔줌
```jsx
data() {
  return {
    count: 0
  }
},
methods: {
  increase() {
    this.count += 1
  }
}

// 이 코드를 컴포지션형태로 바꾸면
setup() {
  let count = ref(0) // ref를 써야 값이 반응성을 가짐
  function increase() {
    count.value += 1
  }

  return {
    count,
    increase
  }
}

```