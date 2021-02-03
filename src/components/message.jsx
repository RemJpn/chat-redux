import React from 'react';


function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
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
        <span style={styles}>{ author }</span>
        <small className="date">{ time }</small>
      </i>
      <p>{content}</p>
    </div>
  );
};

export default Message;
