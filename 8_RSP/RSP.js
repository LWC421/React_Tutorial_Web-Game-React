import React, { useState, useRef, useEffect } from 'react'

const rspCoords = {
    'rock' : '0',
    'scissors' : '-142px',
    'paper' : '-284px'
}

const scores = {
    'rock' : 1,
    'scissors' : 0,
    'paper' : -1
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find((v) => {
        return v[1] === imgCoord;
    })[0]
}

const RSP = () => {
    const [result, setResult] = useState("")
    const [score, setScore] = useState(0)
    const [imgCoord, setImgCoord] = useState(rspCoords.rock) 

    const interval = useRef()

    useEffect( () => {  //componentDidMount 및 componentDidUpdate 역할
        interval.current = setTimeout(changeHand, 1000)
        return () => {  //componentWillUnmount 역할
            clearTimeout(interval.current)
        }
    }, [imgCoord])

    const changeHand = () => {
        console.log(imgCoord)
        if(imgCoord === rspCoords.rock){
            setImgCoord(rspCoords.scissors)
        }
        else if(imgCoord === rspCoords.scissors){
            setImgCoord(rspCoords.paper)
        }
        else if(imgCoord === rspCoords.paper){
            setImgCoord(rspCoords.rock)
        }
    }

    //이렇게 btn에 onclick리스너를 붙여도 된다.
    //e.preventDefault()같이 필요하면 e를 추가적으로 주면 됨
    const onClickBtn = (choice) => (e) => {
        console.log(choice)
        clearTimeout(interval.current)

        const myScore = scores[choice]
        const cpuScore = scores[computerChoice(imgCoord)]

        const diff = myScore - cpuScore;
        if(diff === 0){
            setResult('Draw')
        }
        else if([-1, 2].includes(diff)){
            setResult("Lose")
            setScore((prevScore) => (prevScore-1))
        }
        else{
            setResult("Win")
            setScore((prevScore) => (prevScore+1))
        }

        setTimeout( () => {
            interval.current = setTimeout(changeHand, 1000)
        }, 2000)
    }

    return (
        <>
            <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}/>
            <div>
                <button id="rock" className="btn" onClick={onClickBtn("rock")}>Rock</button>
                <button id="rock" className="btn" onClick={onClickBtn("scissors")}>Scissors</button>
                <button id="rock" className="btn" onClick={onClickBtn("paper")}>Paper</button>
            </div>
            <div>{result}</div>
            <div>{score}점</div>
        </>
    )
}

export default RSP