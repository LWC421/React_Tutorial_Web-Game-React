import React, { useState, useRef, useEffect, useMemo, useCallback } from 'React'
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
    const [winNumbers, setWinNumbers] = useState(lottoNumbers)
    const [winBalls, setWinBalls] = useState([])
    const lottoNumbers = useMemo(() => {getWinNumbers(), []})
    const [bonus, setBonus] = useState(null)
    const [redo, setRedo] = useState(false)


    const timeouts = useRef([])

    //2번째 인자가 빈 배열이다.
    //ComponentDidMount와 ComponentWillUnmount의 역할

    //2번째 인자가 존재한다.
    //ComponentDidMount와 ComponentDidUpdate 둘 다 수행 및 ComponentWillUnmount
    useEffect(() => {
        for(let i = 0; i < winNumbers.length -1; i++){
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]])
            }, (i+1) * 1000)
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6])
            setRedo(true)
        }, 7000)
        return () => {
            this.timeouts.current.forEach( () => {
                clearTimeout(v)
            })
        }
    }, [timeouts.current])

    const onClickRedo =  useCallback(() => {
        console.log("Clicked Redo")
        setWinNumbers(getWinNumbers)
        setWinBalls([])
        setBonus(null)
        setRedo(false)
        timeouts.current = [];
    })

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