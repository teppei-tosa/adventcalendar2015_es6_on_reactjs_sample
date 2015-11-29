import React from 'react';

export default class ViewComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="viewComponent">
        {this.props.text}
      </div>
    );
  }
}

ViewComponent.propTypes = {
  text: React.PropTypes.string.isRequired
};
