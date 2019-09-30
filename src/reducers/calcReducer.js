import {
  UPDATE_AMORTIZATION,
  RESET_AMORTIZATION,
  SET_BEGIN_DATE
} from "../actions";
import { amortizationSchedule } from "amortization";
import update from "react-addons-update";

export const defaultState = {
  default: true,
  loanAmount: 200000,
  interestRate: 3.2,
  term: 10,
  beginDate: new Date(),
  isMortgage: false,
  taxRate: 1.5,
  insuranceAmount: 1000,
  amortization: []
};

export const resetState = {
  default: true,
  loanAmount: 200000,
  interestRate: 3.2,
  term: 10,
  beginDate: new Date(),
  isMortgage: false,
  taxRate: 1.5,
  insuranceAmount: 1000,
  amortization: []
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
      console.log("loanAmount", loanAmount);
      console.log("term", term);
      console.log("interestRate", interestRate);
      console.log("amortization", amortization);

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
    default:
      return state;
  }
}
