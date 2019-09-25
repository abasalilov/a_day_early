import React, { Component } from "react";
import { AmortizationCalcApp } from "./AmortizationCalcApp";
import { Col, Container } from "react-grid-system";

class AmortizationCalculatorComponent extends Component {
  render() {
    return (
      <Container style={{ width: "100%" }}>
        <Col
          xs={12}
          sm={12}
          md={10}
          lg={8}
          xl={6}
          offset={{ md: 1, lg: 2, xl: 3 }}
        >
          <AmortizationCalcApp />
        </Col>
      </Container>
    );
  }
}

export const AmortizationCalculator = AmortizationCalculatorComponent;
