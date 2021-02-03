import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createMessage(
      this.props.selectedChannel,
      this.props.currentUser,
      this.state.value
    );
    this.setState({ value: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="message-form">
        <input
          ref={(input) => { this.messageBox = input; }}
          type="text"
          className="form-control"
          autoComplete="off"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

import { createMessage } from '../actions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { createMessage: createMessage },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    selectedChannel: state.selectedChannel,
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
