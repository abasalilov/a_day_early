import React from "react";
import { connect } from "react-redux";
// import Countdown from "react-countdown-now";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Image } from "../../components/common";

const updatedLabelStyle = {
  color: "#317439",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem",
  marginTop: "3rem"
};

class CountDownPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hrs: 0,
      days: 0,
      min: 0
    };

    this.handleTimerSet = this.handleTimerSet.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.handleTimerSet();
    }, 1000);
  }

  handleTimerSet() {
    let startDate = new Date();
    // Do your operations
    let endDate = new Date(1575835260000);
    let seconds = (
      (Math.floor(endDate.getTime() - startDate.getTime()) / 1000) %
      60
    ).toFixed(0);
    let secondsCalc =
      Math.floor(endDate.getTime() - startDate.getTime()) / 1000;
    let min = Math.floor(secondsCalc / 60) % 60;
    let hrs = Math.floor(((secondsCalc / 3600) % 24).toFixed(1));
    let days = Math.floor(secondsCalc / 3600 / 24);
    this.setState({ min, hrs, days });
  }

  render() {
    const { hrs, min, days } = this.state;
    return (
      <Grid
        container
        spacing={8}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          xs={10}
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <Typography variant="h4" style={updatedLabelStyle} align="center">
            <Typography variant="h1" style={updatedLabelStyle} align="center">
              {`${days} days`}
            </Typography>
            {` ${hrs} hours and ${min} minutes until A Day Early will be available.`}
          </Typography>
        </Grid>
        <Grid item xs={8} style={{ width: "100%" }}>
          <Image
            style={{
              width: "600px",
              width: "100%"
            }}
            showSpinner={false}
            src={
              "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1571170225/adeLogo.png"
            }
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  mobile: state.mobile
});

const ConnectedCountDownPage = connect(
  mapStateToProps,
  null
)(CountDownPageComponent);

export const CountDownPage = {
  component: ConnectedCountDownPage
};
