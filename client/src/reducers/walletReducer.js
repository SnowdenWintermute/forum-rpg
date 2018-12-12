import {
    GET_WALLET
  } from "../actions/types";
  
  const initialState = {
    wallet: null,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_WALLET:
        return {
          ...state,
          wallet: action.payload
        };
      default:
        return state;
    }
  }
  