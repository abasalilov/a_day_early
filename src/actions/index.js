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
