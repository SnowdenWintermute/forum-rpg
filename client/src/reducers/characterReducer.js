import { GET_INVENTORY, SET_INVENTORY_LOADING } from "../actions/types";

const initialState = {
  inventory: null,
  loading: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INVENTORY:
      return {
        ...state,
        inventory: action.payload,
        loading: false
      };
    case SET_INVENTORY_LOADING:
      return {
        ...state,
        inventory: {},
        loading: true
      };
    default:
      return state;
  }
}
