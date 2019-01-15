import React, { Component } from 'react'
import CInput from '../../src/index'
const testList = [
    'abc',
    'ceshi',
    'ceshi123',
    'ceshi223',
    'ceshi334',
    "ce'shi",
    "ce'shi123",
    "ce'shi is test",
    "ce'shi123 is test123",
    "ce'shi'123",
    'ceshi223',
    'ceshi334',
    '测shi',
    '测试',
    '测试123',
    '测试ceshi',
    '测试test',
    'test',
    'test123'
]
class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            userInput: '',
            original: [],
            optimized: [],
            optimizedValue: 123
        }
    }

    inputChange = (type) => {
        return (event) => {
            let value = event.target.value
            if (value) {
                this.setState({
                    [type]: testList.filter((item) => {
                        return (item.indexOf(value) !== -1)
                    })
                })
            }
        }
    }

    renderResult = (type) => {
        return <ul>
            {this.state[type].map((item, index) => {
                return <li key={index}>{item}</li>
            })}
        </ul>
    }

    onChange = (value) => {
        this.setState({
            optimizedValue: value
        });
    }

    changeValue = () => {
        this.setState({
            optimizedValue: 233
        })
    }

    render() {
        const {
            optimizedValue
        } = this.state
        return (
            <div className='content'>
                <header>
                    <h1>The difference of searching with react-composition-input</h1>
                    <p>Try to type '测试' in these two input fields.</p>
                </header>
                <div id='container'>
                    <div className='part original-part'>
                        <h1>Original search input</h1>
                        <input type='text' onChange={this.inputChange('original')} />
                        {this.renderResult('original')}
                    </div>
                    <div className='part optimized-part'>
                        <h1>Optimized search input</h1>
                        <CInput value={optimizedValue} onChange={this.onChange} onInputChange={this.inputChange('optimized')} />
                        <button onClick={this.changeValue}>change Value</button>
                        {this.renderResult('optimized')}
                    </div>
                </div>
            </div>
        )
    }
}

export default App