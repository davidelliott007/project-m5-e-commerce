// const handleBigDataObjectReq = (req, res) => {
//   res.status(404).send("I couldn't find what you're looking for.");
// };

const { openFilePromise } = require("./filelibs.js");
const fs = require("fs");

const renderOnlyInStock = async (req, res) => {
  try {
    const items_data = await openFilePromise("./data/items.json");

    let items = JSON.parse(items_data);

    let onlyInStockItems = items.filter((item) => item.numInStock > 0);

    res.status(200).json({ onlyInStockItems });
  } catch (e) {
    console.error(e.code);

    if (e.code === "ENOENT") {
      let return_error_object = {
        ...e,
        messgae: "couldn't find the json file",
      };
      res.status(404).json(return_error_object);
    } else {
      res.status(404).json(e);
    }
  }
};

const renderOnlyOutOfStock = async (req, res) => {
  try {
    const items_data = await openFilePromise("./data/items.json");

    let items = JSON.parse(items_data);

    let onlyOutOfStock = items.filter((item) => item.numInStock === 0);

    res.status(200).json({ onlyOutOfStock });
  } catch (e) {
    console.error(e.code);

    if (e.code === "ENOENT") {
      let return_error_object = {
        ...e,
        messgae: "couldn't find the json file",
      };
      res.status(404).json(return_error_object);
    } else {
      res.status(404).json(e);
    }
  }
};

module.exports = {
  renderOnlyInStock,
  renderOnlyOutOfStock,
};
