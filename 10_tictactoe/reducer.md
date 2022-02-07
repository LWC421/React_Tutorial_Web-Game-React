useState가 많아지면 관리가 힘들다
-> useReducer를 이용하여 한번에 관리하자

useReducer에서는
dispatch를 이용

dispatch를 이용하여 Action과 값을 전달
disaptch({type: "TYPE_NAME", stateName: "Value"})
미래를 위해서 type은 const로 직접 지정해서하자.

dispatch에서 행한 행위는 reducer에서 처리한다.
const reducer = (state, action) => {
    switch(action.type){
        case 'SET_WINNER':
            return {
                ...state,
                winner: action.winner
            }
    }
}
이런식으로 처리를 한다.
이때 case에 따라 return을 해야하고, return을 하지 않고 값을 바로 바꿔주면 안됨,
항상 state들을 스프레드문법으로 복사하고 바뀌는 부분을 정의

그런데 useReducer의 경우 비동기처리임
따라서 sideEffect가 필요할 경우 useEffect를 사용해서 구현해야 한다.