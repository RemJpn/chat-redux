export default function(state = null, action) {
  switch (action.type) {
    case 'FETCH_MESSAGES':
      return action.payload.messages;
    case 'CREATE_MESSAGE':
      const newMessageList = state.slice(0);
      newMessageList.push(action.payload);
      return newMessageList;
    default:
      return state;
  }
}
