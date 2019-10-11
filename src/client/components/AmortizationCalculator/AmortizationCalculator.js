import React, { Component } from "react";
import { AmortizationCalcApp } from "./AmortizationCalcApp";
import { Col, Container } from "react-grid-system";

const colStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

class AmortizationCalculatorComponent extends Component {
  render() {
    return (
      <Container style={colStyle}>
        <Col xs={12} xl={6} offset={{ md: 1, lg: 1, xl: 3 }}>
          <AmortizationCalcApp />
        </Col>
      </Container>
    );
  }
}

export const AmortizationCalculator = AmortizationCalculatorComponent;
