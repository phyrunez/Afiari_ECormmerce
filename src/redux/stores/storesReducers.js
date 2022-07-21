import {
  TOGGLE_MODAL
} from './storeTypes';

const initialState = {
  toggleModalState: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL: {
      return {
        ...state,
        toggleModalState: !state.toggleModalState 
      }
    }
      
    default:
      return state;
  }
};

export default reducer;
