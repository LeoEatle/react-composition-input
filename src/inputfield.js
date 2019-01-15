import React, { Component } from 'react'
import PropTypes from 'prop-types';

// detect whether it is chrome
const isChrome = !!window.chrome && !!window.chrome.webstore

const noop = () => {}

class InputField extends Component {

    static propTypes = {
        value: PropTypes.any,
        defaultValue: PropTypes.any,
        onChange: PropTypes.func,
        onInputChange: PropTypes.func
    }

    static defaultProps = {
        onChange: noop,
        onInputChange: noop
    }

    constructor(props, context) {
        super(props, context)
        this.state = {
            value: this.props.value || this.props.defaultValue || ''
        }
        this.isOnComposition = false
        this.emittedInput = true
    }

    componentWillReceiveProps(nextProps) {
        const { value } = nextProps
        if (value !== this.props.value) {
            this.setState({
                value
            })
        }
    }

    handleInputChange = (event) => {
        console.log('触发input事件' + new Date().getTime() + 'this.emittedInput ' + this.emittedInput)
        let userInputValue = event.target.value
        this.setState({
            value: userInputValue
        })
        if (!this.isOnComposition) {
            event.target.value = userInputValue
            this.props.onInputChange(event)
            this.emittedInput = true
        } else {
            this.emittedInput = false
        }
        this.props.onChange(userInputValue)
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
        const { onInputChange, ...restProps } = this.props
        return (
            <input
                type='text'
                {...restProps}
                ref={(input)=>{this.input = input}}
                value={this.state.value}
                onChange={this.handleInputChange}
                onCompositionStart={this.handleComposition}
                onCompositionEnd={this.handleComposition}
            />
        )
    }
}

export default InputField