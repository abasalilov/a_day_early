import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Close from "@material-ui/icons/Close";
import { StyledButton, FormField } from "../../components/common";
import {
  registerUser as createRegisterUserAction,
  confirmUniqueUsername
} from "../../actions";
import {
  required,
  alphaNumeric,
  minLength6,
  email,
  confirmValue,
  isUUIDError
} from "../../utils";

const asyncValidate = (values, dispatch) => {
  if (values.username_email) {
    return dispatch(confirmUniqueUsername(values.username_email));
  }
  return sleep(10).then(a => console.log("a", a));
};

const validate = values => {
  const errors = {};
  if (values.registerPassword && values.confirmPassword) {
    if (values.registerPassword !== values.confirmPassword) {
      errors.registerPassword = "Passwords do not match";
      errors.confirmPassword = "Passwords do not match";
    }
  }
  return errors;
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function getModalStyle(mobile) {
  return {
    top: "30%",
    left: mobile ? "25%" : "35%",
    transform: `translate(-20%, -25%)`,
    width: mobile ? "75%" : "50%"
  };
}

const onSubmit = (values, dispatch, props) =>
  dispatch(createRegisterUserAction(values));

const styles = theme => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    margin: "1rem",
    height: "80%",
    display: "flex",
    justifyContent: "center",
    overflowY: "visible"
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  modalCloseBtn: {
    border: "solid black 1px",
    borderRadius: "50%",
    alignSelf: "center",
    margin: "3rem auto 0 auto",
    fontSize: "5rem"
  },
  btnContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3rem",
    flexDirection: "column"
  },
  modalRoot: {
    flexGrow: 1,
    height: "100%",
    overflowY: "scroll"
  },
  btn: {
    margin: "1rem auto",
    width: "90%",
    fontSize: "1rem"
  },
  link: {
    margin: "1rem",
    fontSize: "4rem auto 0 auto"
  },
  buttons: {
    display: "flex",
    justifyContent: "center"
  },
  mobileLink: {
    margin: "3rem auto 0 auto"
  },
  linkContainer: {
    color: "black",
    whiteSpace: "pre"
  },
  field: {
    justifyContent: "center"
  },
  regLink: {
    textDecoration: "none",
    color: "#0C5297"
  },
  title: {
    margin: "2rem 0",
    fontSize: "4rem"
  }
});

const RegistrationModalComponent = props => {
  const {
    classes,
    open,
    closeClick,
    mobile,
    confirmUserNameMsg,
    handleSubmit,
    pristine,
    submitting,
    registered
  } = props;
  const error = isUUIDError(confirmUserNameMsg)
    ? confirmUserNameMsg
    : undefined;
  const emailError = { error, touched: true };
  /*eslint-disable*/
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
    >
      <div style={getModalStyle(mobile)} className={classes.paper}>
        <div className={classes.modalRoot}>
          <Grid
            container
            spacing={mobile ? 8 : 24}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item>
              <Typography
                variant="h5"
                align="center"
                color="textPrimary"
                className={classes.title}
                gutterBottom
              >
                Registration Form
              </Typography>
              <form onSubmit={handleSubmit}>
                <Field
                  name="username_email"
                  type="text"
                  className={classes.field}
                  placeholder="Enter email address"
                  margin={"none"}
                  label="Email/Username"
                  mobile={mobile}
                  showborder
                  emailError={emailError}
                  meta={emailError}
                  component={FormField}
                  validate={[required, email, minLength6]}
                  warn={alphaNumeric}
                />
                <Field
                  type="text"
                  label="First Name"
                  name="firstName"
                  placeholder="Erlich"
                  margin={"none"}
                  mobile={mobile}
                  component={FormField}
                  validate={[required]}
                  warn={alphaNumeric}
                  className={classes.field}
                />
                <Field
                  type="text"
                  className={classes.field}
                  label="Last Name"
                  name="lastName"
                  placeholder="Bachman"
                  margin={"none"}
                  mobile={mobile}
                  component={FormField}
                  validate={[required]}
                  warn={alphaNumeric}
                />
                <Field
                  type="password"
                  label="Enter a Password"
                  name="registerPassword"
                  placeholder="password1"
                  margin={"none"}
                  className={classes.field}
                  mobile={mobile}
                  component={FormField}
                  validate={[required, minLength6]}
                  warn={alphaNumeric}
                />
                <Field
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="password1"
                  margin={"none"}
                  className={classes.field}
                  mobile={mobile}
                  component={FormField}
                  validate={[required, minLength6]}
                  warn={alphaNumeric}
                />
                <div className={classes.buttons}>
                  <StyledButton
                    type="submit"
                    label="Register"
                    onSubmit={handleSubmit}
                    className={classes.btn}
                    disabled={pristine || submitting}
                    mobile={mobile}
                  />
                </div>
              </form>
              <div className={classes.btnContainer}>
                {registered ? closeClick() : ""}
                <span className={mobile ? classes.mobileLink : classes.link}>
                  <Typography
                    variant={mobile ? "h3" : "h6"}
                    align="center"
                    color="textPrimary"
                    gutterBottom
                  >
                    Have an account?
                    <Link
                      className={classes.regLink}
                      to="/login#register"
                      onClick={closeClick}
                    >
                      <strong> Sign In</strong>
                    </Link>
                  </Typography>
                </span>
                <Close onClick={closeClick} className={classes.modalCloseBtn} />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Modal>
  );
};
/*eslint-enable*/

const registrationForm = reduxForm({
  form: "registration", // a unique identifier for this form
  validate,
  asyncValidate,
  onSubmit,
  asyncBlurFields: ["username_email", "confirmPassword"]
})(withStyles(styles)(RegistrationModalComponent));

const mapStateToProps = state => {
  return {
    registered: state.users.registered,
    confirmUserNameMsg: confirmValue(state.users.confirmUserNameMsg),
    mobile: state.mobile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: user => {
      dispatch(createRegisterUserAction(user));
    }
  };
};

const ConnectedRegistrationForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(registrationForm);

export const RegistrationModal = ConnectedRegistrationForm;

RegistrationModalComponent.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  closeClick: PropTypes.func,
  mobile: PropTypes.bool,
  pristine: PropTypes.bool,
  open: PropTypes.bool,
  submitting: PropTypes.bool,
  registered: PropTypes.bool
};
