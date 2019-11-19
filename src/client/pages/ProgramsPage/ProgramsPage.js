import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { routePrograms } from "../../actions";

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
    return (
      <div style={{ marginTop: "6rem" }}>
        <Typography
          variant="h4"
          style={topLabelStyle}
          align="center"
          gutterBottom
        >
          Choose a program (or a combination best for you):
        </Typography>
        <Grid
          container
          spacing={10}
          justify="center"
          alignItems="center"
          direction={"column"}
        >
          <Grid
            container
            spacing={10}
            justify="center"
            alignItems="flex-start"
            direction={"row"}
            style={{ marginTop: "2rem" }}
          >
            <Grid item xs={4}>
              <Button
                style={sectionStyle}
                variant="outlined"
                size="large"
                color="primary"
                style={{
                  margin: "2rem",
                  fontSize: "1rem",
                  width: "20rem",
                  height: "16rem"
                }}
              >
                <Typography
                  style={labelStyle}
                  variant="h5"
                  color="primary"
                  align="left"
                  onClick={this.handleADayEarly}
                >
                  OneDayEarly:
                  <Typography
                    style={labelStyle}
                    variant="h6"
                    color="primary"
                    align="left"
                  >
                    make a one time extra principal payment and see the
                    exponential effect of time and money.
                  </Typography>
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                style={sectionStyle}
                variant="outlined"
                size="large"
                color="primary"
                style={{
                  margin: "2rem",
                  fontSize: "1rem",
                  width: "20rem",
                  height: "18rem"
                }}
              >
                <Typography
                  variant="h5"
                  align="left"
                  style={labelStyle}
                  color="primary"
                  onClick={this.handleRoundUp}
                >
                  RoundUp:
                  <Typography variant="h6" align="left" color="primary">
                    round your payment up to the nearest $100, $1000 or custom
                    round up amount and see the effects!{" "}
                  </Typography>
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={10}
            justify="center"
            alignItems="center"
            direction={"row"}
          >
            <Grid item xs={4}>
              <Button
                style={sectionStyle}
                variant="outlined"
                size="large"
                color="primary"
                style={{
                  margin: "2rem",
                  fontSize: "1rem",
                  width: "20rem",
                  height: "10rem"
                }}
              >
                <Typography
                  style={labelStyle}
                  variant="h5"
                  color="primary"
                  align="left"
                  onClick={this.handleFlexPay}
                >
                  FlexPay:
                  <Typography
                    style={labelStyle}
                    variant="h6"
                    color="primary"
                    align="left"
                  >
                    set up a custom payment campaign.
                  </Typography>
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                style={sectionStyle}
                variant="outlined"
                size="large"
                color="primary"
                style={{
                  margin: "2rem",
                  fontSize: "1rem",
                  width: "20rem",
                  height: "10rem"
                }}
              >
                <Typography
                  variant="h5"
                  align="left"
                  style={labelStyle}
                  color="primary"
                  onClick={this.handleEasyStart}
                >
                  EasyStart:
                  <Typography variant="h6" align="left" color="primary">
                    start accelerating your current loan.
                  </Typography>
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={10}
            justify="center"
            alignItems="flex-start"
            direction={"row"}
          >
            <Grid item xs={4}>
              <Button
                style={sectionStyle}
                variant="outlined"
                size="large"
                color="primary"
                style={{
                  margin: "2rem",
                  fontSize: "1rem",
                  width: "20rem",
                  height: "24rem"
                }}
              >
                <Typography
                  variant="h5"
                  align="left"
                  style={labelStyle}
                  color="primary"
                  onClick={this.handleLeapFrog}
                >
                  LeapFrog:
                  <Typography variant="h6" align="left" color="primary">
                    jump ahead to any months payment on your amortization
                    schedule, pay the principal portion now, aDayEarly, and
                    NEVER pay the associated interest. EVER.{" "}
                  </Typography>
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                style={sectionStyle}
                variant="outlined"
                size="large"
                color="primary"
                style={{
                  margin: "2rem",
                  fontSize: "1rem",
                  width: "20rem",
                  height: "22rem"
                }}
              >
                <Typography
                  style={labelStyle}
                  variant="h5"
                  color="primary"
                  align="left"
                  onClick={this.handleJumpStart}
                >
                  JumpStart:
                  <Typography
                    style={labelStyle}
                    variant="h6"
                    color="primary"
                    align="left"
                  >
                    use at origination of your loan, making the first extra
                    principal payment aDayEarly affecting the amortization
                    schedule before it starts!{" "}
                  </Typography>
                </Typography>
              </Button>
            </Grid>
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
