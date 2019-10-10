import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import mobileReducer from "./mobileReducer";
import emailReducer from "./emailReducer";
import { reducer as form } from "redux-form";

export default combineReducers({
  users: usersReducer,
  auth: authReducer,
  mobile: mobileReducer,
  email: emailReducer,
  form
});
