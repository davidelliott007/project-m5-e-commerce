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

const baconEndPoint = (req, res) => res.status(200).json("🥓");
module.exports = {
  renderBigData,
  baconEndPoint,
};
