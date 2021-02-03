import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class ChannelList extends Component {
  handleClick = (channel) => {
    this.props.selectChannel(channel);
  }

  renderList = () => {
    return this.props.channels.map((channel) => {
      return (

        <li
          key={channel}
          className={channel === this.props.selectedChannel ? 'active' : null}
          onClick={() => this.handleClick(channel)}
          role="presentation"
        >
          #{channel}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="channels-container">
        <span>Redux chat</span>
        <ul>
          { this.renderList() }
        </ul>
      </div>
    );
  }
}

import { selectChannel } from '../actions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { selectChannel },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    channels: state.channels,
    selectedChannel: state.selectedChannel
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
