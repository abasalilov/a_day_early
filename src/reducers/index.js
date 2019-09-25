import { combineReducers } from "redux";
import calcReducer from "./calcReducer";
import { reducer as form } from "redux-form";

export default combineReducers({
  input: calcReducer,
  form
});
