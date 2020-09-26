export const FilteredItemsByBody = (BodyPart, itemsArray) => {
  if (BodyPart === "all" || BodyPart === "default") {
    return itemsArray;
  }
  return itemsArray.filter((item) => {
    if (item.body_location === BodyPart) {
      return true;
    }
  });
};
