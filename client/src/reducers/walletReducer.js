import { GET_WALLET, SET_WALLET_LOADING } from "../actions/types";

const initialState = {
  wallet: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WALLET:
      return {
        ...state,
        wallet: action.payload,
        loading: false
      };
    case SET_WALLET_LOADING:
      return {
        ...state,
        wallet: {},
        loading: true
      };
    default:
      return state;
  }
}
