Class형 React 기준
`componentDidMount` -> 컴포넌트가 첫 렌더링 된 후
`componentDidUpdate` -> 리렌더링 후
`componentWillUnmount` -> 컴포넌트가 제거되기 직전

hooks에서는 lifeCycle이 존재하지 않음
이와 유사한 기능을 하기 위해서 useEffect를 사용해야 함
