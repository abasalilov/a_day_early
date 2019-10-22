import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CalculatorGraph } from "../../components/CalculatorGraph";
import { ProgramCalculatorGraph } from "../../components/ProgramCalculatorGraph";

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
    // const intRt = Number(this.props.input.interestRate || 2);
    // TODO: UNCOMMENT DURING DEPLOYMENT
    // let redirect = !this.props.input.canCalculate;
    // if (redirect) {
    //   this.props.history.push("/home#basics");
    // }
  }

  render() {
    const { classes, input, history } = this.props;
    let showMessages = input.programMessage.length > 0;
    let program = input.program;
    if (program === null) {
      return (
        <div className={classes.container}>
          <CalculatorGraph
            {...input}
            showMessages={showMessages}
            history={history}
          />
        </div>
      );
    } else {
      return (
        <div className={classes.container}>
          <ProgramCalculatorGraph
            {...input}
            program={program}
            showMessages={showMessages}
            history={history}
          />
        </div>
      );
    }
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
