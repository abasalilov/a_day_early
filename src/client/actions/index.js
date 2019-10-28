export const UPDATE_ACTIVE_USER = "update_active_user";
export const updateActiveUser = username => async (dispatch, getState, api) => {
  dispatch({
    type: UPDATE_ACTIVE_USER,
    payload: username
  });
};

// note might need to regress to   const res = await api.get("/ade-login");
// style
export const ADE_LOGIN_SUBMIT = "ade_login_submit";
export const adeLoginSubmit = (username, pw) => async (
  dispatch,
  getState,
  api
) => {
  const res = await api.post(`http://localhost:5000/ade-login-user`, {
    username,
    pw
  });

  dispatch({
    type: ADE_LOGIN_SUBMIT,
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
  const res = await api.post("http://localhost:5000/ade-register-user", {
    data
  });
  dispatch({
    type: REGISTER_USER,
    payload: res
  });
};

export const FETCH_CURRENT_USER = "fetch_current_user";
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get("http://localhost:5000/current-user");
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
  const res = await api.post("http://localhost:5000/ade-username-check", {
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

  const res = await api.post("http://localhost:5000/email", {
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

export const SET_FORM_ERROR = "SET_FORM_ERROR";

export const setFormError = error => ({
  type: SET_FORM_ERROR,
  error
});

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

export const UPDATE_AMORT_GRAPH = "UPDATE_AMORT_GRAPH";

export const updateAmortGraph = st => ({
  type: UPDATE_AMORT_GRAPH,
  st
});

export const UPDATE_INFO_FORM = "UPDATE_INFO_FORM";

export const updateInfoForm = st => ({
  type: UPDATE_INFO_FORM,
  st
});

export const ROUTE_PROGRAMS = "ROUTE_PROGRAMS";

export const routePrograms = msg => ({
  type: ROUTE_PROGRAMS,
  msg
});
