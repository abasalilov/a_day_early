import React from "react";
import { connect } from "react-redux";
import Countdown from "react-countdown-now";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Image } from "../../components/common";

const updatedLabelStyle = {
  color: "#317439",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem",
  marginTop: "8rem"
};

const CountDownPageComponent = props => {
  return (
    <Grid container spacing={8} alignItems="center" direction={"column"}>
      <Grid item xs={6}>
        <Typography
          variant="h4"
          style={updatedLabelStyle}
          id="modal-title"
          align="center"
          gutterBottom
        >
          A Day Early will be available on Monday, December 9th, 2019
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Image
          style={{ width: "500px" }}
          showSpinner={false}
          src={
            "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1571170225/adeLogo.png"
          }
        />
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant="h3"
          style={updatedLabelStyle}
          id="modal-title"
          align="center"
          gutterBottom
        >
          <Countdown date={new Date(1575878400000)} />
        </Typography>
      </Grid>
    </Grid>
  );
};

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
