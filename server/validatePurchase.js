const fs = require("fs");
const { openFilePromise } = require("./filelibs.js");
const { v4: uuidv4 } = require("uuid");

// the stockUpdates array will contain objects containing the order info. The order info has this shape
//   {
//     orderId: '44499725-43c0-4468-92d8-442bf23a1b0c',
//     itemsBought: [ {id: 4632, quantity: 4} ]
//   }
let stockUpdates = [];

const validatePurchase = async (req, res) => {
  const items_data = await openFilePromise("./data/items.json");

  let parsed_items_data = JSON.parse(items_data);

  const purchasedItems = req.body;

  let error = "";

  const numbersOnly = /^\d+$/;

  let purchasedItemsArray = [];

  purchasedItems.forEach((purchasedItem) => {
    //first we find the item in stock that matches the item we bought
    let foundItem = parsed_items_data.find((storeItem) => {
      if (storeItem._id === purchasedItem._id) {
        return true;
      }
    });
    //if we can't find that item, save an error message
    if (foundItem === undefined) {
      error = "Invalid item Id";
      return;
    }
    //check if we bought too many of this item compared to the amount left in stock
    if (purchasedItem.quantity > foundItem.quantity) {
      error = "Not enough items in stock";
      return;
    }
    //check if the quantity is valid (ie. it has to be a positive whole integer)
    if (
      purchasedItem.quantity < 0 ||
      purchasedItem.quantity % 1 !== 0 ||
      !numbersOnly.test(purchasedItem.quantity)
    ) {
      error = "Invalid quantity";
      return;
    }

    //if it passes all of the test, register the item id and quantity in an object and push it to the purchaseditems Array
    let purchasedItemObject = {
      id: purchasedItem._id,
      quantity: purchasedItem.quantity,
    };
    purchasedItemsArray.push(purchasedItemObject);
  });

  if (error !== "") {
    //if there is an error, the purchase won't work and it won't be pushed in stockUpdates array. Instead, we'll send an error code
    //to the front end and encourage users to try again.
    res.status(406).json({ status: error });
  } else {
    //If the purchase has no error and passes the form validation, then it will be pushed to the stockUpdates array and will be send back to the user.
    const order = { orderId: uuidv4(), itemsBought: purchasedItemsArray };
    stockUpdates.push(order);
    res.status(200).json({ status: "valid", order });
    console.log(stockUpdates);
  }
};

module.exports = {
  validatePurchase,
  stockUpdates,
};
