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

const { renderIndividualItem } = require("./individualItem.js");

const { validatePurchase } = require("./validatePurchase");

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
  .get("/bigData/itemsByPrice", renderBigDataAlphabeticalItems)
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

  .get("/items/:itemId", renderIndividualItem)
  //Put
  .put("/purchase", validatePurchase)

  // REST endpoints?
  .get("/bacon", baconEndPoint)
  //

  .listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });
