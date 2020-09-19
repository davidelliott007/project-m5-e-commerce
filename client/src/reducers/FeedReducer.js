import produce from "immer";

const initialState = { items: [], status: "idle" };

export default function feedReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ITEMS": {
      return {
        ...state,
        status: "loading",
      };
    }

    case "RECEIVE_ITEMS": {
      return produce(state, (draftState) => {
        draftState.items = action.items;
        draftState.status = "idle";
        return draftState;
      });
    }

    case "CATCH_ERROR": {
      return produce(state, (draftState) => {
        draftState.status = "error";
        return draftState;
      });
    }

    default:
      return state;
  }
}
