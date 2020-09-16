const { openFilePromise } = require("./filelibs.js");
// const { cleanPriceData } = require("./datacleaning");

const fs = require("fs");
function sortFloat(a, b) {
  return a.price - b.price;
}

const cleanPriceData = (items) => {
  console.log("cleanPriceData");

  items = items.map((element) => {
    let price_cleaned_string = element.price.replace("$", "");
    let price_float = parseFloat(price_cleaned_string);
    console.log(price_float);
    return { ...element, price: price_float };
  });

  // console.log(new_items[0]);
  // console.log(new_items[1]);

  return items;
};

const renderBigData = async (req, res) => {
  try {
    console.log("hello");

    const companies_data = await openFilePromise("./data/companies.json");
    const items_data = await openFilePromise("./data/items.json");

    let companies = JSON.parse(companies_data);
    let items = cleanPriceData(JSON.parse(items_data));

    res.status(200).json({ companies, items });
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

const renderBigDataAlphabeticalItems = async (req, res) => {
  try {
    const items_data = await openFilePromise("./data/items.json");

    let items = cleanPriceData(JSON.parse(items_data));

    let sorted_items = items.sort((a, b) => {
      a.name < b.name;
    });

    res.status(200).json({ sorted_items });
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

const renderBigDataByBodyTypeAlpha = async (req, res) => {
  try {
    const companies_data = await openFilePromise("./data/companies.json");
    const items_data = await openFilePromise("./data/items.json");

    let companies = JSON.parse(companies_data);
    let items = cleanPriceData(JSON.parse(items_data));

    // get an array of all body types

    let body_types = [];

    items.forEach((item) => {
      if (body_types.includes(item.body_location) === false) {
        body_types.push(item.body_location);
      }
    });

    body_types.sort();

    // now that we have all our body types in a nice array, go through each and pull out all the items with that type of body_type, then add it an object keyed with that body_type, and push to a master collection

    let collected_by_body_type = [];
    body_types.forEach((body_type_item) => {
      let by_body_type_items = items.filter(
        (item) => item.body_location === body_type_item
      );
      let body_obj = { [body_type_item]: by_body_type_items };
      collected_by_body_type.push(body_obj);
    });

    console.log(collected_by_body_type[0]);

    res.status(200).json({ companies, collected_by_body_type });
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

const renderBigDataByPrice = async (req, res) => {
  try {
    const items_data = await openFilePromise("./data/items.json");

    let items = cleanPriceData(JSON.parse(items_data));

    items = items.sort(sortFloat);

    console.log(items[0]);
    console.log(items[1]);

    items.forEach((e) => {
      console.log(e.price);
    });

    res.status(200).json({ items });
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

const renderBigDataCategoryAlpha = async (req, res) => {
  try {
    const companies_data = await openFilePromise("./data/companies.json");
    const items_data = await openFilePromise("./data/items.json");

    let companies = JSON.parse(companies_data);
    let items = cleanPriceData(JSON.parse(items_data));

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

    res.status(200).json({ companies, collected_by_category });
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

const baconEndPoint = (req, res) => res.status(200).json("🥓");

module.exports = {
  renderBigData,
  renderBigDataAlphabeticalItems,
  renderBigDataByBodyTypeAlpha,
  renderBigDataCategoryAlpha,
  renderBigDataByPrice,
  baconEndPoint,
};
