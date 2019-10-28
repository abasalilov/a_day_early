import { UPDATE_PAYPAL_SUCCESS, UPDATE_PAYPAL_FAILURE } from "../actions";

export default function(
  state = { attempted: false, result: false, data: {} },
  action
) {
  switch (action.type) {
    case UPDATE_PAYPAL_SUCCESS:
      console.log("action in UPDATE_PAYPAL_SUCCESS", action);
      const payPalSuccessUserState = Object.assign({}, state);
      payPalSuccessUserState.attempted = true;
      payPalSuccessUserState.result = true;
      payPalSuccessUserState.data = action.payload;
      return payPalSuccessUserState;
    case UPDATE_PAYPAL_FAILURE:
      const payPalFailureUserState = Object.assign({}, state);
      payPalFailureUserState.data = action.payload;
      payPalFailureUserState.attempted = true;
      payPalFailureUserState.result = false;
      return payPalFailureUserState;
    default:
      return state;
  }
}
