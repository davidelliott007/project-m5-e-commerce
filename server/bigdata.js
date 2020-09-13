// const handleBigDataObjectReq = (req, res) => {
//   res.status(404).send("I couldn't find what you're looking for.");
// };

const { openFilePromise } = require("./filelibs.js");
const fs = require("fs");

const renderBigData = async (req, res) => {
  try {
    const companies_data = await openFilePromise("./data/companies.json");
    const items_data = await openFilePromise("./data/items.json");

    let companies = JSON.parse(companies_data);
    let items = JSON.parse(items_data);

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
    const companies_data = await openFilePromise("./data/companies.json");
    const items_data = await openFilePromise("./data/items.json");

    let companies = JSON.parse(companies_data);
    let items = JSON.parse(items_data);

    let sorted_items = items.sort((a, b) => {
      a.name < b.name;
    });

    res.status(200).json({ companies, sorted_items });
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
    let items = JSON.parse(items_data);

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

const baconEndPoint = (req, res) => res.status(200).json("🥓");
module.exports = {
  renderBigData,
  renderBigDataAlphabeticalItems,
  renderBigDataByBodyTypeAlpha,
  baconEndPoint,
};
