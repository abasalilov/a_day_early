import {
  UPDATE_AMORTIZATION,
  RESET_AMORTIZATION,
  SET_BEGIN_DATE,
  UPDATE_AMORT_GRAPH,
  UPDATE_INFO_FORM,
  ROUTE_PROGRAMS,
  UPDATE_PAYPAL_AMOUNT
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
  canCalculate: false,
  hasError: false,
  missingFields: [""],
  program: null,
  programMessage: [],
  payPalAmount: 0
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
  canCalculate: false,
  hasError: false,
  missingFields: [""],
  program: null,
  programMessage: [],
  payPalAmount: 0
};

function checkForMissingFields(fields) {
  let hasInterest = false;
  let hasAmount = false;
  let hasTerm = false;
  let missing = [];
  fields.map(field => {
    if (field === "loanAmount") {
      hasAmount = true;
    }
    if (field === "interestRate") {
      hasInterest = true;
    }
    if (field === "term") {
      hasTerm = true;
    }
  });
  const hasRequiredFields = hasAmount && hasInterest && hasTerm;
  if (!hasRequiredFields) {
    if (!hasAmount) {
      missing.push("loanAmount");
    }
    if (!hasInterest) {
      missing.push("interestRate");
    }
    if (!hasTerm) {
      missing.push("term");
    }
  }
  return { hasRequiredFields, missing };
}

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

    case UPDATE_PAYPAL_AMOUNT:
      const payPalAmountState = Object.assign({}, state);

      return payPalAmountState;
    case UPDATE_AMORT_GRAPH:
      const { st } = action;
      // TODO: DO YOU NEED THESE?
      // const { monthlyPayment } = calculate(
      //   st.loanAmount,
      //   st.term,
      //   st.interestRate
      // );
      const updatedState = Object.assign({}, state);
      updatedState.currentLoanAmount = st.currentLoanAmount;
      updatedState.interestRate = st.interestRate;
      updatedState.loanAmount = st.loanAmount;
      updatedState.originationDate = st.originationDate;
      updatedState.payOffDate = st.payOffDate;
      updatedState.paymentAmount = st.paymentAmount;
      updatedState.term = st.term;

      return updatedState;
    case UPDATE_INFO_FORM:
      const updatedInfoFormState = Object.assign({}, state);
      updatedInfoFormState.currentLoanAmount = action.st.currentLoanAmount;
      updatedInfoFormState.interestRate = action.st.interestRate;
      updatedInfoFormState.loanAmount = action.st.loanAmount;
      updatedInfoFormState.originationDate = action.st.originationDate;
      updatedInfoFormState.payOffDate = action.st.payOffDate;
      updatedInfoFormState.paymentAmount = action.st.paymentAmount;
      updatedInfoFormState.term = action.st.term;

      const canCalculate = Object.keys(action.st).filter(item => {
        return action.st[item] !== null;
      });

      const hasMissingFields = checkForMissingFields(canCalculate);
      const shouldCalculate = canCalculate.length >= 3;
      if (shouldCalculate) {
        const { monthlyPayment } = calculate(
          +action.st.loanAmount,
          +action.st.term,
          +action.st.interestRate
        );
        const paymentToReview = monthlyPayment;

        updatedInfoFormState.payPalAmount = paymentToReview;
      }
      updatedInfoFormState.canCalculate = shouldCalculate;
      updatedInfoFormState.missingFields = hasMissingFields.missing;
      return updatedInfoFormState;
    case ROUTE_PROGRAMS:
      const updatedMsgState = Object.assign({}, state);
      updatedMsgState.program = action.msg[0];
      updatedMsgState.programMessage = action.msg.slice(1);
      return updatedMsgState;
    default:
      return state;
  }
}
