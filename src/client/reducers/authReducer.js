import {
  FETCH_CURRENT_USER,
  ADE_LOGIN_SUBMIT,
  RESET_AUTH,
  UPDATE_ACTIVE_USER
} from "../actions";

export default function(
  state = { attempted: false, result: false, username: "" },
  action
) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      const fetchCurrentUserState = Object.assign({}, state);
      return fetchCurrentUserState;
    case UPDATE_ACTIVE_USER:
      const updateActiveUserState = Object.assign({}, state);
      updateActiveUserState.username = action.payload;
      return updateActiveUserState;
    case RESET_AUTH:
      const resetAuthState = Object.assign({}, state);
      resetAuthState.attempted = false;
      resetAuthState.result = false;
      return resetAuthState;
    case ADE_LOGIN_SUBMIT:
      const loginState = Object.assign({}, state);
      console.log("action", action);
      if (action.payload.statusText) {
        loginState.attempted = true;
        loginState.result = action.payload.statusText;
      } else {
        loginState.auth = undefined;
      }
      return loginState;
    default:
      return state;
  }
}
