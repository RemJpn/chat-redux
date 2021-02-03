import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import Message from '../components/message';
import MessageForm from './message_form';

class MessageList extends Component {
  componentWillMount() {
    this.props.fetchMessages(this.props.selectedChannel);
  }

  componentDidMount() {
    const intervalID = window.setInterval(
      () => this.props.fetchMessages(this.props.selectedChannel),
      5000
    );
    this.setState({ intervalID });
  }

  componentDidUpdate() {
    this.list.scrollTop = this.list.scrollHeight;
  }

  componentWillUnmount() {
    window.clearInterval(this.state.intervalID);
  }

  renderList = () => {
    return this.props.messages.map(message => <Message message={message} key={message.created_at} />);
  }

  render() {
    return (
      <div className="channel-container" >
        <div className="channel-title">
          <span>Channel #{this.props.selectedChannel}</span>
        </div>
        <div className="channel-content" ref={(list) => { this.list = list; }}>
          { this.renderList() }
        </div>
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
