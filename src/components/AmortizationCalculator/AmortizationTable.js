import React from "react";
import { AmortizationTableRow } from "./AmortizationTableRow";
import { AmortizationTableHeader } from "./AmortizationTableHeader";
import { ScreenClassProvider } from "react-grid-system";

const getStyle = screen => {
  switch (screen) {
    case "xl":
    case "lg":
    case "md":
      return { fontSize: "12px" };
    default:
      return { fontSize: "8px" };
  }
};

const AmortizationTableComponent = props => (
  <ScreenClassProvider style={getStyle}>
    <div className="amortization-table">
      <AmortizationTableHeader />
      {props.input.amortization.map((row, index) => (
        <AmortizationTableRow input={props.input} row={row} key={index} />
      ))}
    </div>
  </ScreenClassProvider>
);

export const AmortizationTable = AmortizationTableComponent;
