hooks에서 state가 아닌 값들을 사용할려면 `useRef()`를 사용한다
useRef의 값을 바꿀때는 render가 다시 실행되지 않는다
-> 따라서 값이 바뀌어도 다시 render하지 않는 값은 useRef를 사용한다

`useRef`는 DOM을 Select할 때도 사용하지만 이렇게 값을 저장하는 용도로도 사용한다

`ref객체.current`로 값을 접근하여 사용 및 수정

