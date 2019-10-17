import {
  UPDATE_AMORTIZATION,
  RESET_AMORTIZATION,
  SET_BEGIN_DATE,
  UPDATE_AMORT_GRAPH,
  UPDATE_INFO_FORM
} from "../actions";
import { amortizationSchedule } from "amortization";
import update from "react-addons-update";
import calculate from "../components/CalculatorGraph/calculations";

function getFormattedDate() {
  var date = new Date();
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
}

export const defaultState = {
  loanAmount: null,
  interestRate: null,
  term: null,
  firstPayment: null,
  monthlyPayment: null,
  monthlyOverpayment: 0,
  originationDate: new Date(),
  paymentAmount: 0,
  currentLoanAmount: 0,
  payOffDate: "",
  canCalculate: false
};

export const resetState = {
  loanAmount: null,
  interestRate: null,
  term: null,
  firstPayment: null,
  monthlyPayment: null,
  monthlyOverpayment: 0,
  originationDate: new Date(),
  paymentAmount: 0,
  currentLoanAmount: 0,
  payOffDate: "",
  canCalculate: false
};

export default function input(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_AMORTIZATION:
      const loanAmount = Number(state.loanAmount);
      const term = Number(state.term);
      const interestRate = Number(state.interestRate);

      if (
        !interestRate > 0 ||
        !term > 0 ||
        !loanAmount > 0 ||
        state.beginDate === null
      ) {
        return state;
      }
      const amortization = amortizationSchedule(loanAmount, term, interestRate);

      return update(state, {
        amortization: {
          $set: amortization
        }
      });
    case RESET_AMORTIZATION:
      return resetState;
    case SET_BEGIN_DATE:
      return update(state, {
        beginDate: {
          $set: action.date
        }
      });
    case UPDATE_AMORT_GRAPH:
      const updatedState = Object.assign({}, state);
      const { st } = action;
      const { monthlyPayment } = calculate(
        st.loanAmount,
        st.term,
        st.interestRate
      );
      updatedState.loanAmount = st.loanAmount;
      updatedState.monthlyPayment = st.monthlyPayment;
      updatedState.term = st.term;
      updatedState.interestRate = st.interestRate;

      return updatedState;
    case UPDATE_INFO_FORM:
      const updatedInfoFormState = Object.assign({}, state);
      const canCalculate =
        Object.keys(action.st).filter(item => {
          return action.st[item] !== null;
        }).length >= 3;
      updatedInfoFormState.canCalculate = canCalculate;
      return updatedInfoFormState;
    default:
      return state;
  }
}
