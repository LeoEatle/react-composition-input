import React, {Component} from 'react'

// detect whether it is chrome 
const isChrome = !!window.chrome && !!window.chrome.webstore

class InputField extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            tempInput: this.props.defaultValue,
        }
        this.isOnComposition = false
    }

    handleInputChange = (event) => {
        let userInputValue = event.target.value
        if (!this.isOnComposition) {
            this.setState({
                tempInput: userInputValue
            })
            event.target.value = userInputValue
            this.props.onInputChange(event)
        } else {
            this.setState({
                tempInput: userInputValue,
            })
        }
    }


    handleComposition = (event) => {
        if (event.type === 'compositionstart') {
            this.isOnComposition = true
        } else if (event.type === 'compositionend') {
            this.isOnComposition = false
            // fixed for Chrome v53+ and detect all Chrome
            // https://chromium.googlesource.com/chromium/src/+/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/
            if (isChrome) {
                this.handleInputChange(event)
            }
        }
    }

    render() {
        const {value, ...restProps} = this.props
        if (value) {
            console.warn('The value props will be replaced by inner state of CInput')
        }
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