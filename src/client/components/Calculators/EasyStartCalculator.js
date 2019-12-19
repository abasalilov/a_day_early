import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { FlyOut, InterestRateDropDown } from "../common";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { RadioGroup, CalendarPicker } from "../common";
import { calculations, Table, Chart } from "../CalculatorGraph";
import { updatePayPalAmount, updateInfoForm } from "../../actions";
const defaultOverpayment = { month: "0", year: "0", amount: "0" };

const selectLabelStyle = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)"
};

const updatedLabelStyle = {
  color: "#317439",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem"
};

const lenders = ["Chase", "Wells Fargo", "Quicken Loans", "Other"];

const isEmpty = a => typeof a === "undefined";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

const dividerStyle = { width: "100%", color: "#3f51b5", margin: "1rem" };

const fieldStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "center"
};

const labelStyle = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem"
};

const labelHeaderStyle1 = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem"
};

// Interactive Amortization schedule (from Don) click any future principal payment you want to prepay and see how much you can save.
// After user clicks calculations show:  interest savings, time saved and new payoff date
// Let’s get registered and accelerate (button)

class EasyStartCalculatorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loanAmount: null,
      interestRate: null,
      term: null,
      lender: null,
      otherLender: null,
      monthlyOverpayment: null,
      overpayments: [defaultOverpayment],
      accuracy: null,
      monthlyUpdated: null,
      ready: false,
      hasMadePriorPayments: false,
      handleDate: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.setOverpayments = this.setOverpayments.bind(this);
    this.setLender = this.setLender.bind(this);
    this.handleAccuracy = this.handleAccuracy.bind(this);
    this.handleRedundancy = this.handleRedundancy.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  componentDidMount() {
    const { loanAmount, interestRate, term } = this.props;
    if (!isEmpty(loanAmount) && !isEmpty(interestRate)) {
      this.setState({ loanAmount, interestRate, term });
    }
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.interestRate !== this.props.interestRate) {
      const { loanAmount, interestRate, term } = this.props;
      if (!isEmpty(loanAmount) && !isEmpty(interestRate)) {
        this.setState({ loanAmount, interestRate, term });
      }
    }
  }

  setLender(e) {
    this.setState({ lender: e });
  }

  handleAccuracy(a) {
    this.setState({ accuracy: a });
  }

  setOverpayments(arr) {
    this.setState({ overpayments: arr });
  }

  handleYes(v) {
    if (v === "yes") {
      this.setState({ hasMadePriorPayments: true });
    } else {
      this.setState({ hasMadePriorPayments: false });
    }
  }

  handleDate(e) {
    this.setState({ lpDate: e });
  }

  handleChange(name, e) {
    const {
      loanAmount,
      term,
      interestRate,
      monthlyOverpayment,
      overpayments
    } = this.state;
    const { monthlyPayment } = calculations(
      +loanAmount,
      +term,
      +interestRate,
      +monthlyOverpayment,
      overpayments
    );

    const monthly = +monthlyOverpayment + monthlyPayment;
    this.setState({ [name]: e, monthly }, () => {
      this.props.updateInputForm(this.state);
      this.props.updatePaypal(monthly, false);
    });
    // if (name === "interestRate") {
    //   this.handleRedundancy(interestRate);
    // }
  }

  handleRedundancy(r) {
    // const rr = Number(r);
    // if (!Number.isNaN(rr) && rr !== null) {
    //   const a = rr * 0.99;
    //   this.handleChange("interestRate", a);
    //   this.handleChange("interestRate", r);
    //   // this.setState({ ready: true });
    // }
  }

  render() {
    const {
      loanAmount,
      term,
      interestRate,
      lender,
      monthlyOverpayment,
      overpayments,
      otherLender,
      accuracy,
      history,
      hasMadePriorPayments
    } = this.state;
    let checkHx = this.props.history;
    let alterSize = false;
    if (checkHx) {
      if (checkHx.location.pathname.includes("calculator")) {
        alterSize = true;
      }
    }

    const msg =
      "Your interest rate is above today's going rate, would you like to get some information and options from a lender? Here's how much you can save:";
    let showInterestRateMessage = Number(interestRate) > 4.5;

    const updateOverpayment = index => ({ target }) =>
      this.setOverpayments(
        overpayments.map((overpayment, i) =>
          i === index
            ? { ...overpayment, [target.name]: target.value }
            : overpayment
        )
      );

    const { monthlyPayment, payments } = calculations(
      +loanAmount,
      +term,
      +interestRate,
      +monthlyOverpayment,
      overpayments
    );

    const lenderDisplayName = isEmpty(lender) ? otherLender : lender;
    const showQuestion = isEmpty(accuracy);

    return (
      <mobiscroll.Form className="mbsc-form-grid">
        <div className="mbsc-grid" style={{ padding: "2rem" }}>
          <div className="mbsc-row-12">
            <div className="mbsc-col-12">
              <Typography
                variant="h4"
                style={updatedLabelStyle}
                id="modal-title"
                align="center"
                gutterBottom
              >
                EasyStart - Let's Start with the Basics
              </Typography>
              <Divider style={dividerStyle} />
            </div>
            <div className="mbsc-col-4">
              <Typography
                variant="h4"
                style={labelStyle}
                id="modal-title"
                align="left"
                gutterBottom
              >
                Loan Information
              </Typography>
            </div>
            <div className="mbsc-row">
              <div style={fieldStyle} className="mbsc-col-4">
                <Typography variant="h6" style={labelStyle} align="left">
                  Amount
                </Typography>
                <mobiscroll.Input
                  maxLength={7}
                  value={loanAmount}
                  onChange={e =>
                    this.handleChange("loanAmount", e.target.value)
                  }
                  inputStyle="box"
                  labelStyle="floating"
                  placeholder="Loan Amount ($)"
                  label={"Loan Amount ($)"}
                />
              </div>
              <div style={fieldStyle} className="mbsc-col-4">
                <Typography variant="h6" style={labelStyle} align="left">
                  Term
                </Typography>
                <mobiscroll.Dropdown
                  inputStyle="box"
                  labelStyle="floating"
                  maxLength={4}
                  value={term}
                  onChange={e => this.handleChange("term", e.target.value)}
                >
                  <option>Years</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                  <option value={30}>30</option>
                </mobiscroll.Dropdown>
              </div>
              <div style={fieldStyle} className="mbsc-col-4">
                <Typography variant="h6" style={labelStyle} align="left">
                  Interest Rate
                </Typography>
                <InterestRateDropDown
                  inputStyle="box"
                  labelStyle="floating"
                  value={interestRate}
                  onChange={e =>
                    this.handleChange("interestRate", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {showInterestRateMessage && (
            <FlyOut
              show={true}
              message={msg}
              style={{
                fontSize: "1rem !important"
              }}
            />
          )}
          <Divider
            style={{ width: "100%", color: "#3f51b5", margin: "1rem" }}
          />

          <Grid container spacing={8} alignItems="center" direction={"row"}>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                style={labelStyle}
                align="left"
                gutterBottom
              >
                Standard Monthly Payment
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <span className="money">
                <Typography variant="h6" style={labelStyle} align="left">
                  {+monthlyOverpayment + monthlyPayment}
                </Typography>
              </span>
            </Grid>
          </Grid>

          <Grid container spacing={8} alignItems="center" direction={"row"}>
            <Grid item xs={5}>
              <Typography variant="h5" style={labelStyle} align="left">
                Current lender (if any) ?
              </Typography>{" "}
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                padding: "1rem"
              }}
            >
              <mobiscroll.Dropdown
                inputStyle="box"
                labelStyle="floating"
                value={lender}
                onChange={e => this.setLender(e.target.value)}
              >
                <option></option>
                <option value={"Chase"}>Chase</option>
                <option value={"Wells Fargo"}>Wells Fargo</option>
                <option value={"Quicken Loans"}>Quicken Loans</option>
                <option value={"Other"}>Other</option>
              </mobiscroll.Dropdown>
              {lender === "Other" && (
                <mobiscroll.Input
                  type="text"
                  inputStyle="box"
                  labelStyle="floating"
                  maxLength={20}
                  value={otherLender}
                  onChange={e => this.setOtherLender(e.target.value)}
                  style={{
                    color: "#3f51b5",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)"
                  }}
                />
              )}
            </Grid>
          </Grid>

          <Divider
            style={{ width: "100%", color: "#3f51b5", margin: "1rem" }}
          />

          <div className="col-sm-8">
            <div
              style={{
                margin: "2rem 0",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Typography variant="h5" style={labelStyle} align="left">
                Please add your monthly EasyStart overpayment:
              </Typography>
              <div style={fieldStyle}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <mobiscroll.Input
                    type="text"
                    inputStyle="box"
                    labelStyle="floating"
                    maxLength={5}
                    value={monthlyOverpayment}
                    onChange={e =>
                      this.handleChange("monthlyOverpayment", e.target.value)
                    }
                  >
                    Overpayment
                  </mobiscroll.Input>
                </div>
              </div>
            </div>
            <div
              style={{
                margin: "2rem 0",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Typography
                variant="h5"
                style={{ ...labelStyle, marginBottom: "10rem" }}
                align="left"
              >
                When would you like to kickoff your EasyStart program?
              </Typography>
              <div
                style={{
                  justifyContent: "start",
                  alignItems: "center"
                }}
              >
                <div className="mbsc-col-12 mbsc-col-lg-8">
                  <mobiscroll.Calendar
                    display="bubble"
                    theme="material"
                    touchUi={false}
                    onChange={this.handleDate}
                  >
                    <mobiscroll.Input inputStyle="box" labelStyle="floating">
                      MM/DD/YYYY
                    </mobiscroll.Input>
                  </mobiscroll.Calendar>
                </div>
              </div>
            </div>
          </div>
          <Divider
            style={{ width: "100%", color: "#3f51b5", margin: "2rem 1rem" }}
          />

          {!isEmpty(accuracy) && accuracy === "no" && (
            <div style={fieldStyle}>
              <Typography variant="h6" style={labelHeaderStyle1} align="left">
                Please edit the 'Loan Information' section at the top of this
                page. Otherwise please feel free to reach out{" "}
                <a href="contact-us">here</a>.
              </Typography>
            </div>
          )}

          {!isEmpty(accuracy) && accuracy === "yes" && (
            <div style={fieldStyle}>
              <Typography variant="h6" style={labelHeaderStyle1} align="left">
                Great! Adjust the fields in the section above as needed to
                simulate early loan pay-off.
              </Typography>
            </div>
          )}

          {payments.length > 20 && (
            <Grid
              container
              spacing={8}
              alignItems="center"
              justify="center"
              direction={"column"}
            >
              <Typography variant="h4" style={labelStyle} align="center">
                Simulator
              </Typography>

              <Grid item xs={8}>
                <Typography variant="h5" style={labelStyle} align="left">
                  Projected Payments
                </Typography>
                <Table payments={payments} />
              </Grid>
              <Divider
                style={{ width: "100%", color: "#3f51b5", margin: "2rem 1rem" }}
              />
              {/* <Grid
                item
                xs={12}
                style={{
                  minHeight: "40rem",
                  minWidth: "40rem",
                  marginTop: "5rem"
                }}
              >
                <Typography variant="h5" style={labelStyle} align="left">
                  Graph
                </Typography>

                <Chart
                  payments={payments}
                  alterSize={true}
                  lenderName={lenderDisplayName}
                />
              </Grid> */}
            </Grid>
          )}
        </div>
      </mobiscroll.Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePaypal: (amt, bool) => {
      dispatch(updatePayPalAmount(amt, bool));
    },
    updateInputForm: st => {
      dispatch(updateInfoForm(st));
    }
  };
};

export const EasyStartCalculator = connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(EasyStartCalculatorComponent));
//                   onChange={this.handleDate}
