import React, { useState, useRef } from 'react'

const ResponseCheck = () =>{
    const [state, setState] = useState('waiting')
    const [message, setMessage] = useState('')
    const [result, setResult] = useState([])

    const timeout = useRef(null)
    const startTime = useRef()
    const endTime = useRef()

    const onClickScreen = () => {
        if (state === "waiting"){
            console.log("Waiting")
            setState("ready")
            setMessage("초록색이 되면 클릭하세요")
            timeout.current = setTimeout(() => {
                setState("now")
                setMessage("지금 클릭")
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000 + 2000) )
        }
        else if(state === "ready"){
            console.log("ready")
            setState("waiting")
            setMessage("초록색이 된 후에 클릭하세여")
            clearTimeout(timeout.current)
        }
        else if(state === "now"){
            console.log("now")
            endTime.current = new Date();
            setState("waiting")
            setMessage("클릭해서 시작하세요!")
            setResult((prevResult) => [...prevResult, endTime.current-startTime.current])
        }
    }

    const renderAverage = () =>{
        return result.length === 0 ? 
            null : 
            <>
                <div>
                    평균 시간: {result.reduce( (a, c) => a+c) / result.length}ms
                </div>
                <button onClick={onReset}>Reset</button>
            </>
    }

    const onReset = () =>{
        setResult([])
    }

    return(
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}>
                    {message}
            </div>
            {renderAverage()}
        </>
    )
}

export default ResponseCheck