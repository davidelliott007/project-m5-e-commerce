const { openFilePromise } = require("./filelibs.js");

const renderIndividualItem = async (req, res) => {
  try {
    const items = JSON.parse(await openFilePromise("./data/items.json"));
    let itemId = req.params.itemId;
    let item = items.find((item) => item._id == itemId);
    console.log(item);
    res.status(200).json({ item });
  } catch (e) {
    console.error(e.code);

    if (e.code === "ENOENT") {
      let return_error_object = {
        ...e,
        message: "couldn't find the json file",
      };
      res.status(404).json(return_error_object);
    } else {
      res.status(404).json(e);
    }
  }
};

module.exports = { renderIndividualItem };
