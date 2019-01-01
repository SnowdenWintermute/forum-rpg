import axios from "axios";
import { GET_INVENTORY, SET_INVENTORY_LOADING, GET_ERRORS } from "./types";

export const getInventory = () => dispatch => {
  axios
    .get("/api/characters/inventory")
    .then(res => {
      dispatch(setInventoryLoading());
      dispatch({
        type: GET_INVENTORY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};

export const setInventoryLoading = () => {
  return {
    type: SET_INVENTORY_LOADING
  };
};
