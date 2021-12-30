import React, { useState, useRef } from 'react';

//숫자를 랜덤하게 뽑는다
const getNumbers = () => {

}

export const NumberBaseBall = () =>{
    const [result, setResult] = useState()
    const [value, setValue] = useState()
    const [answer, setAnswer] = useState(getNumbers())
    const [tries, setTreis] = useState()


    const onSubmitForm = () => {
        
    }
    const onChangeInput = () =>{

    }

    return(
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput}/>
            </form>
            <div>시도 횟수 : {tries.length}</div>
            <ul>
                {tries.map( (item, index) => (
                    <li key={item}>{item}</li>
                    )
                )}
            </ul>
        </>    
    )
}