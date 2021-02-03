import React from 'react';

import { emojify } from 'react-emojione';

function hashCode(str) { // java String#hashCode
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  const c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}


const Message = (props) => {
  const { created_at, author, content } = props.message;
  const time = new Date(created_at).toLocaleTimeString();
  const styles = {
    color: `#${intToRGB(hashCode(author))}`
  };
  console.log(styles);

  return (
    <div className="message-container">
      <i className="username">
        <span style={styles}>{ emojify(author) }</span>
        <small className="date">{ time }</small>
      </i>
      <p>{emojify(content)}</p>
    </div>
  );
};

export default Message;
