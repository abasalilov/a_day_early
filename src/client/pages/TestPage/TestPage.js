import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { routePrograms } from "../../actions";
import { MobiNav } from "../../components/navigation";

const styles = {
  container: {
    margin: "4rem"
  }
};

const topLabelStyle = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem",
  margin: "6rem 1rem 1rem 2rem"
};

const labelStyle = {
  color: "#3f51b5"
  // textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
};

const sectionStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  border: "solid #317439 1px",
  padding: "1rem",
  borderRadius: "1rem"
};

class TestPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleADayEarly = this.handleADayEarly.bind(this);
    this.handleLeapFrog = this.handleLeapFrog.bind(this);
    this.handleJumpStart = this.handleJumpStart.bind(this);
    this.handleEasyStart = this.handleEasyStart.bind(this);
    this.handleFlexPay = this.handleFlexPay.bind(this);
    this.handleRoundUp = this.handleRoundUp.bind(this);
  }

  componentDidMount() {}

  handleADayEarly() {
    this.props.routeToProgram(["ADE", "One Day Early"]);
    this.props.history.push("/calculator");
  }

  handleLeapFrog() {
    this.props.routeToProgram(["LF", "LeapFrog"]);
    this.props.history.push("/calculator");
  }

  handleFlexPay() {
    const fp = [
      "FP",
      "FlexPay",
      "Dropdown is calculator with these fields:",
      "Extra principal payment amount:",
      "Payment date:",
      "(+ add an additional payment)",
      "Show interest savings, time saved and new payoff date",
      "Let’s get registered and accelerate (button)",
      "*your campaign(s) can be modified at any time"
    ];
    this.props.routeToProgram(["FLEX", "FlexPay"]);
    this.props.history.push("/calculator");
  }

  handleEasyStart() {
    const es = [
      "ES",
      "Easy Start",
      "Interactive Amortization schedule click any future principal payment you want to prepay and see how much you can save.",
      "After user clicks calculate show:  interest savings, time saved and new payoff date",
      "Let’s get registered and accelerate (button)"
    ];

    this.props.routeToProgram(["ES", "EasyStart"]);
    this.props.history.push("/calculator");
  }

  handleJumpStart() {
    const js = [
      "JS",
      "Jump Start",
      "Mortgage Snapshot",
      "Adjust payoff date and extra principal payment amount to see how you can reach your goals.",
      "If I pay an extra $___________ in principal each month my mortgage will be paid off by ____________(date) Calculate (button)",
      "After user clicks calculate show:  interest savings, time saved and new payoff date",
      "Let’s get registered and accelerate (button)",
      "*your campaign(s) can be modified at any time"
    ];
    this.props.routeToProgram(["JS", "JumpStart"]);
    this.props.history.push("/calculator");
  }
  handleRoundUp() {
    const ru = [
      "RU",
      "Round Up",
      "Dropdown is Calculator with these fields:",
      "Round to nearest: drop down with pick one $100, $500, $1000",
      "One time or recurring? (hotlinks)",
      "Show interest savings, time saved and new payoff date",
      "Let’s get registered and accelerate (button)",
      "*your campaign(s) can be modified at any time"
    ];
    this.props.routeToProgram(["RU", "RoundUp"]);
    this.props.history.push("/calculator");
  }

  render() {
    return <div style={{ marginTop: "6rem" }}>Here</div>;
  }
}

const mapStateToProps = state => ({
  mobile: state.mobile,
  input: state.input
});

const mapDispatchToProps = dispatch => {
  return {
    routeToProgram: msg => dispatch(routePrograms(msg))
  };
};

const ConnectedProgramsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TestPageComponent));

export const TestPage = {
  component: ConnectedProgramsPage
};
