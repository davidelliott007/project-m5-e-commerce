const { openFilePromise } = require("./filelibs.js");
const fs = require("fs");

const cleanPriceData = (items) => {
  console.log("cleanPriceData");

  let new_items = items.map((element) => {
    let price_cleaned_string = element.price.replace("$", "");
    let price_float = parseFloat(price_cleaned_string);
    console.log(price_float);
    return { ...element, price: price_float };
  });

  return new_items;
};

module.export = {
  cleanPriceData,
};
