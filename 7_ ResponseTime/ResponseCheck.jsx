import React, { useState } from 'react'

const ResponseCheck = () =>{
    const [state, setState] = useState('')
    const [message, setMessage] = useState('')
    const [result, setResult] = useState([])

    let timeout
    let startTime
    let endTime

    const onClickScreen = () => {
        if (state === "waiting"){
            setState("ready")
            setMessage("초록색이 되면 클릭하세요")
            timeout = setTimeout(() => {
                setState("now")
                setMessage("지금 클릭")
                startTime = new Date();
            }, Math.floor(Math.random() * 1000 + 2000))
        }
        else if(state === "ready"){
            setState("waiting")
            setMessage("초록색이 된 후에 클릭하세여")
            clearTimeout(timeout)
        }
        else if(state === "now"){
            endTime = new Date();
            setState("waiting")
            setMessage("클릭해서 시작하세요!")
            setResult(prevResult => [...prevResult, endTime-startTime])
        }
    }

    return(
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}>
                    {message}
            </div>
            {result.length === 0 ? 
                null : 
                <div>
                    평균 시간: {result.reduce( (a, c) => a+c) / result.length}ms
                </div>
            }
        </>
    )
}

export default ResponseCheck = ResponseCheck