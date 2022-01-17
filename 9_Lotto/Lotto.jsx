import React, { useState, useRef, useEffect } from 'React'
import Ball from "./Ball"

const getWinNumbers = () => {
    console.log("getWinNumbers")
    const candidate = Array(45).fill().map((v, i) => i+1)
    const shuffle = []
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
    }
    const bonusNumber = shuffle[shuffle.length - 1]
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p-c)
    return [...winNumbers, bonusNumber]
}

const Lotto = () => {
    const [winNumbers, setWinNumbers] = useState(getWinNumbers())
    const [winBalls, setWinBalls] = useState([])
    const [bonus, setBonus] = useState(null)
    const [redo, setRedo] = useState(false)

    const timeouts = useRef()

    const initiialize = () => {
        for(let i = 0; i < winNumbers.length -1; i++){
            timeouts[i].current = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]])
            }, 1000)
        }
        timeouts[6].current = setTimeout(() => {
            setBonus(winNumbers[6])
            setRedo(true)
        }, 7000)
        return () => {
            this.timeouts.forEach( () => {
                clearTimeout(v)
            })
        }
    }

    useEffect(() => {
        initiialize()
    }, [])

    const onClickRedo =  () => {
        setWinNumbers(getWinNumbers)
        setWinBalls([])
        setBonus(null)
        setRedo(false)
    }

    return(
        <>
            <div>당첨 숫자</div>
            <div id="Result">
                {winBalls.map((v) => <Ball key={v} number={v}/>)}
            </div>
            <div>보너스</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}>한번더</button>}
        </>
    )
}

export default Lotto