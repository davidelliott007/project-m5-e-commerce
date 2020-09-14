const { openFilePromise } = require("./filelibs.js");

const renderBodyTypes = async (req, res) => {
  try {
    const items_data = await openFilePromise("./data/items.json");
    console.log(items_data);

    let items = JSON.parse(items_data);

    let body_types = [];

    items.forEach((item) => {
      if (body_types.includes(item.body_location) === false) {
        body_types.push(item.body_location);
      }
    });

    body_types.sort();

    res.status(200).json({ body_types });
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
  renderBodyTypes,
};
