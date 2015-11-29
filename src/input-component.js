import React from 'react';

export default class InputComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="inputComponent">
        <input
          type="text"
          ref="ipt"
          placeholder={this.props.placeholder}
          onChange={this.props.inputChangeHandler}
        />
      </div>
    );
  }

}

InputComponent.propTypes = {
  placeholder: React.PropTypes.string.isRequired,
  inputChangeHandler: React.PropTypes.func.isRequired
};
