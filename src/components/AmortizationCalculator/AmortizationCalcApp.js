import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {
  updateAmortization as updateAmortizationCreate,
  resetAmortization as resetAmortizationCreate,
  setBeginDate as setBeginDateCreate
} from "../../actions";
import { InputForm } from "./InputForm";
import { Output } from "./Output";

const Header = () => (
  <div className="main-app-nav">
    <div>Amortization Calculator</div>
    <div className="tagline">
      Amortization Schedule for mortgages and other loans
    </div>
  </div>
);

class CalcApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      input,
      updateAmortization,
      resetAmortization,
      setBeginDate
    } = this.props;

    return (
      <React.Fragment>
        <Header />
        <div className="main-app-container">
          <div className="input-container">
            <InputForm
              input={input}
              updateAmortization={updateAmortization}
              resetAmortization={resetAmortization}
              setBeginDate={setBeginDate}
            />
          </div>
          <div className="output-container">
            <Output input={input} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    input: state.input
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateAmortization: () => {
      dispatch(updateAmortizationCreate());
    },
    resetAmortization: () => {
      dispatch(resetAmortizationCreate());
    },
    setBeginDate: date => {
      dispatch(setBeginDateCreate(date));
    }
  };
};

export const AmortizationCalcApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalcApp);
