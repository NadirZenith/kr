import React from 'react';
import Screen from './Screen'
import Key from './Key'

class Calculator extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: props.value || 0
        }
    }

    updateScreen(value, append = true) {
        if (append) {
            value = this.state.value === 0 ? value : this.state.value + value
        }
        this.setState({value: value})
    }

    onNumPress(num) {
        this.updateScreen(num)
    }

    onOperatorPress(operator) {
        this.updateScreen(operator)
    }

    onDelPress() {
        this.setState({value: 0})
    }
    onCalculatePress(keyValue) {
        // const val = eval(this.state.value)
        this.setState({value: eval(this.state.value)})
    }

    render() {
        return (
            <div>
                <Screen value={this.state.value}/>
                <div id="first-rows">
                    <Key value="Del" id="delete" class="del-bg" onPress={ (k) => this.onDelPress(k)}/>
                    <Key value="%" class="btn-style operator opera-bg fall-back"
                         onPress={ (k) => this.onOperatorPress(k)}/>
                    <Key value="+" class="btn-style opera-bg value align operator"
                         onPress={ (k) => this.onOperatorPress(k)}/>
                </div>

                <div className="rows">
                    <Key value="7" class="btn-style num-bg num first-child" onPress={ (k) => this.onNumPress(k)}/>
                    <Key value="8" class="btn-style num-bg num" onPress={ (k) => this.onNumPress(k)}/>
                    <Key value="9" class="btn-style num-bg num" onPress={ (k) => this.onNumPress(k)}/>
                    <Key value="-" class="btn-style opera-bg operator" onPress={ (k) => this.onOperatorPress(k)}/>
                </div>

                <div className="rows">
                    <Key value="4" class="btn-style num-bg num first-child" onPress={ (k) => this.onNumPress(k)}/>
                    <Key value="5" class="btn-style num-bg num" onPress={ (k) => this.onNumPress(k)}/>
                    <Key value="6" class="btn-style num-bg num" onPress={ (k) => this.onNumPress(k)}/>
                    <Key value="*" class="btn-style opera-bg operator" onPress={ (k) => this.onOperatorPress(k)}/>
                </div>

                <div className="rows">
                    <Key value="1" class="btn-style num-bg num first-child" onPress={ (k) => this.onNumPress(k)}/>
                    <Key value="2" class="btn-style num-bg num" onPress={ (k) => this.onNumPress(k)}/>
                    <Key value="3" class="btn-style num-bg num" onPress={ (k) => this.onNumPress(k)}/>
                    <Key value="/" class="btn-style opera-bg operator" onPress={ (k) => this.onOperatorPress(k)}/>
                </div>

                <div className="rows">
                    <Key value="0" id="delete" class="num-bg zero" onPress={ (k) => this.onNumPress(k)}/>
                    <Key value="." class="btn-style num-bg period fall-back" onPress={ (k) => this.onNumPress(k)}/>
                    <Key value="=" id="eqn-bg" class="eqn align" onPress={ (k) => this.onCalculatePress(k)}/>
                </div>
            </div>
        )
    }
}

export default Calculator
