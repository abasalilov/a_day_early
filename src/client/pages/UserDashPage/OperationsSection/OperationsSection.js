import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  root: {
    backgroundColor: "yellow"
  },
  btn: {
    margin: "0 auto"
  },
  link: {
    margin: "0rem auto"
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    margin: "2rem auto"
  },
  mobileLink: {
    margin: "0rem auto",
    fontSize: "3rem"
  },
  linkContainer: {
    color: "#fff"
  },
  btmContainer: {
    display: "flex",
    justifyContent: "center"
  },
  field: {
    display: "flex",
    justifyContent: "center",
    margin: "2rem",
    opacity: "1"
  },
  header: {
    textAlign: "center"
  }
};

class OperationsSectionComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitBlog: false,
      selectedMedia: null
    };
  }

  render() {
    const { classes, className } = this.props;

    return (
      <div className={className}>
        <div className={classes.root}>
          <h1>asdfadslf</h1>
        </div>
      </div>
    );
  }
}

export const OperationsSection = withStyles(styles)(OperationsSectionComponent);
