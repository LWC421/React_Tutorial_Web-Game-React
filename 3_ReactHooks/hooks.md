기존의 class에서 state쓰듯이 
functional component에서도 state를 쓰기 위한 것이 hooks
React에서는 hooks사용을 권장 -> functional component로 작성하는 것을 추천

기존의 ref쓰던 방식에서 React.useRef(초기값)을 사용하여서 Ref를 지정
const componentRef = React.useRef(null)
<component ref={componentRef}>
와 같이 사용 후
focus를 주고자 할 경우
`componentRef.current.focus()`
를 사용

그런데 hooks의 경우 하나의 함수가 component이므로 함수가 재 실행되므로 class대비 느려질 수 있다.
JSX문법에서 html에서 id, class를 사용하듯이 사용X
id는 동일하지만 class는 className을 사용해야함

이렇게 html의 속성들에서 사용하지 못하는 것으로
for대신 htmlFor을 사용

hooks사용할 때도 useState에서 object를 넣어줘서 class와 유사하게 사용할 수도 있음
그런데 이렇게 하면 setState시 매우 귀찮으므로 그냥 따로따로 state관리하는게 나은거 같음

hooks또한
setState((prevState) => {return '원하는 값'})
으로 사용 가능

비동기라서 setState들을 모아서 처리 한 후 렌더링을 다시 한다
-> 비동기의 장점