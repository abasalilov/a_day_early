import React from "react";
import { Doughnut } from "react-chartjs-2";

class SummaryDonutComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return <Doughnut data={this.props.data} />;
  }
}

export const SummaryDonut = SummaryDonutComponent;
