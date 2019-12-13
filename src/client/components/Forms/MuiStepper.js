import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import Typography from "@material-ui/core/Typography";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { StyledButton } from "../common";
import { JoinButton } from "./JoinButton";

const styles = theme => {
  return {
    root: {
      width: "100%",
      padding: "1rem"
    },
    mobileRoot: {
      margin: "2rem",
      background: "white",
      borderRadius: "2rem"
    },
    disableBtn: {},
    sectionHeading: {
      textAlign: "center",
      color: "#535353",
      fontSize: "2.5rem",
      fontWeight: "normal",
      lineHeight: "2rem",
      marginBottom: "1.7rem",
      lineHeight: 1.2
    },
    bold: {
      fontWeight: "900",
      color: "#535353"
    },
    completeBold: {
      fontWeight: "900",
      color: "#13ba0b"
    },
    stepper: {
      background: "transparent",
      padding: "0"
    },
    typography: {
      fontSize: "1.5rem"
    },
    icon: {
      fontSize: "2rem"
    },
    title: {
      fontSize: "1.3rem",
      lineHeight: 1.5
    },
    lastButtonContainer: {
      display: "flex",
      width: "20rem",
      justifyContent: "space-around",
      flexDirection: "row",
      alignItems: "center"
    },
    resetButton: {
      backgroundColor: "red !important"
    },
    actionsContainer: {
      marginBottom: theme.spacing.unit * 2,
      borderRadius: "1rem"
    },
    resetContainer: {
      padding: theme.spacing.unit * 3
    },
    cloudOptions: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      margin: "3rem"
    },
    mobileCloudOptions: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center"
    },
    imageBtn: {
      width: "12rem !important",
      padding: "1rem"
    },
    mobileImageBtn: {
      width: "40rem !important",
      padding: "1rem",
      margin: "2rem"
    },
    textField: {
      width: "100%"
    },
    imageSelectButtons: {
      margin: "1.5rem",
      textAlign: "center"
    },
    mobileIcon: {},
    buttons: {},
    mobileButtons: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      alignItems: "center",
      padding: "1rem 0"
    },
    regButtons: {
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "50%",
      margin: "0 auto"
    },
    radioField: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    mobileRadioField: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  };
};
const steps = ["User Type", "Profile", "Tokens"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Are you a Real Esate Broker? Agent? Or potential Real Trade User?`;
    case 1:
      return "Please fill out the following required fields:";
    case 2:
      return `Do you have an EOS account?`;
    default:
      return "Unknown step";
  }
}

function getTextFromState(broker, agent, user) {
  let title = "";
  if (broker) {
    return "Broker";
  }
  if (agent) {
    return "Agent";
  }
  if (user) {
    return "User";
  }
}

class VerticalStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      broker: false,
      user: false,
      message: "",
      agent: false,
      error: "",
      profileTypeSelected: false,
      hasEOS: "",
      eosAcct: "",
      eosAnswered: false
    };

    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSelectBroker = this.handleSelectBroker.bind(this);
    this.handleSelectUser = this.handleSelectUser.bind(this);
    this.handleSelectAgent = this.handleSelectAgent.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleEOSToggle = this.handleEOSToggle.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ activeStep: 1 });
    }, 1000);

    setInterval(() => {
      this.setState({ activeStep: 2 });
    }, 3000);

    setInterval(() => {
      this.setState({ activeStep: 3 });
    }, 5000);
  }

  handleSelectAgent(name) {
    this.setState({
      profileTypeSelected: true,
      broker: false,
      agent: true,
      user: false
    });
  }

  handleSelectBroker(name) {
    this.setState({
      profileTypeSelected: true,
      broker: true,
      agent: false,
      user: false
    });
  }

  handleSelectUser(name) {
    this.setState({
      profileTypeSelected: true,
      broker: false,
      agent: false,
      user: true
    });
  }

  getLabelContent(label, step1Label, i) {
    const { profileTypeSelected } = this.state;
    let alteredLabel = step1Label;

    if (profileTypeSelected && label === "Profile" && i === 1) {
      return (alteredLabel += " Profile Builder");
    }

    return label;
  }

  handleNext() {
    const { activeStep, agent, broker, user, hasEOS } = this.state;
    const { formError, regForm } = this.props;

    if (formError) {
      console.log("122 formError", formError);
      alert("Please update the registration form, there is an error.");
      return false;
    }

    if (regForm && activeStep !== 0) {
      if (regForm.syncErrors) {
        console.log("129 regForm.syncErrors", regForm.syncErrors);
        alert("Please update the registration form, there is an error.");
        return false;
      }
    }

    let hasFilledOutData = false;

    if (activeStep === 0) {
      if (agent || broker || user) {
        hasFilledOutData = true;
      }
    } else if (activeStep === 1) {
      hasFilledOutData = true;
    } else if (activeStep === 2) {
      const { hasEOS, eosAcct, eosAnswered } = this.state;
      const finishedQuestionnaire = hasEOS ? eosAcct.length > 8 : eosAnswered;
      if (finishedQuestionnaire) {
        hasFilledOutData = true;
      }
    }

    if (hasFilledOutData) {
      this.setState(state => ({
        activeStep: state.activeStep + 1
      }));
    } else {
      alert("Please fill out the fields before moving on to the next step");
    }
  }

  handleBack() {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  }

  handleReset() {
    this.setState({
      activeStep: 0,
      broker: false,
      user: false,
      agent: false,
      error: "",
      profileTypeSelected: false,
      hasEOS: "",
      eosAcct: "",
      eosAnswered: false
    });
  }

  handleEOSToggle(bool) {
    this.setState({ hasEOS: bool, eosAnswered: true });
  }

  handleTextChange(e) {
    const { eosAcct } = this.state;
    this.setState({ eosAcct: e.target.value });
    if (eosAcct.length > 8) {
      this.setState({ eosAnswered: true });
    }
  }

  renderButtons() {
    const { activeStep } = this.state;
    const { classes, mobile, formError } = this.props;
    if (mobile) {
      return (
        <div className={classes.mobileButtons}>
          {activeStep !== 0 && (
            <StyledButton
              disabled={activeStep === 0}
              onClick={this.handleBack}
              label={"Back"}
            />
          )}
          <StyledButton
            variant="contained"
            color="primary"
            onClick={this.handleNext}
            label={activeStep === steps.length - 1 ? "Finish" : "Next"}
          />
        </div>
      );
    }
    return (
      <div className={classes.regButtons}>
        {activeStep !== 0 && (
          <StyledButton
            disabled={activeStep === 0}
            onClick={this.handleBack}
            label={"Back"}
          />
        )}
        <StyledButton
          variant="contained"
          color="primary"
          onClick={this.handleNext}
          className={classes.bigScreenNextButton}
          label={activeStep === steps.length - 1 ? "Finish" : "Next"}
        />
      </div>
    );
  }

  render() {
    const {
      classes,
      mobile,
      formError,
      registerUser,
      regLoading,
      registrationComplete
    } = this.props;
    const { activeStep, broker, agent, user } = this.state;
    const iconContainerName = mobile ? classes.mobileIcon : classes.reg;
    const rootName = mobile ? classes.mobileRoot : classes.root;
    const radioClassName = mobile
      ? classes.mobileRadioField
      : classes.radioField;

    if (registrationComplete) {
      const swtichClassName = mobile
        ? classes.mobileSwitchBtn
        : classes.switchBtn;

      return (
        <div className={rootName}>
          <h2 className={classes.sectionHeading}>
            <span className={classes.completeBold}>Registration Complete!</span>
          </h2>
        </div>
      );
    }

    return (
      <div className={rootName}>
        <h2 className={classes.sectionHeading}>
          Profile Builder <span className={classes.bold}>Registration</span>
        </h2>
        <Stepper
          className={classes.stepper}
          activeStep={activeStep}
          orientation="horizontal"
        >
          {steps.map((label, index) => {
            const isStep1 = activeStep === 1 && index === 1;
            const step1Label = getTextFromState(broker, agent, user);
            return (
              <Step key={label} className={classes.step}>
                <StepLabel
                  className={classes.stepLabel}
                  StepIconProps={{ classes: { root: classes.icon } }}
                >
                  <Typography align="left" className={classes.typography}>
                    {this.getLabelContent(label, step1Label, index)}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography
                    variant="h3"
                    align="left"
                    color="textPrimary"
                    className={classes.title}
                    gutterBottom
                  >
                    {getStepContent(index)}
                  </Typography>
                  <div className={classes.actionsContainer}>
                    <div>Here</div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <h2>All steps completed - you&quot;re ready to join!</h2>
            <div className={classes.lastButtonContainer}>
              <Button
                onClick={this.handleReset}
                className={classes.resetButton}
                variant="contained"
                color="secondary"
              >
                Reset
              </Button>
              <JoinButton
                regLoading={regLoading}
                onClick={registerUser}
                data={this.state}
              />
            </div>
          </Paper>
        )}
      </div>
    );
  }
}

VerticalStepper.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = state => {
  return {
    mobile: state.mobile
  };
};

const ConnectedVerticalStepper = connect(mapStateToProps)(
  withStyles(styles)(VerticalStepper)
);

export const MuiStepper = ConnectedVerticalStepper;

function confirmValue(data) {
  if (typeof data === "undefined") {
    return false;
  } else if (data === "") {
    return false;
  } else if (data === null) {
    return false;
  } else {
    return true;
  }
}
