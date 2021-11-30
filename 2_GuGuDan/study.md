변하는 데이터들은 state로 관리한다.

JS문법들은 따로 class의 function으로 관리

기본적으로 Component들은 <div></div>로 감싸야 된다
하지만 추 후 html로 볼 때 불필요한 <div>가 생기므로 
`<></>`로 감싸는 방법을 사용할 수 있음
<React.Fragment></React.Fragment>로 감싸는 것 또한 가능

setState시 이전값과 갱신될 새로운 값에 대하여 명확히 하기 위해
setState((prevState) => {
    return(
        state1: prevState.state1 + 1
        state2: 3 
    )
})
이런식으로 이전 state를 현재 state의 갱신을 위한 값으로 가져올 수 있음
이렇게 할 경우 JS의 비동기식처리에 유리해짐

html의 dom에 직접 접근하기위해서 ref={(c) => this.component1}
이런식으로 지정해준 후
this.component1.focus()이런식으로 추후 사용할 수 있다

this.setState하면 렌더링을 다시 하게 된다.
함수 같은 부분 또한 다시 불러오게 된다
따라서 함수와 같은 부분은 script쪽으로 따로 빼는것이 옳다.