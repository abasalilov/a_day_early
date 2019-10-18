import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CalculatorGraph } from "../../components/CalculatorGraph";

const styles = {
  container: {
    margin: "4rem"
  }
};

class CalculatorPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // TODO: UNCOMMENT DURING DEPLOYMENT
    // let redirect = this.props.input.canCalculate;
    // if (redirect) {
    //   this.props.history.push("/home#basics");
    // }
  }

  render() {
    const { classes, input } = this.props;
    return (
      <div className={classes.container}>
        <CalculatorGraph {...input} />
      </div>
    );
  }
}

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
