import produce from "immer";

const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        [action.item._id]: {
          ...action.item,
          quantity:
            state[action.item._id] && state[action.item._id].quantity
              ? state[action.item._id].quantity + 1
              : 1,
        },
      };
    }

    case "REMOVE_ITEM": {
      return produce(state, (draftState) => {
        console.log(action.id);
        delete draftState[action.id];

        return draftState;
      });
    }

    case "UPDATE_QUANTITY": {
      return produce(state, (draftState) => {
        draftState[action.id].quantity = action.newQuantity;
        return draftState;
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

export const getPages = (state) => {
  if (state.feed.pages !== undefined) {
    return state.feed.pages;
  }
};
