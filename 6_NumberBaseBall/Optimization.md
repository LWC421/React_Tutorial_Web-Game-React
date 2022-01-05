shouldComponentUpdate(nextProps, nextState, nextContext){
    if (this.state.result !== nextState.result){
        return true
    } 
    return false
}

`React`는 state가 변경되면 다시 Render된다.
따라서 Render하는 조건을 위와 같이 명시적으로 줘야 이러한 현상을 방지할 수 있다.
위의 예시는 Class Component에서의 예시

Component대신 `PureComponent`를 사용하면 ShouldComponentUpdate(SCU)가 적용된 Component이다
-> 대신 배열과 Object일 경우 잘 동작 안 할 수도 있다.
-> Spread문법을 사용하자


--------------
Hooks를 사용할 때는 memo를 사용하여서 Component를 memo로 감싸자.