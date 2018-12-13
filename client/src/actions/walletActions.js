import axios from "axios";
import {GET_WALLET, GET_ERRORS} from "./types";

export const createWallet = () =>dispatch => {
    axios.post('/api/wallet/createWallet').then(res =>
        dispatch({
            type: GET_WALLET,
            payload: res.data
        })
    ).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

export const getWallet = (userId) =>dispatch => {
    axios.get(`/api/wallet/${userId}`).then(res =>
        dispatch({
            type: GET_WALLET,
            payload: res.data
        })
    ).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}