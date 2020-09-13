"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  renderBigData,
  renderBigDataAlphabeticalItems,
  renderBigDataByBodyTypeAlpha,
  baconEndPoint,
} = require("./bigData.js");
const { renderOnlyInStock, renderOnlyOutOfStock } = require("./byStock.js");

// our first change!!!!
let dave = "dave";

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // .get("/dave", handleBigDataObjectReq)
  .get("/bigData", renderBigData)
  .get("/bigData/alphabeticalItems", renderBigDataAlphabeticalItems)
  //TODO
  .get("/bigData/itemsByBodyType", renderBigDataByBodyTypeAlpha)
  //TODO
  .get("/bigData/itemsByPrice", renderBigDataAlphabeticalItems)

  .get("/onlyInStock", renderOnlyInStock)
  .get("/onlyOutOfStock", renderOnlyOutOfStock)

  //TODO
  .get("/onlyInStock/alphabeticalItems", renderOnlyInStock)
  .get("/onlyOutOfStock/alphabeticalItems", renderOnlyOutOfStock)

  // REST endpoints?
  .get("/bacon", baconEndPoint)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
