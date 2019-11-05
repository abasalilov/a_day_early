import React from "react";
import { InputForm } from "../AmortizationCalculator/InputForm";

class CalculatorFormComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidUpdate() {}

  render() {
    const { anticipated, onCalculate } = this.props;
    return (
      <InputForm onChangeMortValues={onCalculate} anticipated={anticipated} />
    );
  }
}

export const CalculatorForm = CalculatorFormComponent;
