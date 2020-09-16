const { openFilePromise } = require("./filelibs.js");
const fs = require("fs");

const cleanPriceData = (items) => {
  console.log("cleanPriceData");

  console.log(items);

  items.forEach((element) => {
    console.log(element);
  });

  return items;
};

module.export = {
  cleanPriceData,
};
