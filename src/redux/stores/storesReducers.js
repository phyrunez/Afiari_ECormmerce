import {
  TOGGLE_MODAL,
  GET_STORES
} from './storeTypes';

const initialState = {
  toggleModalState: false,
  stores: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL: {
      return {
        ...state,
        toggleModalState: !state.toggleModalState 
      }
    }
    case GET_STORES: {
      // console.log(action.payload)
      return {
        ...state,
        stores: [...action.payload]
      }
    }
      
    default:
      return state;
  }
};

export default reducer;
