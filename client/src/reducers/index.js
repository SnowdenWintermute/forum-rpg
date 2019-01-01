import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import classReducer from "./classReducer";
import forumReducer from "./forumReducer";
import walletReducer from "./walletReducer";
import characterReducer from "./characterReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  classes: classReducer,
  threads: forumReducer,
  wallet: walletReducer,
  character: characterReducer
});
