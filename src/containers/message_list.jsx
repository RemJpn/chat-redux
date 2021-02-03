import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import Message from '../components/message';
import MessageForm from './message_form';

class MessageList extends React.Component {
  componentWillMount() {
    this.props.fetchMessages(this.props.selectedChannel);
  }

  componentDidMount() {
    const intervalID = window.setInterval(
      () => this.props.fetchMessages(this.props.selectedChannel),
      3000
    );
    this.setState({ intervalID });
  }

  componentDidUpdate() {
    console.log('scrolling?')
    this.list.scrollTop = this.list.scrollHeight
  }

  componentWillUnmount() {
    window.clearInterval(this.state.intervalID);
  }

  renderList = () => {
    return this.props.messages.map(message => <Message message={message} key={message.created_at}/>);
  }

  render() {
    return (
      <div className="message-list" ref={(list) => { this.list = list; }}>
        { this.renderList() }
        <MessageForm />
      </div>
    );
  }
}

import { fetchMessages } from '../actions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchMessages },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    selectedChannel: state.selectedChannel
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
