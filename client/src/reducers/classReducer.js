import { GET_CLASSES } from "../actions/types";

const initialState = {
  classes: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLASSES:
      return action.payload;
    default:
      return state;
  }
}
