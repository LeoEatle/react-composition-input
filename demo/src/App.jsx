import React, { Component } from 'react'
import CInput from '../../src/index'
const testList = [
    'abc',
    'ceshi',
    'ceshi123',
    'ceshi223',
    'ceshi334',
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
        console.log('CInput', CInput)
        this.state = {
            userInput: '',
            original: [],
            optimized: []
        }
    }

    inputChange = (type) => {
        return (event) => {
            let value = event.target.value
            this.setState({
                [type]: testList.filter((item) => {
                    return (item.indexOf(value) !== -1)
                })
            })
        }
    }

    renderResult = (type) => {
        return <ul>
            {this.state[type].map((item, index) => {
                return <li key={index}>{item}</li>
            })}
        </ul>
    }

    render() {
        return (
            <div id='root'>
                <div className='original-part'>
                    <input type='text' onChange={this.inputChange('original')} />
                    {this.renderResult('original')}
                </div>
                <div className='optimized-part'>
                    <CInput onInputChange={this.inputChange('optimized')} />
                    {this.renderResult('optimized')}
                </div>
            </div>
        )
    }
}

export default App