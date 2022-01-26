hooks는 rendering할때마다 함수가 실행되므로 
useMemo를 이용하여 함수의 리턴값을 비교해서 함수가 재 실행되지 않도록 한다

useCallback은 함수 자체를 기억해서 함수가 재실행되지 않도록 한다.
-> 함수의 생성 자체가 재실행되지 않는 다는 것

자식 Component에게 함수를 전달해줘야 할 경우 useCallback을 사용한 함수를 props로 넘겨야한다.
그렇게 해야 자식 Component에서 Rerender을 하지 않는다.

위 두 함수에서 2번째 인자를 넣어 줄 경우,
2번째 인자가 변경 될 때 그 함수가 다시 실행된다.

useEffect사용할 때
ComponentDidUpdate에서만 함수를 실행하고 싶으면
const mounted = useRef(false)
useEffect(() => {
    if(!mounted.current){
        mounted.current = true
    }
    else{
        //원하는 함수 실행
    }
}, [바뀌는 값])
과 같이 사용하면 ComponentDidMount에서는 실행되지 않는다.