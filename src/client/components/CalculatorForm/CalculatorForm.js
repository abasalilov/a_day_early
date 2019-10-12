import React from "react";
import { InputForm } from "../AmortizationCalculator/InputForm";

class CalculatorFormComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <InputForm />
      </div>
    );
  }
}

export const CalculatorForm = CalculatorFormComponent;
