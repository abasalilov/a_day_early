import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Close from "@material-ui/icons/Close";
import { StyledButton } from "../../components/common";
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
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import mobiscroll from "@mobiscroll/react";

function confirmError(err) {
  if (typeof err === "undefined") {
    return "";
  }
  if (err.indexOf("Passwords") !== -1) {
    return "redError";
  }
  if (err.indexOf("Good") !== -1) {
    return "greenError";
  } else if (err === "Required") {
    return "redError";
  }
  return "redError";
}

const onSubmit = (values, dispatch, props) =>
  dispatch(createRegisterUserAction(values));

const asyncValidate = (values, dispatch) => {
  if (values.username_email) {
    return dispatch(confirmUniqueUsername(values.username_email));
  }
  return sleep(10).then(a => console.log("a", a));
};

const renderTermSelect = props => {
  const { input, ...custom } = props;
  return (
    <div
      className="mbsc-col-8"
      style={{
        marginTop: "1rem",
        fontSize: "1rem"
      }}
    >
      <mobiscroll.Dropdown
        label={"Loan Term (Yrs)"}
        name="term"
        inputStyle="box"
        {...input}
        {...custom}
        labelStyle="floating"
        style={{
          border: "solid #049347 2px"
        }}
      >
        <option></option>
        <option value={15}>15</option>
        <option value={20}>20</option>
        <option value={25}>25</option>
        <option value={30}>30</option>
      </mobiscroll.Dropdown>
    </div>
  );
};

const renderAccountSelect = props => {
  const { input, ...custom } = props;

  return (
    <div
      className="mbsc-col-8"
      style={{
        marginTop: "1rem",
        fontSize: "1rem",
        marginLeft: ".8rem"
      }}
    >
      <mobiscroll.Dropdown
        label={"Account Type"}
        name="accountType"
        inputStyle="box"
        {...input}
        {...custom}
        labelStyle="floating"
        style={{
          border: "solid #049347 2px"
        }}
      >
        <option></option>
        <option value={"professional"}>Pro (one time charge of $29)</option>
        <option value={"free"}>Standard (free)</option>
      </mobiscroll.Dropdown>
    </div>
  );
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
    width: mobile ? "70%" : "65%"
  };
}

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    width: "100% !important",
    marginTop: "8px"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  paper: {
    position: "absolute",
    backgroundColor: "#cfe0f3 !important",
    boxShadow: theme.shadows[5],
    margin: "1rem",
    padding: "1rem",
    height: "90%",
    display: "flex",
    justifyContent: "center",
    overflowY: "visible",
    borderRadius: "1rem"
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
    fontSize: "2rem",
    marginBottom: "4rem"
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
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
    height: "80%"
    // overflowY: "scroll"
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
    justifyContent: "center",
    marginTop: "3rem"
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
    color: "#2D3190"
  },
  title: {
    margin: "2rem 0",
    fontSize: "4rem"
  }
});

const renderTextField = ({
  label,
  input,
  classes,
  meta: { touched, invalid, error },
  type,
  labelShrink,
  name,
  labelFontSize,
  placeholder,
  ...custom
}) => {
  return (
    <React.Fragment>
      <mobiscroll.Input
        placeholder={placeholder}
        invalid={touched && invalid}
        {...input}
        {...custom}
        inputStyle="box"
        type={type}
        labelStyle="floating"
        style={{
          border: "solid #049347 2px",
          fontSize: "1rem"
        }}
      >
        {label}
      </mobiscroll.Input>
      {touched && error && (
        <div id={confirmError(error)}>
          <mobiscroll.Note>{error}</mobiscroll.Note>
        </div>
      )}
    </React.Fragment>
  );
};

{
  /* <mobiscroll.Switch inputStyle="box">
Check to receive our monthly newsletter with tips and news
</mobiscroll.Switch> */
}

const renderNewsLetter = props => {
  const { input, ...custom } = props;

  return (
    <div
      className="mbsc-col-8"
      style={{
        marginTop: "1rem",
        fontSize: "1rem",
        marginLeft: ".8rem"
      }}
    >
      <mobiscroll.Switch
        inputStyle="box"
        name="newsLetter"
        inputStyle="box"
        {...input}
        {...custom}
        labelStyle="floating"
        style={{
          border: "solid #049347 2px"
        }}
      >
        Check to receive our monthly newsletter with tips and news
      </mobiscroll.Switch>
    </div>
  );
};

const renderEvent37 = props => {
  const { input, ...custom } = props;

  return (
    <div
      className="mbsc-col-8"
      style={{
        marginTop: "1rem",
        fontSize: "1rem",
        marginLeft: ".8rem"
      }}
    >
      <mobiscroll.Switch
        inputStyle="box"
        name="event37"
        inputStyle="box"
        {...input}
        {...custom}
        labelStyle="floating"
        style={{
          border: "solid #049347 2px"
        }}
      >
        Get a free pass to our Mortgage Payoff Event March 7 in Roseville, CA
      </mobiscroll.Switch>
    </div>
  );
};

class RegistrationModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(e) {
    e.preventDefault();
    const { formValues, registerUser } = this.props;
    await registerUser(formValues);
  }

  render() {
    const {
      classes,
      open,
      closeClick,
      mobile,
      confirmUserNameMsg,
      pristine,
      submitting,
      registered,
      handleSubmit,
      submit
    } = this.props;
    const error = isUUIDError(confirmUserNameMsg)
      ? confirmUserNameMsg
      : undefined;

    const emailError = { error, touched: true };
    /*eslint-disable*/
    return (
      <Modal
        aria-labelledby="ade-registration-title"
        aria-describedby="ade-registration-description"
        open={open}
      >
        <div style={getModalStyle(mobile)} className={classes.paper}>
          <mobiscroll.Form
            onSubmit={handleSubmit}
            className="md-grid-fixed"
            style={{
              background: "#cfe0f3"
            }}
            theme="ios"
            themeVariant="light"
          >
            <mobiscroll.FormGroup>
              <div className={classes.modalRoot}>
                <div className="mbsc-grid-fixed">
                  <div className="mbsc-col-12 mbsc-justify-content-center">
                    <div style={{ float: "right" }}>
                      <Close
                        onClick={closeClick}
                        className={classes.modalCloseBtn}
                      />
                    </div>
                    <div className="mbsc-row mbsc-justify-content-center">
                      <h1
                        style={{
                          color: "rgb(45, 49, 144)",
                          fontSize: "1.5rem"
                        }}
                      >
                        Registration Form
                      </h1>
                    </div>

                    <form className="mbsc-col-12 mbsc-justify-content-center">
                      <Field
                        name="username_email"
                        type="text"
                        className={classes.field}
                        placeholder="Enter email address"
                        label="Email/Username"
                        mobile={mobile}
                        showborder
                        emailError={emailError}
                        meta={emailError}
                        component={renderTextField}
                        validate={[required, email, minLength6]}
                        warn={alphaNumeric}
                      />
                      <Field
                        type="text"
                        label="First Name"
                        name="firstName"
                        placeholder="Don"
                        mobile={mobile}
                        component={renderTextField}
                        validate={[required]}
                        warn={alphaNumeric}
                        className={classes.field}
                      />
                      <Field
                        type="text"
                        className={classes.field}
                        label="Last Name"
                        name="lastName"
                        placeholder="Junkin"
                        mobile={mobile}
                        component={renderTextField}
                        validate={[required]}
                        warn={alphaNumeric}
                      />

                      <Field
                        type="password"
                        label="Enter a Password"
                        name="registerPassword"
                        placeholder="password1"
                        className={classes.field}
                        mobile={mobile}
                        component={renderTextField}
                        validate={[required, minLength6]}
                        warn={alphaNumeric}
                      />
                      <Field
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        placeholder="password1"
                        className={classes.field}
                        mobile={mobile}
                        component={renderTextField}
                        validate={[required, minLength6]}
                        warn={alphaNumeric}
                      />

                      <Field
                        name="accountType"
                        component={renderAccountSelect}
                        classes={classes}
                        validate={[required]}
                      />

                      <Field
                        name="event37"
                        component={renderEvent37}
                        classes={classes}
                        validate={[required]}
                      />

                      <Field
                        name="newsLetter"
                        component={renderNewsLetter}
                        classes={classes}
                        validate={[required]}
                      />

                      <div className={classes.buttons}>
                        <StyledButton
                          label="Register"
                          className={classes.btn}
                          disabled={pristine || submitting}
                          mobile={mobile}
                          onClick={this.handleClick}
                        />
                      </div>
                    </form>
                    <div className={classes.btnContainer}>
                      {registered ? closeClick() : ""}
                      <span className={classes.link}>
                        <Typography
                          variant={"h6"}
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
                    </div>
                  </div>
                </div>
              </div>
            </mobiscroll.FormGroup>
          </mobiscroll.Form>
        </div>
      </Modal>
    );
  }
}
/*eslint-enable*/

const registrationForm = reduxForm({
  form: "registration", // a unique identifier for this form
  validate,
  asyncValidate,
  onSubmit,
  asyncBlurFields: ["username_email"]
})(withStyles(styles)(RegistrationModalComponent));

const selector = formValueSelector("registration"); // <-- same as form name

const mapStateToProps = state => {
  const value = {};
  value.firstName = selector(state, "firstName");
  value.lastName = selector(state, "lastName");
  value.registerPassword = selector(state, "registerPassword");
  value.confirmPassword = selector(state, "confirmPassword");
  value.username_email = selector(state, "username_email");
  value.accountType = selector(state, "accountType");
  value.event37 = selector(state, "event37");
  value.newsLetter = selector(state, "newsLetter");
  return {
    registered: state.users.registered,
    confirmUserNameMsg: confirmValue(state.users.confirmUserNameMsg),
    mobile: state.mobile,
    formValues: value
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
