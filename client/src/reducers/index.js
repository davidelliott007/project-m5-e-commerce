import { combineReducers } from "redux";

import cartReducer from "./CartReducer";
import feedReducer from "./FeedReducer";

export default combineReducers({
  cart: cartReducer,
  feed: feedReducer,
});
