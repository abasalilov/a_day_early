import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  container: {
    margin: "4rem"
  }
};

const labelStyle = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem"
};

class LendersPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
  }

  componentDidMount() {
    console.log("props", this.props);
  }

  handleYes() {
    this.props.history.push("/lenders");
  }

  handleNo() {
    this.props.history.push("/calculator");
  }

  render() {
    const { classes, input, history } = this.props;
    return (
      <div className={classes.container}>
        <Typography
          variant="h5"
          align="left"
          gutterBottom
          className={classes.adeText}
        >
          Lenders' Page Placeholder
        </Typography>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mobile: state.mobile,
  input: state.input
});

const ConnectedLendersPage = connect(
  mapStateToProps,
  null
)(withStyles(styles)(LendersPageComponent));

export const LendersPage = {
  component: ConnectedLendersPage
};
