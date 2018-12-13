import axios from "axios";
import { GET_WALLET, GET_ERRORS, SET_WALLET_LOADING } from "./types";

export const createWallet = () => dispatch => {
  axios
    .post("/api/wallet/createWallet")
    .then(res => {
      dispatch({
        type: GET_WALLET,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getWallet = () => dispatch => {
  axios
    .get(`/api/wallet/`)
    .then(res => {
      dispatch(setWalletLoading());
      dispatch({
        type: GET_WALLET,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setWalletLoading = () => {
  return {
    type: SET_WALLET_LOADING
  };
};
