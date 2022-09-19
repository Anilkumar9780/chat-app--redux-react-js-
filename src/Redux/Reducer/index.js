// Redux Reducer
const initialState = {
  datas: [
    {
      comment:'helelo',
      user_id: "1"
    }
  ],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        datas: state.datas.concat(action.message),
      };
    default:
      return state;
  }
};
export default appReducer;
