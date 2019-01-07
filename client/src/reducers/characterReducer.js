import {
  GET_INVENTORY,
  SET_INVENTORY_LOADING,
  EQUIP_ITEM,
  GET_CHARACTER,
  SET_CHARACTER_LOADING,
  GET_EQUIPMENT
} from "../actions/types";

const initialState = {
  inventory: null,
  equipment: null,
  loading: null,
  character: null
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
        character: action.payload
      };
    case SET_CHARACTER_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_CHARACTER:
      return{
        ...state,
        character: action.payload,
        loading: false
      }
    case GET_EQUIPMENT:
      return{
        ...state,
        equipment: action.payload,
        loading: false
      }
    default:
      return state;
  }
}
