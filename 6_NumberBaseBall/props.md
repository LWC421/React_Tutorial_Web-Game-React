hooks방식에서 `자식 component`를 생성할 때 자식 component는

const Component = ({prop1, prop2}) => {
    return(
        <div>{prop1}</div>
        <div>{prop2}</div>
    )
}
와 같이 하고 이를 export까지 할려고 하면

export default Component = ({prop1, prop2}) => {
    ...
}
과 같이 작성한다.

그 후 `부모 Component`에서는
{List1.map( (item, index) => {
    return(
        <Object1 prop1={item} prop2={index}/>
    )
})}
와 같이 자식 Component를 생성할 수 있다
이렇게 자식 Component를 생성할 때 key를 지정해주어야 함.
-> key는 React가 Virtual Dom을 생성하고 관리할 때 변화점을 인지하기 위한 것임

-----------

react는 list를 state로 사용할 때 spread문법을 사용해서 새로운 배열을 만드는 방식으로 해야 됨
push를 사용할 경우 이전과 동일한 state로 판별하기 때문에 새롭게 render하지 않음
따라서 spread문법을 사용해서 새로운 배열을 생성하여야 render를 새롭게 해준다