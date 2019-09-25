import axios from "axios";
import { email } from "../utils";
/* PD HELPER FNS */

const makeQstring = qArr => {
  let str = "{";
  const endStr = "}";

  for (let i = 0; i < qArr.length; i++) {
    if (i !== qArr.length - 1) {
      str += ` "${qArr[i]}": 1,`;
    } else {
      str += ` "${qArr[i]}": 1`;
    }
  }
  return str + endStr;
};

const collections = ["aapparts", "orders", "users"];

const userFields = ["name", "providers", "email"];

const orderFields = [
  "_id",
  "date",
  "name",
  "email",
  "vin",
  "total",
  "vehicle",
  "autoZone"
];

export const UPDATE_ACTIVE_USER = "update_active_user";
export const updateActiveUser = username => async (dispatch, getState, api) => {
  dispatch({
    type: UPDATE_ACTIVE_USER,
    payload: username
  });
};

// note might need to regress to   const res = await api.get("/gmas-login");
// style
export const GMAS_LOGIN_SUBMIT = "gmas_login_submit";
export const gmasLoginSubmit = (username, pw) => async (
  dispatch,
  getState,
  api
) => {
  const res = await api.post(`https://gmasdevgroup.com/gmas-login`, {
    username,
    pw
  });

  dispatch({
    type: GMAS_LOGIN_SUBMIT,
    payload: res
  });

  if (res.data === "Logged In") {
    dispatch({
      type: UPDATE_ACTIVE_USER,
      payload: username
    });
  }
};

export const REGISTER_USER = "register_user";
export const registerUser = data => async (dispatch, getState, api) => {
  const res = await api.post("https://gmasdevgroup.com/gmas-registration", {
    data
  });
  dispatch({
    type: REGISTER_USER,
    payload: res
  });
};

export const FETCH_CURRENT_USER = "fetch_current_user";
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get("https://gmasdevgroup.com:current_user");
  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};

export const CONFIRM_UNIQUE_USERNAME = "confirm_unique_username";
export const confirmUniqueUsername = data => async (
  dispatch,
  getState,
  api
) => {
  const res = await api.post("https://gmasdevgroup.com/gmas-username-check", {
    data
  });

  dispatch({
    type: CONFIRM_UNIQUE_USERNAME,
    payload: res
  });
};

export const RESET_AUTH = "rest_auth";
export const resetAuth = () => async (dispatch, getState, api) => {
  dispatch({
    type: RESET_AUTH
  });
};

export const RESIZE_EVENT = "resize_event";
export const resizeEvent = mobile => async (dispatch, getState, api) => {
  dispatch({
    type: RESIZE_EVENT,
    payload: mobile
  });
};

/** EMAIL MSG ACTIONS */
// EMAIL_SUCCESS, EMAIL_FAILED;

/* eslint-disable */
export const EMAIL_SUBMIT = "EMAIL_SUBMIT";
export const EMAIL_SUCCESS = "EMAIL_SUCCESS";
export const EMAIL_FAILED = "EMAIL_FAILED";
export const submitContactUsEmail = data => async (dispatch, getState, api) => {
  dispatch({
    type: EMAIL_SUBMIT
  });

  const res = await api.post("https://gmasdevgroup.com:email", {
    data
  });
  if (res.status !== 201) {
    dispatch({
      type: EMAIL_SUCCESS
    });
  } else {
    dispatch({
      type: EMAIL_FAILED
    });
  }
};

export const UPDATE_AMORTIZATION = "UPDATE_AMORTIZATION";
export const RESET_AMORTIZATION = "RESET_AMORTIZATION";
export const SET_BEGIN_DATE = "SET_BEGIN_DATE";

export const updateAmortization = () => {
  return {
    type: UPDATE_AMORTIZATION
  };
};

export const resetAmortization = () => ({
  type: RESET_AMORTIZATION
});

export const setBeginDate = date => ({
  type: SET_BEGIN_DATE,
  date
});
