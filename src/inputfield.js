import React, {Component} from 'react'

// detect whether it is chrome 
const isChrome = !!window.chrome && !!window.chrome.webstore

class InputField extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            tempInput: this.props.defaultValue || '',
        }
        this.isOnComposition = false
        this.emittedInput = true
    }

    handleInputChange = (event) => {
        console.log('触发input事件' + new Date().getTime() + 'this.emittedInput ' + this.emittedInput)
        let userInputValue = event.target.value
        if (!this.isOnComposition) {
            this.setState({
                tempInput: userInputValue
            })
            event.target.value = userInputValue
            this.props.onInputChange(event)
            this.emittedInput = true
        } else {
            this.setState({
                tempInput: userInputValue,
            })
            this.emittedInput = false
        }
    }


    handleComposition = (event) => {
        console.log('触发composition event', event.type)
        if (event.type === 'compositionstart') {
            this.isOnComposition = true
            this.emittedInput = false
        } else if (event.type === 'compositionend') {
            this.isOnComposition = false
            // fixed for Chrome v53+ and detect all Chrome
            // https://chromium.googlesource.com/chromium/src/+/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/
            // also fixed for the native Apple keyboard which emit input event before composition event
            // subscribe this issue: https://github.com/facebook/react/issues/8683
            if (!this.emittedInput) {
                this.handleInputChange(event)
            }
        }
    }

    render() {
        const {onInputChange, ...restProps} = this.props

        return (
            <input
                type='text'
                ref={(input)=>{this.input = input}}
                value={this.state.tempInput}
                onChange={this.handleInputChange}
                onCompositionStart={this.handleComposition}
                onCompositionEnd={this.handleComposition}
                {...restProps} />
        )
    }
}

export default InputField