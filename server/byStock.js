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

const renderOnlyInStockByBodyType = async (req, res) => {
  try {
    const items_data = await openFilePromise("./data/items.json");

    let items = JSON.parse(items_data);

    items = items.filter((item) => item.numInStock > 0);

    // get an array of all body types

    let body_types = [];

    items.forEach((item) => {
      if (body_types.includes(item.body_location) === false) {
        body_types.push(item.body_location);
      }
    });

    body_types.sort();

    console.log(body_types);

    // now that we have all our body types in a nice array, go through each and pull out all the items with that type of body_type, then add it an object keyed with that body_type, and push to a master collection

    let collected_by_body_type_only_in_stock = [];
    body_types.forEach((body_type_item) => {
      let by_body_type_items = items.filter(
        (item) => item.body_location === body_type_item
      );

      let sorted_by_body_type_items = by_body_type_items.sort((a, b) => {
        a.name < b.name;
      });

      let body_obj = { [body_type_item]: sorted_by_body_type_items };
      collected_by_body_type_only_in_stock.push(body_obj);
    });

    res.status(200).json({ collected_by_body_type_only_in_stock });
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

const renderOnlyOutOfStockByBodyType = async (req, res) => {
  try {
    const items_data = await openFilePromise("./data/items.json");

    let items = JSON.parse(items_data);

    items = items.filter((item) => item.numInStock === 0);

    // get an array of all body types

    let body_types = [];

    items.forEach((item) => {
      if (body_types.includes(item.body_location) === false) {
        body_types.push(item.body_location);
      }
    });

    body_types.sort();

    // now that we have all our body types in a nice array, go through each and pull out all the items with that type of body_type, then add it an object keyed with that body_type, and push to a master collection

    let collected_by_body_type_only_OUT_of_stock = [];
    body_types.forEach((body_type_item) => {
      let by_body_type_items = items.filter(
        (item) => item.body_location === body_type_item
      );

      let sorted_by_body_type_items = by_body_type_items.sort((a, b) => {
        a.name < b.name;
      });

      let body_obj = { [body_type_item]: sorted_by_body_type_items };
      collected_by_body_type_only_OUT_of_stock.push(body_obj);
    });

    res.status(200).json({ collected_by_body_type_only_OUT_of_stock });
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

const renderOnlyInStockCategory = async (req, res) => {
  try {
    const items_data = await openFilePromise("./data/items.json");

    let items = JSON.parse(items_data);
    items = items.filter((item) => item.numInStock > 0);

    // get an array of all body types

    let categories = [];

    items.forEach((item) => {
      if (categories.includes(item.category) === false) {
        categories.push(item.category);
      }
    });

    categories.sort();

    console.log(categories);
    // now that we have all our body types in a nice array, go through each and pull out all the items with that type of body_type, then add it an object keyed with that body_type, and push to a master collection

    let collected_by_category = [];
    categories.forEach((category_type_item) => {
      let by_category_items = items.filter(
        (item) => item.category === category_type_item
      );
      let category_obj = { [category_type_item]: by_category_items };
      collected_by_category.push(category_obj);
    });

    console.log(collected_by_category[0]);

    res.status(200).json({ collected_by_category });
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

const renderOnlyOutOfStockCategory = async (req, res) => {
  try {
    const items_data = await openFilePromise("./data/items.json");

    let items = JSON.parse(items_data);
    items = items.filter((item) => item.numInStock === 0);

    // get an array of all body types

    let categories = [];

    items.forEach((item) => {
      if (categories.includes(item.category) === false) {
        categories.push(item.category);
      }
    });

    categories.sort();

    console.log(categories);
    // now that we have all our body types in a nice array, go through each and pull out all the items with that type of body_type, then add it an object keyed with that body_type, and push to a master collection

    let collected_by_category = [];
    categories.forEach((category_type_item) => {
      let by_category_items = items.filter(
        (item) => item.category === category_type_item
      );
      let category_obj = { [category_type_item]: by_category_items };
      collected_by_category.push(category_obj);
    });

    console.log(collected_by_category[0]);

    res.status(200).json({ collected_by_category });
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
  renderOnlyInStockByBodyType,
  renderOnlyOutOfStockByBodyType,
  renderOnlyInStockCategory,
  renderOnlyOutOfStockCategory,
};
