import produce from "immer";

const initialState = { items: [], status: "idle", filter: null };

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

    case "PAGINATE_ITEMS": {
      return produce(state, (draftState) => {
        let items = action.items;

        let passes = Math.round(items.length / 10);

        let pages = [];
        for (let i = 0; i <= passes; i++) {
          let lower_limit = i * 10;
          let upper_limit = lower_limit + 10;
          pages.push(items.slice(lower_limit, upper_limit));
        }
        pages = pages.filter((page) => page.length !== 0);
        draftState.pages = pages;
        return draftState;
      });
    }

    case "UPDATE_CURRENT_PAGE_TO_VIEW": {
      return produce(state, (draftState) => {
        draftState.pageNumber = action.pageNumber;
        return draftState;
      });
    }

    case "CATCH_ERROR": {
      return produce(state, (draftState) => {
        draftState.status = "error";
        return draftState;
      });
    }

    case "UPDATE_FILTER": {
      return produce(state, (draftState) => {
        draftState.filter = action.bodyPart;
        return draftState;
      });
    }

    default:
      return state;
  }
}

export const getPages = (state) => {
  if (state.feed.pages !== undefined) {
    return state.feed.pages;
  }
};

export const getPageNumber = (state) => {
  if (state.feed.pageNumber !== undefined) {
    return state.feed.pageNumber;
  } else {
    return 0;
  }
};
