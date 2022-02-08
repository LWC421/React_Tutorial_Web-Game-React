dispatch를 일일히 자식 컴포넌트에 넘기기에는 힘듬
-> createContext를 이용

createContext를 이용하여 자식 컴포넌트에서 접근할 수 있게

const TestContext = createContext({})
로 context생성 후

부모 컴포넌트의 return문 안에서
return(
  <TestContext.Provider value={{ state1: state.state1, dispatch}}>
    <Component1>
    <Component2>
  </TestContext.Provider>
)
와 같이 사용

그런데 그냥 이렇게 사용하면 rendering될때마다 값을 셋팅하기때문에 성능이슈 발생
->
const value = useMemo( () => ({ state1: state.state1, dispatch}), [state.state1])
과 같이 useMemo를 사용한 후
return(
  <TestContext.Provider value={value}>
    <Component1>
    <Component2>
  </TestContext.Provider>
)
를 사용하자