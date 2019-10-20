import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { routePrograms } from "../../actions";

const styles = {
  container: {
    margin: "4rem"
  }
};

const labelStyle = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem",
  marginTop: "6rem"
};

class ProgramsPageComponent extends React.Component {
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
    this.props.routeToProgram(["A Day Early"]);
    this.props.history.push("/calculator");
  }

  handleLeapFrog() {
    this.props.routeToProgram(["LeapFrog"]);
    this.props.history.push("/calculator");
  }

  handleFlexPay() {
    const fp = [
      "FlexPay",
      "Dropdown is calculator with these fields:",
      "Extra principal payment amount:",
      "Payment date:",
      "(+ add an additional payment)",
      "Show interest savings, time saved and new payoff date",
      "Let’s get registered and accelerate (button)",
      "*your campaign(s) can be modified at any time"
    ];
    this.props.routeToProgram(fp);
    this.props.history.push("/calculator");
  }

  handleEasyStart() {
    const es = [
      "Easy Start",
      "Interactive Amortization schedule click any future principal payment you want to prepay and see how much you can save.",
      "After user clicks calculate show:  interest savings, time saved and new payoff date",
      "Let’s get registered and accelerate (button)"
    ];

    this.props.routeToProgram(es);
    this.props.history.push("/calculator");
  }
  handleJumpStart() {
    const js = [
      "Jump Start",
      "Mortgage Snapshot",
      "Adjust payoff date and extra principal payment amount to see how you can reach your goals.",
      "If I pay an extra $___________ in principal each month my mortgage will be paid off by ____________(date) Calculate (button)",
      "After user clicks calculate show:  interest savings, time saved and new payoff date",
      "Let’s get registered and accelerate (button)",
      "*your campaign(s) can be modified at any time"
    ];
    this.props.routeToProgram(js);
    this.props.history.push("/calculator");
  }
  handleRoundUp() {
    const ru = [
      "Round Up",
      "Dropdown is Calculator with these fields:",
      "Round to nearest: drop down with pick one $100, $500, $1000",
      "One time or recurring? (hotlinks)",
      "Show interest savings, time saved and new payoff date",
      "Let’s get registered and accelerate (button)",
      "*your campaign(s) can be modified at any time"
    ];
    this.props.routeToProgram(ru);
    this.props.history.push("/calculator");
  }

  render() {
    return (
      <div>
        <Typography
          variant="h4"
          style={labelStyle}
          id="modal-title"
          align="left"
          gutterBottom
        >
          Choose a program (or a combination best for you):
        </Typography>
        <Grid
          container
          spacing={8}
          justify="center"
          alignItems="center"
          direction={"row"}
        >
          <Grid item xs={8}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Typography
                variant="h4"
                style={labelStyle}
                variant="outlined"
                color="primary"
                style={{
                  width: "80%",
                  fontSize: "1rem"
                }}
              >
                <a onClick={this.handleADayEarly}>OneDayEarly</a> - make a one
                time extra principal payment and see the exponential effect of
                time and money.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={8}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Typography
                variant="h4"
                style={labelStyle}
                variant="outlined"
                color="primary"
                style={{
                  width: "80%",
                  fontSize: "1rem"
                }}
              >
                <a onClick={this.handleRoundUp}>RoundUp</a> - round your payment
                up to the nearest $100, $1000 or create your own round up and
                see the effects! $100 / $1000 (show One time and Lifetime of
                Loan savings when hovered over).
              </Typography>
            </div>
          </Grid>
          <Grid item xs={8}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Typography
                variant="h4"
                style={labelStyle}
                variant="outlined"
                color="primary"
                style={{
                  width: "80%",
                  fontSize: "1rem"
                }}
              >
                <a onClick={this.handleFlexPay}>FlexPay</a> - set up a custom
                payment campaign.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={8}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Typography
                variant="h4"
                style={labelStyle}
                variant="outlined"
                color="primary"
                style={{
                  width: "80%",
                  fontSize: "1rem"
                }}
              >
                <a onClick={this.handleEasyStart}>EasyStart</a> - get started
                now accelerating your current loan.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={8}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Typography
                variant="h4"
                style={labelStyle}
                variant="outlined"
                color="primary"
                style={{
                  width: "80%",
                  fontSize: "1rem"
                }}
              >
                <a onClick={this.handleLeapFrog}>LeapFrog</a> - jump ahead to
                any months payment on your amortization schedule, pay the
                principal portion now, aDayEarly, and NEVER pay the associated
                interest. EVER.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={8}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Typography
                variant="h4"
                style={labelStyle}
                variant="outlined"
                color="primary"
                style={{
                  width: "80%",
                  fontSize: "1rem"
                }}
              >
                <a onClick={this.handleJumpStart}>JumpStart</a> - use at
                origination of your loan, making the first extra principal
                payment aDayEarly affecting the amortization schedule before it
                started!
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    );
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
)(withStyles(styles)(ProgramsPageComponent));

export const ProgramsPage = {
  component: ConnectedProgramsPage
};