"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// this is where you will get the whole big data blob
const {
  renderBigData,
  renderBigDataAlphabeticalItems,
  renderBigDataByBodyTypeAlpha,
  renderBigDataCategoryAlpha,
  baconEndPoint,
  renderBigDataByPriceAlpha,
} = require("./bigData.js");

// this is where you will get just items, sorted by various
const {
  renderOnlyInStock,
  renderOnlyOutOfStock,
  renderOnlyInStockByBodyType,
  renderOnlyOutOfStockByBodyType,
  renderOnlyInStockCategory,
  renderOnlyOutOfStockCategory,
  renderItemsByCompanyID,
  renderItemsByCompanyName,
} = require("./byStock.js");

const { renderBodyTypes } = require("./bodyTypes.js");

const { renderCompanies } = require("./companies.js");
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
  .get("/bigData/itemsByBodyType", renderBigDataByBodyTypeAlpha)
  // TODO ->>> Acutally do this
  //TODO: Pagination endpoint

  // No dollar sign for cart items
  // prices come with desicriptos, remove refurbished
  // just give raw number for the cart prices.

  .get("/bigData/itemsByPrice", renderBigDataByPriceAlpha)
  .get("/bigData/itemsByCategory", renderBigDataCategoryAlpha)

  .get("/onlyInStock", renderOnlyInStock)
  .get("/onlyOutOfStock", renderOnlyOutOfStock)

  .get("/onlyInStock/alphabeticalItems", renderOnlyInStock)
  .get("/onlyInStock/byBodyType", renderOnlyInStockByBodyType)
  .get("/onlyInStock/byCategory", renderOnlyInStockCategory)

  .get("/onlyOutOfStock/alphabeticalItems", renderOnlyOutOfStock)
  .get("/onlyOutOfStock/byBodyType", renderOnlyOutOfStockByBodyType)
  .get("/onlyOutOfStock/byCategory", renderOnlyOutOfStockCategory)

  .get("/bodyTypes", renderBodyTypes)

  .get("/companies", renderCompanies)

  .get("/itemsByCompanyID/:companyID", renderItemsByCompanyID)
  .get("/itemsByCompanyName/:companyName", renderItemsByCompanyName)

  // REST endpoints?
  // .get("/", renderBigData)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
