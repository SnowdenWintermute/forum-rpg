import axios from "axios";
import {
  GET_INVENTORY,
  SET_INVENTORY_LOADING,
  GET_ERRORS,
  EQUIP_ITEM
} from "./types";

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

export const equipItem = itemId => dispatch => {
  axios.put(`api/characters/equip-item/${itemId}`).then(res => {
    dispatch({
      type: EQUIP_ITEM,
      payload: res.data
    })
  }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );;
};

export const setInventoryLoading = () => {
  return {
    type: SET_INVENTORY_LOADING
  };
};
