import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { FlyOut } from "../common/FlyOut";
import Divider from "@material-ui/core/Divider";

import Table from "./Table";
import Chart from "./Chart";
import calculate from "./calculations";
import Grid from "@material-ui/core/Grid";
const defaultOverpayment = { month: "1", year: "0", amount: "400" };

export const CalculatorGraph = props => {
  const { loanAmount = null, interestRate = null, term = null } = props;
  const [initial, setInitial] = useState(loanAmount);
  const [rate, setRate] = useState(interestRate);
  const [years, setYears] = useState(term);
  const [monthlyOverpayment, setMonthlyOverpayment] = useState(null);
  const [overpayments, setOverpayments] = useState([defaultOverpayment]);
  const fieldStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center"
  };

  const interestFieldStyle = {
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
  return (
    <div className="container-fluid">
      <div className="col-md-8 col-sm-12">
        <div className="col-sm-4">
          <div>
            <Typography
              variant="h4"
              style={labelStyle}
              id="modal-title"
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
                <Typography
                  variant="h6"
                  style={labelStyle}
                  id="modal-title"
                  align="left"
                >
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
                <Typography
                  variant="h6"
                  style={labelStyle}
                  id="modal-title"
                  align="left"
                >
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
                <Typography
                  variant="h6"
                  style={labelStyle}
                  id="modal-title"
                  align="left"
                >
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

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "1rem"
          }}
        >
          <Typography
            variant="h5"
            style={labelStyle}
            id="modal-title"
            align="left"
            gutterBottom
          >
            Standard Monthly Payment
          </Typography>
          <span className="money">
            <Typography
              variant="h6"
              style={labelStyle}
              id="modal-title"
              align="left"
              gutterBottom
            >
              {+monthlyOverpayment + monthlyPayment}
            </Typography>
          </span>
        </div>

        <Divider style={{ width: "100%", color: "#3f51b5", margin: "1rem" }} />

        <div className="col-sm-8">
          <div style={{ margin: "3rem 0" }}>
            <Typography
              variant="h5"
              style={labelStyle}
              id="modal-title"
              align="left"
              gutterBottom
            >
              Please add any extra principal payments you made so far in the
              fields below.
            </Typography>
            <div style={fieldStyle}>
              <Typography
                variant="h6"
                style={labelStyle}
                id="modal-title"
                align="left"
              >
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
            style={labelStyle}
            id="modal-title"
            align="left"
            gutterBottom
          >
            Individual Payments
          </Typography>
          <Grid
            container
            spacing={8}
            justify="left"
            alignItems="center"
            direction={"row"}
          >
            <Grid item xs={3}>
              <Typography
                variant="h6"
                style={labelHeaderStyle1}
                id="modal-title"
                align="left"
              >
                Year
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="h6"
                style={labelHeaderStyle1}
                id="modal-title"
                align="left"
              >
                Month
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="h6"
                style={labelHeaderStyle1}
                id="modal-title"
                align="left"
              >
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

        <div className="col-sm-12">
          <Chart payments={payments} />
        </div>
      </div>
      <Table className="col-sm-4" payments={payments} />
    </div>
  );
};
