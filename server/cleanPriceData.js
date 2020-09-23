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

module.exports = {
  cleanPriceData,
};
