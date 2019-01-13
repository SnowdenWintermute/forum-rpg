import axios from "axios";
import {
  GET_INVENTORY,
  SET_INVENTORY_LOADING,
  GET_ERRORS,
  GET_WALLET
} from "./types";

export const buyEquipment = (type, subType) => dispatch => {
  axios
    .post(`/api/shop/buy-equipment/${type}/${subType}`)
    .then(res => {
      dispatch(setInventoryLoading());
      dispatch({
        type: GET_WALLET,
        payload: res.data.wallet
      });
      axios.get(`/api/characters/inventory`).then(res => {
        dispatch({
          type: GET_INVENTORY,
          payload: res.data
        });
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const repairEquipment = id => dispatch => {
  axios
    .put(`/api/shop/repair-equipment/${id}`)
    .then(res => {
      dispatch({
        type: GET_WALLET,
        payload: res.data.wallet
      });
      axios.get("api/characters/inventory").then(res => {
        dispatch({
          type: GET_INVENTORY,
          payload: res.data
        });
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const repairAll = () => dispatch => {
  axios
    .put(`/api/shop/repair-equipment/`)
    .then(res => {
      dispatch({
        type: GET_WALLET,
        payload: res.data.wallet
      });
      axios.get("api/characters/inventory").then(res => {
        dispatch({
          type: GET_INVENTORY,
          payload: res.data
        });
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const sellEquipment = id => dispatch => {
  axios
    .put(`/api/shop/sell-equipment/${id}`)
    .then(res => {
      dispatch({
        type: GET_WALLET,
        payload: res.data.wallet
      });
      axios.get("api/characters/inventory").then(res => {
        dispatch({
          type: GET_INVENTORY,
          payload: res.data
        });
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setInventoryLoading = () => {
  return {
    type: SET_INVENTORY_LOADING
  };
};
