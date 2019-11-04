import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { Chart, Table, calculations } from "../CalculatorGraph";
import { LenderSelect } from "../common";
import { LeapFrogCalculator } from "../Calculators";

const defaultOverpayment = { month: "0", year: "0", amount: "0" };

const lenders = ["Chase", "Wells Fargo", "Quicken Loans", "Other"];

const isEmpty = a => typeof a === "undefined";
const isLenderNameEmpty = a => typeof a === "undefined" || a === "Other";

const programRef = {
  ADE: {
    name: "One Day Early",
    description:
      "Make a one time extra principal payment and see the exponential effect of time and money."
  },
  RU: {
    name: "RoundUp",
    description:
      "Round your payment up to the nearest $100, $1000 or create your own round up and see the effects!"
  },
  JS: {
    name: "Jump Start",
    description:
      "Make your first, extra principal payment via the aDayEarly platform directly affecting the amortization schedule before it starts!"
  },
  FLEX: {
    name: "Flex",
    description:
      "Make gains toward your goal with the aDayEarly platform when you are ready and able to pay down your mortgage faster. Bottom line it is flexible and you can schedule as many payments as you want on any month you want."
  },
  LF: {
    name: "LeapFrog",
    description:
      "Plan a speedy jump ahead at particular future point in your repayment schedule by applying payments toward your mortgage at an accelerated pace down the line."
  },
  ES: {
    name: "EasyStart",
    description:
      "Build stepping stones effortlessly with a steady, monthly approach toward paying down your mortgage ahead of time."
  }
};

const formatName = nm => {
  if (!isEmpty(nm)) {
    const a = nm[0].toUpperCase();
    return a + nm.slice(1);
  }
  return "";
};

const formatRU = (payment, isRU, roundUp, otherRU) => {
  if (isRU) {
    if (roundUp === 1000) {
      return Math.ceil(payment / 1000) * 1000;
    } else if (roundUp === 100) {
      return Math.ceil(payment / 100) * 100;
    } else if (roundUp === "other") {
      return Math.ceil(payment / otherRU) * otherRU;
    }
  }
  return payment;
};

const inputStyle = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem",
  position: "relative",
  fontSize: "1rem"
};

const labelStyle = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem"
};

const buttonStyle = {
  position: "relative",
  fontSize: "1rem",
  left: "20%",
  padding: "1rem",
  fontSize: "1rem"
};

const updatedLabelStyle = {
  color: "#317439",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem"
};

const overpaymentStyle = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem",
  position: "relative",
  fontSize: "1rem"
};

const dividerStyle = { width: "100%", color: "#3f51b5", margin: "1rem" };

const ruBtnStyle = {
  textShadow: "1px 1px #7280ce",
  marginBottom: ".5rem"
};

const fieldStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "center"
};

const labelHeaderStyle1 = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem"
};

export const ProgramCalculatorGraph = props => {
  const {
    loanAmount = null,
    interestRate = null,
    term = null,
    program = null
  } = props;

  const [initial, setInitial] = useState(loanAmount);
  const [rate, setRate] = useState(interestRate);
  const [years, setYears] = useState(term);
  const [lender, setLender] = useState(lender);
  const [otherLender, setOtherLender] = useState(otherLender);
  const [monthlyOverpayment, setMonthlyOverpayment] = useState(null);
  const [roundUp, setRoundUp] = useState(null);
  const [overpayments, setOverpayments] = useState([defaultOverpayment]);
  const [accuracy, setAccuracy] = useState(accuracy);
  const [otherRoundUp, setOtherRoundUp] = useState(otherRoundUp);
  let programName = "";
  let isADE = false;
  let isRU = false;
  let isLF = false;
  let isFlex = false;
  let isES = false;
  let isJS = false;
  console.log("program", program);
  if (program) {
    programName = programRef[program].name;
    if (program === "ADE") {
      isADE = true;
    }
    if (program === "JS") {
      isJS = true;
    }
    if (program === "RU") {
      isRU = true;
    }
    if (program === "LF") {
      isLF = true;
    }
    if (program === "FLEX") {
      isFlex = true;
    }
    if (program === "ES") {
      isES = true;
    }
  }

  let updatedHeader = program ? "Let's Start with the Basics" : "";

  let paymentsLabel = isADE
    ? "One time extra principal payment"
    : "Individual Payments";

  const updateOverpayment = index => ({ target }) => {
    return setOverpayments(
      overpayments.map((overpayment, i) =>
        i === index
          ? { ...overpayment, [target.name]: target.value }
          : overpayment
      )
    );
  };

  const { monthlyPayment, payments } = calculations(
    +initial,
    +years,
    +rate,
    +monthlyOverpayment,
    overpayments
  );

  const lenderDisplayName = isLenderNameEmpty(lender)
    ? formatName(otherLender)
    : lender;
  const showQuestion = isEmpty(accuracy);

  if (isLF) {
    return <LeapFrogCalculator />;
  }

  return (
    <div className="container-fluid">
      <div className="col-md-8 col-sm-12">
        <div className="col-sm-4">
          <Typography
            variant="h4"
            style={updatedLabelStyle}
            id="modal-title"
            align="center"
            gutterBottom
          >
            {updatedHeader}
          </Typography>
          <Divider style={dividerStyle} />
        </div>
        <div className="col-sm-4">
          <Typography
            variant="h4"
            style={labelStyle}
            id="modal-title"
            align="left"
            gutterBottom
          >
            Loan Information
          </Typography>
          <Grid
            container
            spacing={8}
            justify="left"
            alignItems="center"
            direction={"row"}
          >
            <Grid item xs={4}>
              <div style={fieldStyle}>
                <Typography variant="h6" style={labelStyle} align="left">
                  Amount
                </Typography>
                <input
                  maxLength={7}
                  value={initial}
                  onChange={e => setInitial(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={fieldStyle}>
                <Typography variant="h6" style={labelStyle} align="left">
                  Years
                </Typography>
                <input
                  type="number"
                  maxLength={2}
                  value={years}
                  onChange={e => setYears(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </Grid>

            <Grid item xs={4}>
              <div style={fieldStyle}>
                <Typography variant="h6" style={labelStyle} align="left">
                  Interest Rate
                </Typography>
                <input
                  type="number"
                  step={0.1}
                  value={rate}
                  onChange={e => setRate(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <Divider style={dividerStyle} />

        {isRU && (
          <Grid
            container
            spacing={8}
            justify="left"
            alignItems="center"
            direction={"row"}
          >
            <Grid item xs={5}>
              <Typography variant="h5" style={labelStyle} align="left">
                Round your monthly payment to the nearest:
              </Typography>
            </Grid>
            {roundUp !== "other" && (
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setRoundUp(100)}
                  color="primary"
                  style={ruBtnStyle}
                >
                  $100
                </Button>
              </Grid>
            )}
            {roundUp !== "other" && (
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setRoundUp(1000)}
                  color="primary"
                  style={ruBtnStyle}
                >
                  $1000
                </Button>
              </Grid>
            )}
            <Grid item xs={2}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setRoundUp("other")}
                color="primary"
                style={ruBtnStyle}
              >
                Other
              </Button>
            </Grid>
            {roundUp === "other" && (
              <Grid item xs={2}>
                <input
                  type="number"
                  maxLength={5}
                  value={otherRoundUp}
                  placeholder="Enter round up amount"
                  onChange={e => setOtherRoundUp(e.target.value)}
                  style={{
                    color: "#3f51b5",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                    padding: "1rem",
                    fontSize: "1rem"
                  }}
                />
              </Grid>
            )}
          </Grid>
        )}

        <Grid
          container
          spacing={8}
          justify="left"
          alignItems="center"
          direction={"row"}
        >
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
                {formatRU(
                  +monthlyOverpayment + monthlyPayment,
                  isRU,
                  roundUp,
                  otherRoundUp
                )}
              </Typography>
            </span>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={8}
          justify="left"
          alignItems="center"
          direction={"row"}
        >
          <Grid item xs={5}>
            <Typography variant="h5" style={labelStyle} align="left">
              Who is your anticipated mortgage lender?
            </Typography>
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
            <LenderSelect options={lenders} onLenderSelect={setLender} />
            {lender === "Other" && (
              <input
                type="text"
                maxLength={20}
                value={otherLender}
                onChange={e => setOtherLender(e.target.value)}
                style={{
                  color: "#3f51b5",
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                  padding: "1rem",
                  fontSize: "1rem",
                  margin: "1rem 0rem 0rem 0rem"
                }}
              />
            )}
          </Grid>
        </Grid>

        <Divider style={dividerStyle} />

        <div className="col-sm-8">
          <div>
            <Typography
              variant="h4"
              style={updatedLabelStyle}
              align="left"
              gutterBottom
            >
              {`${programName} `} Loan Overpayment Configuration
            </Typography>
          </div>
          {!isADE && (
            <div style={{ margin: "2rem 0" }}>
              <Typography variant="h5" style={labelStyle} align="left">
                Please add any extra principal payments you made so far in the
                fields below.
              </Typography>
              <div style={fieldStyle}>
                <Typography variant="h6" style={labelStyle} align="left">
                  Monthly
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <input
                    type="number"
                    maxLength={5}
                    value={monthlyOverpayment}
                    onChange={e => setMonthlyOverpayment(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>
          )}
          <Typography
            variant="h5"
            style={labelStyle}
            id="modal-title"
            align="left"
            gutterBottom
          >
            {paymentsLabel}
          </Typography>
          <Grid
            container
            spacing={8}
            justify="left"
            alignItems="center"
            direction={"row"}
          >
            <Grid item xs={3}>
              <Typography variant="h6" style={labelHeaderStyle1} align="left">
                Year
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" style={labelHeaderStyle1} align="left">
                Month
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" style={labelHeaderStyle1} align="left">
                Amount
              </Typography>
            </Grid>
          </Grid>

          {overpayments.map(({ year, month, amount }, i) => (
            <Grid
              container
              spacing={8}
              justify="left"
              alignItems="left"
              direction={"row"}
            >
              <Grid item xs={3}>
                <input
                  type="number"
                  min="0"
                  style={overpaymentStyle}
                  max={years}
                  value={year}
                  name="year"
                  onChange={updateOverpayment(i)}
                />
              </Grid>
              <Grid item xs={3}>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={month}
                  style={overpaymentStyle}
                  name="month"
                  onChange={updateOverpayment(i)}
                />
              </Grid>
              <Grid item xs={3}>
                <input
                  type="text"
                  value={amount}
                  name="amount"
                  onChange={updateOverpayment(i)}
                  style={overpaymentStyle}
                />
              </Grid>
              {!isADE && (
                <Grid item xs={3}>
                  {i === overpayments.length - 1 ? (
                    <button
                      className="btn btn-xs"
                      onClick={() =>
                        setOverpayments([...overpayments, defaultOverpayment])
                      }
                      style={buttonStyle}
                    >
                      +
                    </button>
                  ) : (
                    <button
                      style={buttonStyle}
                      className="btn btn-xs"
                      onClick={() =>
                        setOverpayments(overpayments.filter((_, j) => j !== i))
                      }
                    >
                      X
                    </button>
                  )}
                </Grid>
              )}
            </Grid>
          ))}
        </div>
        <Divider
          style={{ width: "100%", color: "#3f51b5", margin: "2rem 1rem" }}
        />

        <div className="col-sm-12">
          <Chart
            payments={payments}
            alterSize={true}
            lenderName={lenderDisplayName}
          />
        </div>
      </div>
      <Table className="col-sm-4" payments={payments} />
    </div>
  );
};
