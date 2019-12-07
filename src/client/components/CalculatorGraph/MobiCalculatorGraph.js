import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { FlyOut, LenderSelect } from "../common";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

import { Table } from "./Table";
import { Chart } from "./Chart";
import { calculations } from "./calculations";
import { updatePayPalAmount, updateInfoForm } from "../../actions";
const defaultOverpayment = { month: "0", year: "0", amount: "0" };

const selectLabelStyle = {
  color: "#3f51b5",
  textShadow: "0 1px  2px rgba(0, 0, 0, 0.4)"
};

const lenders = ["Chase", "Wells Fargo", "Quicken Loans", "Other"];

const isEmpty = a => {
  if (a === null) {
    return true;
  }
  return typeof a === "undefined";
};

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
class CalculatorGraphComponent extends React.Component {
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
      ready: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.setOverpayments = this.setOverpayments.bind(this);
    this.setLender = this.setLender.bind(this);
    this.handleAccuracy = this.handleAccuracy.bind(this);
    this.handleRedundancy = this.handleRedundancy.bind(this);
    this.handleUpdatedInterest = this.handleUpdatedInterest.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { loanAmount, interestRate, term } = this.props;
    if (!isEmpty(loanAmount) && !isEmpty(interestRate)) {
      this.setState({ loanAmount, interestRate, term });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.interestRate !== this.props.interestRate) {
      const { loanAmount, interestRate, term } = this.props;
      if (!isEmpty(loanAmount) && !isEmpty(interestRate)) {
        this.setState({ loanAmount, interestRate, term });
      }
    }
  }

  componentWillUnmount() {
    this.props.updateInputForm({
      loanAmount: null,
      interestRate: null,
      term: null,
      lender: null,
      otherLender: null,
      monthlyOverpayment: null,
      overpayments: [defaultOverpayment],
      accuracy: null,
      monthlyUpdated: null,
      ready: false
    });
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

  handleUpdatedInterest() {
    const { term, loanAmount, monthlyOverpayment, overpayments } = this.state;

    const interestRate = 4.5;
    const { monthlyPayment, payments } = calculations(
      +loanAmount,
      +term,
      +interestRate,
      +monthlyOverpayment,
      overpayments
    );
    return monthlyPayment;
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
      history
    } = this.state;
    let checkHx = this.props.history;
    let alterSize = false;
    if (checkHx) {
      if (checkHx.location.pathname.includes("calculator")) {
        alterSize = true;
      }
    }

    const withUpdatedInterest = this.handleUpdatedInterest();

    let showInterestRateMessage = Number(interestRate) > 4.5;

    const updateOverpayment = index => ({ target }) =>
      this.setOverpayments(
        overpayments.map((overpayment, i) =>
          i === index
            ? { ...overpayment, [target.name]: target.value }
            : overpayment
        )
      );
    console.log("term", typeof term, term);
    console.log("interestRate", typeof interestRate, interestRate);
    console.log(
      "monthlyOverpayment",
      typeof monthlyOverpayment,
      monthlyOverpayment
    );
    console.log("overpayments", typeof overpayments, overpayments);
    const calcInterest = interestRate
      ? interestRate.replace("%", "")
      : interestRate;
    console.log("calcInterest", calcInterest);
    const { monthlyPayment, payments } = calculations(
      +loanAmount,
      +term,
      +calcInterest,
      +monthlyOverpayment,
      overpayments
    );

    const lenderDisplayName = isEmpty(lender) ? otherLender : lender;
    const showQuestion = isEmpty(accuracy);
    console.log("accuracy", accuracy);
    console.log("showQuectin", showQuestion);
    const updatedInterestRate = this.state.interestRate;
    let monthly = +monthlyOverpayment + monthlyPayment;
    if (isNaN(monthlyPayment)) {
      monthly = this.props.paymentAmount;
    }
    const finalPaymentAmount = monthly - withUpdatedInterest;

    const msg = `Your interest rate is above today's going rate, would you like to get some information and options from a lender? Here's how much you can save: ${finalPaymentAmount.toFixed(
      2
    )} every month!`;
    const loanLabel = "loanlabel";
    const interestLabel = "interestLabel";
    const termLabel = "termLabel";
    const paymentLabel = "paymentLabel";
    const originationLabel = "originationLabel";
    const anticipated = true;
    const generateFirstDate = () => "12/12/12";
    return (
      <div
        style={{
          marginTop: "6rem"
        }}
      >
        <mobiscroll.Form
          className="mbsc-form-grid"
          theme="ios"
          themeVariant="light"
        >
          <div className="mbsc-grid" style={{ padding: "2rem" }}>
            <div className="mbsc-row">
              <div className="mbsc-col">
                <Typography
                  variant="h4"
                  style={labelStyle}
                  align="left"
                  gutterBottom
                >
                  Loan Information
                </Typography>
              </div>
              <div className="mbsc-col" />
              <div className="mbsc-col" />
            </div>
            <div className="mbsc-row">
              <div className="mbsc-col-4">
                <mobiscroll.Input
                  inputStyle="box"
                  labelStyle="floating"
                  label={"Term (Yrs)"}
                  type="number"
                  maxLength={7}
                  value={loanAmount}
                  onChange={e =>
                    this.handleChange("loanAmount", e.target.value)
                  }
                >
                  Amount
                </mobiscroll.Input>
              </div>
              <div className="mbsc-col-4">
                <mobiscroll.Dropdown
                  label={"Term (Yrs)"}
                  inputStyle="box"
                  labelStyle="floating"
                  value={term}
                  onChange={e => this.handleChange("term", e.target.value)}
                >
                  <option></option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                  <option value={30}>30</option>
                </mobiscroll.Dropdown>
              </div>
              <div className="mbsc-col-4">
                <mobiscroll.Dropdown
                  label={"Interest Rate (%)"}
                  name="interestRate"
                  value={updatedInterestRate}
                  onChange={e =>
                    this.handleChange(
                      "interestRate",
                      e.target.value.replace(/[^0-9$.,]/g, "")
                    )
                  }
                  inputStyle="box"
                  labelStyle="floating"
                >
                  <option></option>
                  <option value={"2.000"}>2.000%</option>
                  <option value={"2.125"}>2.125%</option>
                  <option value={"2.250"}>2.250%</option>
                  <option value={"2.375"}>2.375%</option>
                  <option value={"2.500"}>2.500%</option>
                  <option value={"2.625"}>2.625%</option>
                  <option value={"2.750"}>2.750%</option>
                  <option value={"2.875"}>2.875%</option>
                  <option value={"3.000"}>3.000%</option>
                  <option value={"3.125"}>3.125%</option>
                  <option value={"3.250"}>3.250%</option>
                  <option value={"3.375"}>3.375%</option>
                  <option value={"3.500"}>3.500%</option>
                  <option value={"3.625"}>3.625%</option>
                  <option value={"3.750"}>3.750%</option>
                  <option value={"3.875"}>3.875%</option>
                  <option value={"4.000"}>4.000%</option>
                  <option value={"4.125"}>4.125%</option>
                  <option value={"4.250"}>4.250%</option>
                  <option value={"4.375"}>4.375%</option>
                  <option value={"4.500"}>4.500%</option>
                  <option value={"4.625"}>4.625%</option>
                  <option value={"4.750"}>4.750%</option>
                  <option value={"4.875"}>4.875%</option>
                  <option value={"5.000"}>5.000%</option>
                  <option value={"5.125"}>5.125%</option>
                  <option value={"5.250"}>5.250%</option>
                  <option value={"5.375"}>5.375%</option>
                  <option value={"5.500"}>5.500%</option>
                  <option value={"5.625"}>5.625%</option>
                  <option value={"5.750"}>5.750%</option>
                  <option value={"5.875"}>5.875%</option>
                  <option value={"6.000"}>6.000%</option>
                  <option value={"6.125"}>6.125%</option>
                  <option value={"6.250"}>6.250%</option>
                  <option value={"6.375"}>6.375%</option>
                  <option value={"6.500"}>6.500%</option>
                  <option value={"6.625"}>6.625%</option>
                  <option value={"6.750"}>6.750%</option>
                  <option value={"6.875"}>6.875%</option>
                  <option value={"7.000"}>7.000%</option>
                  <option value={"7.125"}>7.125%</option>
                  <option value={"7.250"}>7.250%</option>
                  <option value={"7.375"}>7.375%</option>
                  <option value={"7.500"}>7.500%</option>
                  <option value={"7.625"}>7.625%</option>
                  <option value={"7.750"}>7.750%</option>
                  <option value={"7.875"}>7.875%</option>
                  <option value={"8.000"}>8.000%</option>
                  <option value={"8.125"}>8.125%</option>
                  <option value={"8.250"}>8.250%</option>
                  <option value={"8.375"}>8.375%</option>
                  <option value={"8.500"}>8.500%</option>
                  <option value={"8.625"}>8.625%</option>
                  <option value={"8.750"}>8.750%</option>
                  <option value={"8.875"}>8.875%</option>
                  <option value={"9.000"}>9.000%</option>
                  <option value={"9.125"}>9.125%</option>
                  <option value={"9.250"}>9.250%</option>
                  <option value={"9.375"}>9.375%</option>
                  <option value={"9.500"}>9.500%</option>
                  <option value={"9.625"}>9.625%</option>
                  <option value={"9.750"}>9.750%</option>
                  <option value={"9.875"}>9.875%</option>
                  <option value={"10.000"}>10.000%</option>
                  <option value={"10.125"}>10.125%</option>
                  <option value={"10.250"}>10.250%</option>
                  <option value={"10.375"}>10.375%</option>
                  <option value={"10.500"}>10.500%</option>
                  <option value={"10.625"}>10.625%</option>
                  <option value={"10.750"}>10.750%</option>
                  <option value={"10.875"}>10.875%</option>
                  <option value={"11.000"}>11.000%</option>
                  <option value={"11.125"}>11.125%</option>
                  <option value={"11.250"}>11.250%</option>
                  <option value={"11.375"}>11.375%</option>
                  <option value={"11.500"}>11.500%</option>
                  <option value={"11.625"}>11.625%</option>
                  <option value={"11.750"}>11.750%</option>
                  <option value={"11.875"}>11.875%</option>
                  <option value={"12.000"}>12.000%</option>
                  <option value={"12.125"}>12.125%</option>
                  <option value={"12.250"}>12.250%</option>
                  <option value={"12.375"}>12.375%</option>
                  <option value={"12.500"}>12.500%</option>
                  <option value={"12.625"}>12.625%</option>
                  <option value={"12.750"}>12.750%</option>
                  <option value={"12.875"}>12.875%</option>
                </mobiscroll.Dropdown>
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
            <div className="mbsc-row mbsc-align-items-center">
              <div className="mbsc-col-4">
                <Typography
                  variant="h6"
                  style={labelStyle}
                  align="left"
                  gutterBottom
                >
                  Standard Monthly Payment
                </Typography>
              </div>
              <div className="mbsc-col-2">
                <mobiscroll.Input
                  inputStyle="box"
                  labelStyle="floating"
                  type="number"
                  disabled
                  value={monthly}
                />
              </div>
              <div className="mbsc-col" />
              <div className="mbsc-col" />
            </div>
            <div className="mbsc-row mbsc-align-items-center">
              <div className="mbsc-col-4">
                <Typography
                  variant="h6"
                  style={labelStyle}
                  align="left"
                  gutterBottom
                >
                  Who is your mortgage lender?
                </Typography>
              </div>
              <div className="mbsc-col-3">
                <mobiscroll.Dropdown
                  label={"Lender"}
                  inputStyle="box"
                  labelStyle="floating"
                  value={this.state.lender}
                  onChange={e => this.setLender(e.target.value)}
                >
                  <option></option>
                  <option value={"Chase"}>Chase</option>
                  <option value={"Wells Fargo"}>Wells Fargo</option>
                  <option value={"Quicken Loans"}>Quicken Loans</option>
                  <option value={"Other"}>Other</option>
                </mobiscroll.Dropdown>
              </div>
              <div className="mbsc-col-3">
                {lender === "Other" && (
                  <mobiscroll.Input
                    inputStyle="box"
                    labelStyle="floating"
                    type="text"
                    maxLength={20}
                    value={otherLender}
                    placeholder={"Please enter your lender"}
                    onChange={e => this.handleChange("otherLender", e)}
                  />
                )}
              </div>
              <div className="mbsc-col" />
            </div>
            <Divider
              style={{ width: "100%", color: "#3f51b5", margin: "1rem" }}
            />
            <div className="mbsc-row mbsc-align-items-center">
              <div className="mbsc-col-8">
                <Typography
                  variant="h6"
                  style={labelStyle}
                  align="left"
                  gutterBottom
                >
                  Please add any extra principal payments you made so far in the
                  fields below :
                </Typography>
              </div>
              <div className="mbsc-col" />
              <div className="mbsc-col" />
            </div>
            <div className="mbsc-row mbsc-align-items-center">
              <div className="mbsc-col-5">
                <Typography
                  variant="h6"
                  style={labelStyle}
                  align="left"
                  gutterBottom
                >
                  Prior Recurring Monthly Overpayments
                </Typography>
              </div>
              <div className="mbsc-col-4">
                <mobiscroll.Input
                  inputStyle="box"
                  labelStyle="floating"
                  type="number"
                  maxLength={5}
                  value={monthlyOverpayment}
                  onChange={e => this.handleChange("monthlyOverpayment", e)}
                />
                <sub style={{ marginLeft: "3rem" }}>
                  * use if you've paid same amount consistently
                </sub>
              </div>
              <div className="mbsc-col" />
            </div>
            <div className="mbsc-row mbsc-align-items-center">
              <div className="mbsc-col-4">
                <Typography
                  variant="h6"
                  style={labelStyle}
                  align="left"
                  gutterBottom
                >
                  Prior Individual Overpayments
                </Typography>
              </div>
              <div className="mbsc-col" />
              <div className="mbsc-col" />
            </div>

            <div className="mbsc-row mbsc-align-items-center">
              <div className="mbsc-col-3">
                <Typography
                  variant="h6"
                  style={labelStyle}
                  align="left"
                  gutterBottom
                >
                  Year
                </Typography>
              </div>
              <div className="mbsc-col-3">
                <Typography
                  variant="h6"
                  style={labelStyle}
                  align="left"
                  gutterBottom
                >
                  Month
                </Typography>
              </div>
              <div className="mbsc-col-3">
                <Typography
                  variant="h6"
                  style={labelStyle}
                  align="left"
                  gutterBottom
                >
                  Amount
                </Typography>
              </div>
              <div className="mbsc-col-3">
                <Typography
                  variant="h6"
                  style={labelStyle}
                  align="left"
                  gutterBottom
                >
                  Add
                </Typography>
              </div>
            </div>
            <div>
              {overpayments.map(({ year, month, amount }, i) => (
                <div className="mbsc-row mbsc-align-items-center">
                  <div className="mbsc-col-3" style={{ paddingRight: "2rem" }}>
                    <mobiscroll.Input
                      type="number"
                      min="0"
                      inputStyle="box"
                      labelStyle="floating"
                      type="number"
                      style={labelHeaderStyle1}
                      max={term}
                      value={year}
                      name="year"
                      onChange={updateOverpayment(i)}
                    />
                  </div>
                  <div className="mbsc-col-3" style={{ paddingRight: "2rem" }}>
                    <mobiscroll.Input
                      type="number"
                      min="1"
                      max="12"
                      inputStyle="box"
                      labelStyle="floating"
                      type="number"
                      value={month}
                      name="month"
                      onChange={updateOverpayment(i)}
                    />
                  </div>
                  <div className="mbsc-col-3" style={{ paddingRight: "2rem" }}>
                    <mobiscroll.Input
                      type="text"
                      value={amount}
                      name="amount"
                      inputStyle="box"
                      labelStyle="floating"
                      type="number"
                      onChange={updateOverpayment(i)}
                    />
                  </div>
                  <div
                    className="mbsc-col-3"
                    style={{ paddingLeft: "1rem", paddingRight: "2rem" }}
                  >
                    {i === overpayments.length - 1 ? (
                      <button
                        className="btn btn-xs"
                        onClick={() =>
                          this.setOverpayments([
                            ...overpayments,
                            defaultOverpayment
                          ])
                        }
                      >
                        +
                      </button>
                    ) : (
                      <button
                        className="btn btn-xs"
                        onClick={() =>
                          this.setOverpayments(
                            overpayments.filter((_, j) => j !== i)
                          )
                        }
                      >
                        X
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Divider
              style={{ width: "100%", color: "#3f51b5", margin: "2rem 1rem" }}
            />

            {showQuestion && (
              <div className="mbsc-row mbsc-align-items-center">
                <div className="mbsc-col-7">
                  <div style={fieldStyle}>
                    <Typography
                      variant="h6"
                      style={labelHeaderStyle1}
                      align="left"
                    >
                      Does this look like an accurate snapshot of your mortgage?
                    </Typography>
                  </div>
                </div>

                <div className="mbsc-col-2">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around"
                    }}
                  >
                    <mobiscroll.Button
                      className="btn btn-xs"
                      onClick={() => this.handleAccuracy("yes")}
                    >
                      Yes
                    </mobiscroll.Button>
                    <mobiscroll.Button
                      className="btn btn-xs"
                      onClick={() => this.handleAccuracy("no")}
                    >
                      No
                    </mobiscroll.Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </mobiscroll.Form>

        {!isEmpty(accuracy) && accuracy === "no" && (
          <div style={fieldStyle}>
            <Typography variant="h6" style={labelHeaderStyle1} align="left">
              Please edit the 'Loan Information' section at the top of this
              page. Otherwise please feel free to reach out{" "}
              <a href="/contact-us">here</a>.
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
        <div className="mbsc-col-12">
          <Typography variant="h4" style={labelStyle} align="center">
            Simulator
          </Typography>

          <div className="mbsc-col-8">
            <Typography variant="h5" style={labelStyle} align="left">
              Projected Payments
            </Typography>
            <Table payments={payments} />
          </div>
          <div
            className="mbsc-row mbsc-align-items-center"
            style={{
              minHeight: "45rem",
              minWidth: "45rem"
            }}
          >
            <Typography variant="h5" style={labelStyle} align="left">
              Graph
            </Typography>
            <Chart
              payments={payments}
              alterSize={alterSize}
              lenderName={lenderDisplayName}
            />
          </div>
        </div>
      </div>
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

export const CalculatorGraph = connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CalculatorGraphComponent));
