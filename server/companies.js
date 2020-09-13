const { openFilePromise } = require("./filelibs.js");
const fs = require("fs");

const renderCompanies = async (req, res) => {
  try {
    const companies_data = await openFilePromise("./data/companies.json");

    let companies = JSON.parse(companies_data);
    let sorted_companies = companies.sort((a, b) => {
      a.name < b.name;
    });

    res.status(200).json({ sorted_companies });
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

module.exports = { renderCompanies };
