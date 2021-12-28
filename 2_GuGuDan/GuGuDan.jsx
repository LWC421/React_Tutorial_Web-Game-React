const React = require('react');
const { useState, useRef } = React;

class GuGuDan extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first : Math.ceil(Math.random() * 9),
            second : Math.ceil(Math.random() * 9),
            value : '',
            result : '',
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(parseInt(this.state.value) === this.state.first * this.state.second){
            this.setState((prevState) => {
                return{
                    result: `${prevState.first} * ${prevState.second} = ${prevState.value}는 정답`,
                    first: Math.ceil(Math.random() * 9),
                    second: Math.ceil(Math.random() * 9),
                    value: '',
                }
            });
        }
        else{
            this.setState({
                result: `${this.state.first} * ${this.state.second} = ${this.state.value}는 오답`,
                value: '',
            })
        }
        this.input.focus()
    }

    onChange = (e) => {
        this.setState({value: e.target.value})
    }

    input;  //input element용 Ref
    onRefInput = (c) => {this.input = c}

    render(){
        return (
            // <div>
            <>
                <div>{this.state.first} * {this.state.second} = ?</div>                        
                <form onSubmit={this.onSubmit}>
                    <input ref={this.onRefInput} 
                        type="number" 
                        value={this.state.value}
                        onChange={this.onChange}/>
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </>
            // </div>
        );
    }
}

module.exports = GuGuDan;