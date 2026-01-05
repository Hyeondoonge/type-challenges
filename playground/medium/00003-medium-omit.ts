/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #보통 #union #built-in

  ### 질문

  `T`에서 `K` 프로퍼티만 제거해 새로운 오브젝트 타입을 만드는 내장 제네릭 `Omit<T, K>`를 이를 사용하지 않고 구현하세요.

  예시:

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > GitHub에서 보기: https://tsch.js.org/3/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// type MyOmit<T, K> = {
//   [key in keyof T]: T[key]
// } // K에 포함된 key만 제외하고 반환 => K에 포함되지않은 key만 반환

// T vs K 비교 후 두 곳에 없는 key만 반환

// K에 포함되지 않는 key들을 반환 => keyof T extends K ? never : infer U ==> union
type MyExclude<T, U> = T extends U ? never : T

// wrong answer

type t = keyof { readonly name: string }

// keyof T
// type MyOmit<T, K extends keyof T> = {
//   [P in MyExclude<keyof T, K>]: T[P]
// }

// keyword: Key Remapping
// 원본 객체 타입의 key remapping을 통해 modifier까지 보존
// 1. P <- "T"의 key들을 순회
// 2. 필터링, P로부터 K 집합제거
type MyOmit<T, K extends keyof T> = { [P in keyof T as MyExclude<P, K>]: T[P] }

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type omit = MyOmit<Todo1, 'description' | 'completed'> // readonly title X

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

interface Expected3 {
  readonly title: string
}

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/3/answer/ko
  > 정답 보기: https://tsch.js.org/3/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
