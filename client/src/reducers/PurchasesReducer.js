const initialState = { idOfLastOrder: null };

export default function PurchasesReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_LAST_PURCHASE_ID": {
      return { idOfLastOrder: action.uuid };
    }
    default:
      return state;
  }
}
