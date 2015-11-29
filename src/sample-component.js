import React from 'react';
import ViewComponent from './view-component.js';
import InputComponent from './input-component.js';

export default class SampleComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input_value: '（ここにテキストボックスの値が入ります）'
    };
  }

  _inputChangeHandler(e) {
    this.setState({ input_value: e.target.value });
  }

  render () {
    return (
      <div className="sampleComponent">
        <InputComponent
          ref="iptCmp"
          placeholder="input something ..."
          inputChangeHandler={this._inputChangeHandler.bind(this)}
        />
        <ViewComponent
          ref="viewCmp"
          text={this.state.input_value}
        />
      </div>
    );
  }
}
