import { useState, useEffect } from 'react'

// hook : Function형 컴포넌트가 Class형 컴포넌트에서만 쓸 수 있던
//        state와 life cycle을 활용할 수 있도록 만든 라이브러리
//        useState와 useEffect를 사용함

// 디바운스 : 검색 창에서 연관 검색어를 표현할 때 주로 사용하는 기능으로
//            입력을 받다가 일정 시간 대기하면 마지막에 입력된 내용을 바탕으로
//            서버 요청을 하는 방법
export const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] // Only re-call effect if value or delay changes
  )

  return debouncedValue
}
