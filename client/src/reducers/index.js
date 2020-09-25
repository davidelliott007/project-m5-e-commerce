import { combineReducers } from "redux";

import cartReducer from "./CartReducer";
import feedReducer from "./FeedReducer";
import PurchasesReducer from "./PurchasesReducer";

export default combineReducers({
  cart: cartReducer,
  feed: feedReducer,
  purchases: PurchasesReducer,
});
