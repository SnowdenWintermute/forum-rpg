import { GET_CLASSES } from "./types";

export const getClasses = classes => {
  return {
    type: GET_CLASSES,
    payload: classes
  };
};
