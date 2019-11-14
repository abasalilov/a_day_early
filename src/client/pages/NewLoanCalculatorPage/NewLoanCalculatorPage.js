import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TrendingFlat from "@material-ui/icons/TrendingFlat";
import { RegistrationModal, ServiceModal } from "../../components/modals";
import { calculate } from "../../components/CalculatorGraph/calculations";
import { updateAmortGraph as updateGraph } from "../../actions";
import { CalculatorGraph } from "../../components/CalculatorGraph";
import { CalculatorForm } from "../../components/CalculatorForm";
import { FlyOut } from "../../components/common";

const styles = {
  container: {
    margin: "4rem"
  }
};

const makeAnticipatedFlyoutMessage = msgs => {
  let missingInterest = false;
  let missingTerm = false;
  let missingAmount = false;
  let count = 0;
  msgs.map(missingField => {
    if (missingField === "interestRate") {
      missingInterest = true;
      count++;
    }
    if (missingField === "term") {
      missingTerm = true;
      count++;
    }
    if (missingField === "loanAmount") {
      missingAmount = true;
      count++;
    }
  });
  let msg = "The following field(s) are required: ";
  if (missingInterest) {
    msg += " Anticipated Interest Rate";
    if (count > 1) {
      count--;
      msg += ",";
    }
  }
  if (missingTerm) {
    msg += " Loan Term Desired";
    if (count > 1) {
      count--;
      msg += ",";
    }
  }
  if (missingAmount) {
    msg += " Anticipated Loan Amount";
    if (count > 1) {
      count--;
      msg += ",";
    }
  }
  return msg;
};
class NewLoanCalculatorPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      showModal: false,
      selectedService: null,
      showRegModal: false,
      showFlyout: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleToggleRegModal = this.handleToggleRegModal.bind(this);
    this.getUpdatedMontlyPayment = this.getUpdatedMontlyPayment.bind(this);
  }

  handleToggleRegModal() {
    this.setState({ showRegModal: false });
  }

  getUpdatedMontlyPayment() {
    const { input } = this.props;
    const { monthlyPayment } = calculate(
      input.loanAmount,
      input.term,
      input.interestRate,
      input.monthlyOverpayment
    );
    return monthlyPayment;
  }

  handleRedirect() {
    // this.setState({ showRegModal: true });
    if (this.props.input.missingFields.length > 0) {
      this.setState({ showFlyout: true });
    } else {
      this.props.history.push("/calculator#loanInfo");
    }
  }

  handleChange(panel) {
    if (this.state.expanded === panel) {
      this.setState({
        expanded: null,
        showModal: false,
        selectedService: null
      });
    } else {
      this.setState({
        expanded: panel,
        showModal: false,
        selectedService: null
      });
    }
  }

  handleToggleModal(selectedService = {}) {
    const { showModal } = this.state;
    if (showModal) {
      this.setState({
        showModal: false,
        selectedService: null
      });
    } else {
      this.setState({
        showModal: true,
        selectedService
      });
    }
  }

  render() {
    const { classes, mobile, sectionProps, input } = this.props;
    const { showFlyout, showModal, selectedService, showRegModal } = this.state;
    const hasMessages = input.missingFields.length > 0;

    if (showModal) {
      return (
        <ServiceModal
          sectionProps={sectionProps}
          data={selectedService}
          open={showModal}
          mobile={mobile}
          closeClick={this.handleToggleModal}
        />
      );
    }

    if (showRegModal) {
      return (
        <RegistrationModal
          open={showRegModal}
          mobile={mobile}
          closeClick={this.handleToggleRegModal}
        />
      );
    }
    return (
      <React.Fragment>
        <Grid
          container
          key={"dsf"}
          justifyContent="space-apart"
          alignItems="center"
          direction={"row"}
          id="CALCULATOR"
          style={{
            marginTop: "6rem"
          }}
        >
          <Grid item xs={8}>
            <Grid
              container
              key={"dddsf"}
              justifyContent="space-around"
              alignItems="center"
              direction={"column"}
              id="CALCULATOR"
              style={{
                minWidth: "20%",
                backgroundColor: "#f6f6f6"
              }}
            >
              <Grid item xs={6}>
                <Typography
                  variant={mobile ? "display4" : "h4"}
                  gutterBottom
                  align="center"
                  color="textPrimary"
                  style={{ width: "100%", color: "#2D3190" }}
                >
                  Let's Start With The Basics
                </Typography>
                <Typography
                  variant={mobile ? "display5" : "h6"}
                  gutterBottom
                  align="center"
                  color="textPrimary"
                  style={{ width: "100%", color: "#2D3190" }}
                >
                  (Please fill out 3 of the following fields)
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                style={{
                  width: "100%",
                  marginRight: "1rem"
                }}
              >
                <CalculatorForm
                  anticipated={true}
                  onCalculate={this.props.updatePaymentGraph}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem"
            }}
          >
            {input.canCalculate && (
              <Button
                onClick={this.handleRedirect}
                variant="outlined"
                size="large"
                color="primary"
                style={{
                  width: "80%",
                  margin: "1rem 1rem 1rem 0",
                  fontSize: "1.5rem",
                  marginLeft: "1rem"
                }}
              >
                Next Step {<TrendingFlat style={{ fontSize: "2rem" }} />}
              </Button>
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  mobile: state.mobile,
  input: state.input
});

const ConnectedNewLoanCalculatorPage = connect(
  mapStateToProps,
  null
)(withStyles(styles)(NewLoanCalculatorPageComponent));

export const NewLoanCalculatorPage = {
  component: ConnectedNewLoanCalculatorPage
};
