/* eslint no-eval: 0 */
import React, { Component } from 'react'
import "./App.css"
import store from './store'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      out: "0"
    }
    this.refOutput = React.createRef()
  }

  tapeNumber (value){
    let currentValue = value
    let output = this.refOutput.current

    this.setState({
      out: currentValue
  })
    if(output.value === "0") {
      output.value = ""
    }
    output.value += currentValue
  }

  tapeOperations(value) {
    let output = this.refOutput.current

    if (value === "CE") {
      output.value.length === 1 ? output.value = "0" : output.value = output.value.substring(0, output.value.length - 1)
    }

    else if (value === "C") {output.value = "0"}
    else if (value === "=") {
      try {output.value = eval(output.value)}
      catch { 
        output.value = "Xatolik - Error" 
        setTimeout (() => {
          output.value = "0"
        })
      }
    }
  }

  render() {
    return (
      <div className="container">
          <div className="output">
            <input ref={this.refOutput} type="text" defaultValue={this.state.out} />
          </div>
          <div className="buttons">
            {store.buttons.map(item => <button
            onClick={() => {this.tapeNumber(item.val)}}
            >{item.val}</button>)}
            {store.operations.map(item => <button
            onClick={() => {this.tapeOperations(item.val)}}
            >{item.val}</button>)}
          </div>
      </div>
    )
  }
}

