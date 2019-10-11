import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import { adeLoginSubmit as createAuthReqActionCreator } from "../../actions";
import { StyledButton, FormField } from "../../components/common";
import { Loading } from "../../components/navigation";
import { RegistrationModal } from "../../components/modals";
import { Image } from "../../components/common";
import {
  required,
  alphaNumeric,
  maxLength15,
  minLength2,
  minLength6,
  email
} from "../../utils";

const onSubmit = (values, dispatch, props) => {
  const { username, password } = values;
  dispatch(createAuthReqActionCreator(username, password));
};

const styles = {
  login: {
    textAlign: "center"
  },
  mobileLogin: {
    textAlign: "center"
  },
  label: {
    color: "#2C4F4D",
    fontSize: "1.5rem",
    margin: "1.5rem"
  },
  mobileLabel: {
    fontSize: "5rem",
    color: "#2C4F4D",
    margin: "4rem"
  },
  loginField: {
    margin: "2rem 1.5rem 1.5rem 1.5rem"
  },
  welcome: {
    margin: "4rem",
    textAlign: "center",
    fontSize: "2.3rem"
  },
  field: {
    width: "95%",
    borderBottom: "2rem"
  },
  spinContainer: {
    position: "relative",
    display: "flex",
    margin: "1rem auto",
    flexDirection: "column"
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  btn: {
    margin: "1rem auto",
    width: "50% !important"
  },
  err: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem auto",
    color: "red"
  },
  noErr: {
    display: "flex",
    visibility: "hidden",
    flexDirection: "column",
    margin: "1rem auto"
  },
  link: {
    margin: "1rem auto",
    color: "#2C4F4D",
    fontSize: "1.5rem"
  },
  mobileLink: {
    fontSize: "3rem",
    color: "#2C4F4D",
    whiteSpace: "pre",
    marginTop: "3rem"
  },
  img: {
    width: "18rem"
  },
  mobileImg: {
    marginBottom: "1rem",
    width: "40%"
  },
  mobileRoot: {
    flexGrow: 1,
    marginTop: "12rem"
  },
  root: {
    flexGrow: 1,
    marginTop: "4rem"
  },
  spinner: {
    background: "#4267b2",
    borderRadius: "5px",
    color: "white",
    height: "40px",
    textAlign: "center",
    width: "250px",
    margin: "2rem auto"
  },
  regLink: {
    textDecoration: "none",
    color: "#0C5297"
  },
  mobileLoginForm: {},
  loginForm: {},
  picContainer: {
    height: "18rem",
    marginBottom: "2rem"
  },
  mobilePic: {
    width: "22rem",
    verticalAlign: "middle",
    display: "block",
    margin: "auto"
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      componentIsSet: false
    };

    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  componentDidMount() {}

  renderRightSide() {
    return <RightSideContent />;
  }

  renderWelcome() {
    const { classes } = this.props;
    return (
      <div className={classes.welcome}>
        <span>
          Welcome! You have been successfully registered. Please login to
          continue to your personalized dashboard
        </span>
      </div>
    );
  }

  renderLabel() {
    const { classes, mobile } = this.props;
    return (
      <div className={mobile ? classes.mobileLabel : classes.label}>
        <strong>Login with email</strong>
      </div>
    );
  }

  handleToggleModal() {
    const { showModal } = this.state;
    if (showModal) {
      this.setState({
        showModal: false
      });
    } else {
      this.setState({
        showModal: true
      });
    }
  }

  setComponent() {
    this.setState({ componentIsSet: true });
  }

  renderRegLink() {
    const { classes, mobile } = this.props;
    const linkName = mobile ? classes.mobileLink : classes.link;
    const tagline = "Don't have an account? ";
    return (
      <span className={linkName}>
        {tagline}
        <strong onClick={this.handleToggleModal}>Register</strong>
        <br />
      </span>
    );
  }

  render() {
    const {
      auth,
      classes,
      handleSubmit,
      history,
      makeAuthReq,
      mobile,
      newUserRegistered,
      pristine,
      reset,
      submit,
      submitting
    } = this.props;
    const { showModal, componentIsSet } = this.state;
    const minWidth = mobile ? "100%" : "22rem";
    const gridName = mobile ? classes.mobileLogin : classes.login;
    const rootName = mobile ? classes.mobileRoot : classes.root;
    const imgClass = mobile ? classes.mobileImg : classes.img;
    const containerClass = mobile ? classes.mobilePic : classes.picContainer;

    if (!componentIsSet) {
      this.setComponent();
      return <Loading />;
    }

    if (showModal) {
      return (
        <RegistrationModal
          open={showModal}
          mobile={mobile}
          closeClick={this.handleToggleModal}
        />
      );
    }
    return (
      <div className={rootName}>
        {newUserRegistered ? this.renderWelcome() : ""}
        <Grid
          container
          spacing={mobile ? 8 : 24}
          justify="space-between"
          alignItems="center"
          direction={"column"}
          className={gridName}
        >
          <Grid item xs={12} md={6} style={{ minWidth }}>
            <Image
              containerClassName={containerClass}
              imgClassName={imgClass}
              src={
                "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1529793665/ade_logo.png"
              }
            />
            <form
              className={mobile ? classes.mobileLoginForm : classes.loginForm}
              onSubmit={handleSubmit}
            >
              {this.renderLabel()}
              <div className={mobile ? classes.loginField : undefined}>
                <Field
                  name="username"
                  type="text"
                  mobile={mobile}
                  showborder={1}
                  component={FormField}
                  className={classes.field}
                  label="Email/Username"
                  validate={[required, minLength6, email]}
                  warn={alphaNumeric}
                />
              </div>
              <div className={mobile ? classes.loginField : undefined}>
                <Field
                  name="password"
                  type="password"
                  mobile={mobile}
                  showborder={1}
                  className={classes.field}
                  component={FormField}
                  placeholder="Enter Password"
                  label="Password"
                  validate={[required, maxLength15, minLength2]}
                  warn={alphaNumeric}
                />
              </div>
              <div className={classes.spinContainer}>
                <div className={classes.buttons}>
                  <StyledButton
                    label="Sign In"
                    type="submit"
                    mobile={mobile}
                    onSubmit={handleSubmit}
                    color="primary"
                    className={classes.btn}
                  />
                </div>
                {this.renderRegLink()}
                <div className={getAuthBoolClassName(auth, classes)}>
                  <span>username (email) and/or password did not match </span>
                </div>
                {confirmNav(auth) ? history.push("/dash") : ""}
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    newUserRegistered: state.users.registered,
    mobile: state.mobile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    makeAuthReq: (userEml, pw) =>
      dispatch(createAuthReqActionCreator(userEml, pw))
  };
};

const LoginFormWithStyles = withStyles(styles)(
  reduxForm({
    form: "Login", // a unique identifier for this form
    onSubmit
  })(Login)
);

const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormWithStyles);

export const LoginPage = {
  component: ConnectedLogin
};

Login.propTypes = {
  makeAuthReq: PropTypes.func,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  submit: PropTypes.func,
  auth: PropTypes.object,
  mobile: PropTypes.bool,
  newUserRegistered: PropTypes.bool,
  history: PropTypes.object
};

function getAuthBoolClassName(auth, classes) {
  const { attempted, result } = auth;
  if (attempted === false) {
    return classes.noErr;
  } else if (result === "OK") {
    return classes.noErr;
  }
  return classes.err;
}

function confirmNav(auth) {
  const { attempted, result } = auth;
  if (attempted === true && result === "OK") {
    return true;
  }
  return false;
}

function confirmValue(data) {
  if (typeof data === "undefined") {
    return "";
  } else {
    return data;
  }
}
