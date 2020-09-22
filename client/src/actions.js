export const addItem = (item) => ({
  type: "ADD_ITEM",
  item,
});

export const removeItem = (id) => ({
  type: "REMOVE_ITEM",
  id,
});

export const updateQuantity = (id, newQuantity) => ({
  type: "UPDATE_QUANTITY",
  id,
  newQuantity,
});

export const updatePageToView = (pageNumber) => ({
  type: "UPDATE_CURRENT_PAGE_TO_VIEW",
  pageNumber,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const requestItems = () => ({
  type: "REQUEST_ITEMS",
});

export const receiveItems = (items) => ({
  type: "RECEIVE_ITEMS",
  items,
});

export const receiveItemsPaginated = (items) => ({
  type: "RECEIVE_ITEMS_PAGINATED",
  items,
});

export const catchError = (err) => ({
  type: "CATCH_ERROR",
  err,
});
