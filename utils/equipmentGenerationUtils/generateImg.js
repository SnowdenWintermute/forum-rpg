module.exports = (type, subType) => {
  let img;
  if (
    type === "head" ||
    type === "body" ||
    type === "legs" ||
    type === "feet" ||
    type === "shoulders" ||
    type === "arms" ||
    type === "hands" ||
    type === "back" ||
    type === "ring" ||
    type === "neck"
  ) {
    img = type;
  } else {
    img = subType;
  }
  return img;
};
