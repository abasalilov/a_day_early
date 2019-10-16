import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CalculatorGraph } from "../../components/CalculatorGraph";

const styles = {
  container: {
    margin: "4rem"
  }
};

const CalculatorPageComponent = props => {
  const { classes } = props;
  return (
    <div>
      <div className={classes.container}>
        <CalculatorGraph />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  mobile: state.mobile,
  input: state.input
});

const ConnectedCalculatorPage = connect(
  mapStateToProps,
  null
)(withStyles(styles)(CalculatorPageComponent));

export const CalculatorPage = {
  component: ConnectedCalculatorPage
};
