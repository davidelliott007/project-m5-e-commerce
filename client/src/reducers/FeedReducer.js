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

    case "RECEIVE_ITEMS_PAGINATED": {
      // let new_state = produce(state, (draftState) => {
      //   draftState.items = action.items;
      //   draftState.status = "idle";
      //   return draftState;
      // });

      // let new_items = () => {
      //   let items = new_state.items;

      //   let passes = Math.round(items.length / 10);

      //   let blobs = [];
      //   for (let i = 0; i <= passes; i++) {
      //     let lower_limit = i * 10;
      //     let upper_limit = lower_limit + 10;
      //     blobs.push(full_sentences.just_text.slice(lower_limit, upper_limit));
      //   }
      //   console.log(blobs);
      // };

      return produce(state, (draftState) => {
        let items = action.items.items;
        // console.log(items);

        let passes = Math.round(items.length / 10);
        // console.log(passes);

        let pages = [];
        for (let i = 0; i <= passes; i++) {
          let lower_limit = i * 10;
          let upper_limit = lower_limit + 10;
          // console.log(lower_limit);
          // console.log(upper_limit);

          // console.log(items.slice(lower_limit, upper_limit));
          pages.push(items.slice(lower_limit, upper_limit));
        }
        console.log(pages[0]);

        draftState.items = action.items;
        draftState.status = "idleeee";
        draftState.pages = pages;
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
