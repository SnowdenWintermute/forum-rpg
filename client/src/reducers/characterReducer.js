import {
  GET_INVENTORY,
  SET_INVENTORY_LOADING,
  EQUIP_ITEM
} from "../actions/types";

const initialState = {
  inventory: null,
  currentEquipment: null,
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
    case EQUIP_ITEM:
      return {
        ...state,
        currentEquipment: {}
      };
    default:
      return state;
  }
}
