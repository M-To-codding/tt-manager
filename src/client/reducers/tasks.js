const tasks = (state = [], action) => {
  switch (action.status) {
    case 'NEW':
      return [
        ...state,
        action.status,
        action.text
      ];
    case 'IN_WORK':
      return [
        ...state,
        action.status
      ];
    case 'COMPLETED':
      return [
        ...state,
        action.status
      ];
    default:
      return state
  }
}

export default tasks;