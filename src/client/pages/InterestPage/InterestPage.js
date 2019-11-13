import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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

class InterestPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
  }

  componentDidMount() {}

  handleYes() {
    this.props.history.push("/lenders");
  }

  handleNo() {
    this.props.history.push("/calculator");
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography
          variant="h4"
          style={labelStyle}
          id="modal-title"
          align="left"
          gutterBottom
        >
          Your interest rate is above today's going rate, would you like to get
          some information and options from a lender? Here's how much you can
          save:{" "}
        </Typography>
        <Grid
          container
          spacing={8}
          justify="center"
          alignItems="center"
          direction={"row"}
        >
          <Grid item xs={4}>
            <Button
              onClick={this.handleYes}
              variant="outlined"
              size="large"
              color="primary"
              style={{
                width: "80%",
                margin: "3rem",
                fontSize: "1rem"
              }}
            >
              Yes
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={this.handleNo}
              variant="outlined"
              size="large"
              color="primary"
              style={{
                width: "80%",
                margin: "3rem",
                fontSize: "1rem"
              }}
            >
              No thank you
            </Button>
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

const ConnectedInterestPage = connect(
  mapStateToProps,
  null
)(withStyles(styles)(InterestPageComponent));

export const InterestPage = {
  component: ConnectedInterestPage
};
