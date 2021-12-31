import React, { useState } from 'react';
import Try from './Try'

//숫자를 랜덤하게 뽑는다
const getNumbers = () => {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const array = []
    for(let i=0; i <4; i+=1){
        const chosen = candidate.splice(Math.floor(Math.random()* (9-i)), 1)[0]
        array.push(chosen)
    }

    return array
}

export const NumberBaseBall = () =>{
    const [result, setResult] = useState()
    const [value, setValue] = useState()
    const [answer, setAnswer] = useState(getNumbers())
    const [tries, setTries] = useState([])


    const onSubmitForm = (e) => {
        e.preventDefault()
        if (value === answer.join('')){
            setResult("홈런")
            setTries((prevTries) => {return [...prevTries, {try: value, result:"홈런"}]} )
            // setTries([...tries, {try: value, result:"홈런"}])
            alert("재시작")
            setValue("")
            setAnswer(getNumbers())
            setTries([])
        }
        else{
            const answerArray = value.split('').map( (item) => parseInt(v))
            let strike = 0
            let ball = 0
            if (tries.length >= 9){
                setResult(`10번 틀렸습니다 답은 : ${answer.join(',')}`)
                alert("재시작")
                setValue("")
                setAnswer(getNumbers())
                setTries([])
            }
            else{
                for (let i=0; i <4; i+=1){
                    if(answerArray[i] === answer[i]){
                        strike += 1
                    }
                    else if(answer.includes(answerArray[i])){
                        ball += 1
                    }
                }
                setTries((prevTries) => {return [...prevTries, {try: value, result:"홈런"}]} )
                // setTries([...tries, {try: value, result:`${strike} 스트라이크 ${ball} 볼 입니다`}])
            }
        }
    }
    const onChangeInput = (e) =>{
        setValue(e.target.value)
    }

    return(
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput}/>
            </form>
            <div>시도 횟수 : {tries.length}</div>
            <ul>
                {/*이렇게 하면 JSX식 주석*/}
                {tries.map( (item, index) => {
                    return(
                        <Try key={`${index+1}차 시도`} tryInfo={item}/>
                    )
                })}
            </ul>
        </>    
    )
}
