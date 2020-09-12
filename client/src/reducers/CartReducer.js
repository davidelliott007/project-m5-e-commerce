import produce from "immer";

const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        [action.item.id]: {
          ...action.item,
          quantity:
            state[action.item.id] && state[action.item.id].quantity
              ? state[action.item.id].quantity + 1
              : 1,
        },
      };
    }

    case "REMOVE_ITEM": {
      return produce(state, (draftState) => {
        delete draftState[action.id];
      });
    }

    case "UPDATE_QUANTITY": {
      return produce(state, (draftState) => {
        draftState[action.id].quantity = action.newQuantity;
      });
    }

    case "CLEAR_CART": {
      return initialState;
    }

    default:
      return state;
  }
}

export const getStoreItemArray = (state) => Object.values(state);
