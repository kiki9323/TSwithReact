### !, as~

```ts
this.hostElement = document.getElementById('app')! as HTMLDivElement;

// `!` : null이 아님을 확실히 알고 있으므로 !를 추가한다.
// `as ~` : getElementById이 뭘 반환할지 모르기 때문에 형변형(casting)
```

---

### 데코레이터로 바인딩 문제 해결하기

```js
// .bind(this) 혹은 화살표 함수로 바인딩문제를 해결할 수 있다.
private configure() {
  this.element.addEventListener('submit', this.submitHanlder.bind(this));
}
```

```js
// 데코레이터 방법도 있다.
// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// 이벤드핸들러의 콜백함수를 정의한 곳에서 아래와 같이 사용
@autobind;
```

### 튜플 정의하는 방법

튜플 : 요소의 개수와 타입이 고정된 튜플 (TS)

- 요구 사항: 정확히 세 가지 타입의 x개의 요소로 된 배열을 리턴하려고 한다.

```ts
private gatherUserInput(): [string, string, number] | void {
  // ...
}
```
