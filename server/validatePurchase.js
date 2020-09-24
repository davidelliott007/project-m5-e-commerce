const fs = require("fs");
const { openFilePromise, writeFile } = require("./filelibs.js");
const { v4: uuidv4 } = require("uuid");
const {
  promiseCheckItemsAgainstPurchasedStock,
} = require("./reconcileStock.js");

// the stockUpdates array will contain objects containing the order info. The order info has this shape
//   {
//     orderId: '44499725-43c0-4468-92d8-442bf23a1b0c',
//     itemsBought: [ {id: 4632, quantity: 4} ]
//   }
let stockUpdates = [];

const validatePurchase = async (req, res) => {
  const items_data = await openFilePromise("./data/items.json");

  // NOTE: Mae, here I wash the items you retrieve from through the promiseCheckItemsAgainstPurchasedStock

  let items_parsed = JSON.parse(items_data);

  let parsed_items_data = await promiseCheckItemsAgainstPurchasedStock(
    items_parsed
  );

  const purchasedItems = req.body;

  let error = "";

  const numbersOnly = /^\d+$/;

  let purchasedItemsArray = [];

  purchasedItems.forEach(async (purchasedItem) => {
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
    console.log(error);
    // open the file from purchases.json,

    try {
      const purchases_data = await openFilePromise("./data/purchases.json");
      let purchases = JSON.parse(purchases_data);
      purchases.push(order);
      let file_confirmation = await writeFile("purchases.json", purchases);
    } catch (e) {
      console.log("e");
      console.error(e.code);

      let purchases = [order];
      // no file of purchases exists yet, let's make one.
      let file_confirmation = await writeFile("purchases.json", purchases);
    }

    res.status(200).json({ status: "valid", order });
  }
};

module.exports = {
  validatePurchase,
  stockUpdates,
};
