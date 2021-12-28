const React = require('react');
const {Component} = React;

const WordRelay = () =>{
    const [word, setWord] = React.useState('안녕')
    const [value, setValue] = React.useState()
    const [result, setResult] = React.useState()

    const onRefInput = React.useRef(null)

    const onSubmitForm = (e) =>{
        e.preventDefault();
        if(word[word.length-1] === value[0]){
            setResult("정답")
            setValue('')
            setWord(value)
        }
        else{
            setResult("오답")
            setValue('')
        }
        onRefInput.current.focus()
    };


    const onChangeInput = (e) =>{
        setValue(e.target.value)
    };



     return (
         <>
            <div>{word}</div>
            <form onSubmit = {onSubmitForm}>
                <input ref={onRefInput} value={value} onChange={onChangeInput}/>
                <button>입력해줘</button>
            </form>
            <div>{result}</div>
         </>
     )
}

module.exports = WordRelay