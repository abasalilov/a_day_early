import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { FlyOut, LenderSelect } from "../common";
import Divider from "@material-ui/core/Divider";

import Table from "./Table";
import Chart from "./Chart";
import calculate from "./calculations";
import Grid from "@material-ui/core/Grid";
const defaultOverpayment = { month: "0", year: "0", amount: "0" };

const lenders = ["Chase", "Wells Fargo", "Quicken Loans", "Other"];

const isEmpty = a => typeof a === "undefined";

export const CalculatorGraph = props => {
  const {
    loanAmount = null,
    interestRate = null,
    term = null,
    showMessages = false
  } = props;
  const [initial, setInitial] = useState(loanAmount);
  const [rate, setRate] = useState(interestRate);
  const [years, setYears] = useState(term);
  const [lender, setLender] = useState(lender);
  const [otherLender, setOtherLender] = useState(otherLender);
  const [monthlyOverpayment, setMonthlyOverpayment] = useState(null);
  const [overpayments, setOverpayments] = useState([defaultOverpayment]);
  const [accuracy, setAccuracy] = useState(accuracy);

  const fieldStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center"
  };

  const msg =
    "Your interest rate is above today's going rate, would you like to get some information and options from a lender? Here's how much you can save:";
  let showInterestRateMessage = Number(interestRate) > 4.5;

  const labelHeaderStyle1 = {
    color: "#3f51b5",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
    padding: "1rem"
  };

  const updateOverpayment = index => ({ target }) =>
    setOverpayments(
      overpayments.map((overpayment, i) =>
        i === index
          ? { ...overpayment, [target.name]: target.value }
          : overpayment
      )
    );

  const labelStyle = {
    color: "#3f51b5",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
    padding: "1rem"
  };

  const { monthlyPayment, payments } = calculate(
    +initial,
    +years,
    +rate,
    +monthlyOverpayment,
    overpayments
  );

  const lenderDisplayName = isEmpty(lender) ? otherLender : lender;
  const showQuestion = isEmpty(accuracy);

  return (
    <div className="container-fluid">
      <div className="col-md-8 col-sm-12">
        <div className="col-sm-4">
          <div>
            <Typography
              variant="h4"
              style={labelStyle}
              align="left"
              gutterBottom
            >
              Loan Origination Information
            </Typography>
          </div>
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
                  style={{
                    color: "#3f51b5",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                    padding: "1rem",
                    fontSize: "1rem"
                  }}
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
                  style={{
                    color: "#3f51b5",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                    padding: "1rem",
                    fontSize: "1rem"
                  }}
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
                  style={{
                    color: "#3f51b5",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                    padding: "1rem",
                    fontSize: "1rem"
                  }}
                />
              </div>
            </Grid>
          </Grid>
          {showInterestRateMessage && (
            <FlyOut
              show={true}
              message={msg}
              style={{
                fontSize: "1rem !important"
              }}
            />
          )}
        </div>
        <Divider style={{ width: "100%", color: "#3f51b5", margin: "1rem" }} />

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
                {+monthlyOverpayment + monthlyPayment}
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
              Who is your mortgage lender?
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

        <Divider style={{ width: "100%", color: "#3f51b5", margin: "1rem" }} />

        <div className="col-sm-8">
          <div>
            <Typography
              variant="h4"
              style={labelStyle}
              align="left"
              gutterBottom
            >
              Loan Overpayment Information
            </Typography>
          </div>
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
                  style={{
                    color: "#3f51b5",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                    padding: "1rem",
                    fontSize: "1rem"
                  }}
                />
                <sub>* use if you've paid same amount consistently</sub>
              </div>
            </div>
          </div>
          <Typography
            variant="h5"
            align="left"
            style={{
              ...labelStyle,
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            Individual Payments -{" "}
            <Typography variant="h6" style={labelStyle} align="left">
              Add one extra payment at a time and see the savings!
            </Typography>
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
              alignItems="center"
              direction={"row"}
            >
              <Grid item xs={3}>
                <input
                  type="number"
                  min="0"
                  style={labelHeaderStyle1}
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
                  style={{
                    color: "#3f51b5",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                    padding: "1rem",
                    position: "relative",
                    left: "5%",
                    fontSize: "1rem"
                  }}
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
                  style={{
                    color: "#3f51b5",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                    padding: "1rem",
                    position: "relative",
                    fontSize: "1rem"
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                {i === overpayments.length - 1 ? (
                  <button
                    className="btn btn-xs"
                    onClick={() =>
                      setOverpayments([...overpayments, defaultOverpayment])
                    }
                    style={{
                      position: "relative",
                      fontSize: "1rem",
                      left: "20%",
                      padding: "1rem",
                      fontSize: "1rem"
                    }}
                  >
                    +
                  </button>
                ) : (
                  <button
                    style={{
                      position: "relative",
                      fontSize: "1rem",
                      left: "20%",
                      fontSize: "1rem",
                      padding: "1rem"
                    }}
                    className="btn btn-xs"
                    onClick={() =>
                      setOverpayments(overpayments.filter((_, j) => j !== i))
                    }
                  >
                    X
                  </button>
                )}
              </Grid>
            </Grid>
          ))}
        </div>
        <Divider
          style={{ width: "100%", color: "#3f51b5", margin: "2rem 1rem" }}
        />

        {showQuestion && (
          <Grid
            container
            spacing={8}
            justify="left"
            alignItems="center"
            direction={"row"}
          >
            <Grid item xs={6}>
              <div style={fieldStyle}>
                <Typography variant="h6" style={labelHeaderStyle1} align="left">
                  Does this look like an accurate snapshot of your mortgage?
                </Typography>
              </div>
            </Grid>

            <Grid item xs={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <button
                  style={{
                    position: "relative",
                    fontSize: "1rem",
                    left: "20%",
                    fontSize: "1rem",
                    padding: "1rem"
                  }}
                  className="btn btn-xs"
                  onClick={() => setAccuracy("yes")}
                >
                  Yes
                </button>
                <button
                  style={{
                    position: "relative",
                    fontSize: "1rem",
                    left: "20%",
                    fontSize: "1rem",
                    padding: "1rem"
                  }}
                  className="btn btn-xs"
                  onClick={() => setAccuracy("no")}
                >
                  No
                </button>
              </div>
            </Grid>
          </Grid>
        )}

        {!isEmpty(accuracy) && accuracy === "no" && (
          <div style={fieldStyle}>
            <Typography variant="h6" style={labelHeaderStyle1} align="left">
              Please edit the 'Loan Origination Information' section at the top
              of this page. Otherwise please feel free to reach out{" "}
              <a href="contact-us">here</a>.
            </Typography>
          </div>
        )}

        {!isEmpty(accuracy) && accuracy === "yes" && (
          <div style={fieldStyle}>
            <Typography variant="h6" style={labelHeaderStyle1} align="left">
              Great! Adjust the fields in the 'Loan Overpayment Information'
              section above as needed to simulate early loan pay-off.
            </Typography>
          </div>
        )}

        <Divider
          style={{ width: "100%", color: "#3f51b5", margin: "2rem 1rem" }}
        />

        <div className="col-sm-12">
          <Typography
            variant="h4"
            style={labelStyle}
            align="center"
            gutterBottom
          >
            Simulator
          </Typography>
          <Chart payments={payments} lenderName={lenderDisplayName} />
        </div>
      </div>
      <Table className="col-sm-4" payments={payments} />
    </div>
  );
};
