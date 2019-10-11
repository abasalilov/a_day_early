import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TermsOfService from "./TOS";
import Privacy from "./Privacy";

const styles = {
  ref: {
    margin: "2rem",
    textDecoration: "none",
    color: "#0C5297",
    paddingTop: "2rem"
  },
  section: { marginTop: "1rem" },
  links: { display: "flex", justifyContent: "center", margin: "2rem 1rem" }
};

const TermsPageComponent = props => {
  const { classes } = props;
  return (
    <section className={classes.section} id="terms">
      <div className={classes.links}>
        <a className={classes.ref} href="/terms#tos">
          <strong> Terms</strong>
        </a>
        <a className={classes.ref} href="/terms#privacy">
          <strong>Privacy</strong>
        </a>
      </div>
      <Grid container spacing={40} alignItems="flex-end">
        <TermsOfService />
      </Grid>
      <Grid container spacing={40} alignItems="flex-end">
        <Privacy />
      </Grid>
    </section>
  );
};

export const TermsPage = {
  component: withStyles(styles)(TermsPageComponent)
};

TermsPageComponent.propTypes = {
  classes: PropTypes.object.isRequired
};
