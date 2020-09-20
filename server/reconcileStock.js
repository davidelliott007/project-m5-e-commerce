const { openFilePromise, writeFile } = require("./filelibs.js");

const promiseCheckItemsAgainstPurchasedStock = async (items) => {
  // console.log(items[0]);

  let purchases_data;
  try {
    purchases_data = await openFilePromise("./data/purchases.json");
  } catch (e) {
    console.log("promiseCheckItemsAgainstPurchasedStock");
    console.error(e.code);

    let purchases = [];
    // no file of purchases exists yet, let's make one, and prepare some empty data to the promise while we are at it
    let file_confirmation = await writeFile("purchases.json", purchases);
    purchases_data = JSON.stringify(purchases);
  }

  myPromise = new Promise((resolve, reject) => {
    let purchases = JSON.parse(purchases_data);
    console.log(purchases[0]);
    let last_index = 0;
    purchases.forEach((purchase) => {
      // find the items sub array from items that macthes the purchase
      let items_matched_to_purchase = items.filter(
        (item) => item._id === purchase.itemsBought[0].id
      );

      let indexOfItemToChange = items.findIndex(
        (item) => item === items_matched_to_purchase[0]
      );

      // option - put changed items at top?
      items[indexOfItemToChange].numInStock =
        items[indexOfItemToChange].numInStock -
        purchase.itemsBought[0].quantity;
    });
    console.log(items[0]);

    resolve(items);
  });
  return myPromise;
};

module.exports = {
  promiseCheckItemsAgainstPurchasedStock,
};
