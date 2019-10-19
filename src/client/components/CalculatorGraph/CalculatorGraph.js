import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { FlyOut } from "../common/FlyOut";

import Table from "./Table";
import Chart from "./Chart";
import calculate from "./calculations";

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
    padding: "1rem",
    position: "relative",
    left: "0%",
    fontSize: "1rem"
  };

  const labelHeaderStyle2 = {
    color: "#3f51b5",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
    padding: "1rem",
    position: "relative",
    left: "20%"
  };

  const labelHeaderStyle3 = {
    color: "#3f51b5",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
    padding: "1rem",
    position: "relative",
    left: "25%"
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
    <div>
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
                Origination Information
              </Typography>
              <div style={fieldStyle}>
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
              </div>
            </div>

            <div style={interestFieldStyle}>
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
              <div style={{ marginLeft: "4rem" }}>
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
            </div>
          </div>
          <div className="col-sm-8">
            <div>
              <Typography
                variant="h4"
                style={labelStyle}
                id="modal-title"
                align="left"
                gutterBottom
              >
                Please add any extra principal payments you made so far.{" "}
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
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography
                variant="h6"
                style={labelHeaderStyle1}
                id="modal-title"
                align="left"
              >
                Year
              </Typography>
              <Typography
                variant="h6"
                style={labelHeaderStyle2}
                id="modal-title"
                align="left"
              >
                Month
              </Typography>
              <Typography
                variant="h6"
                style={labelHeaderStyle3}
                id="modal-title"
                align="left"
              >
                Amount
              </Typography>
            </div>
            {overpayments.map(({ year, month, amount }, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <input
                  type="number"
                  min="0"
                  style={labelHeaderStyle1}
                  max={years}
                  value={year}
                  name="year"
                  onChange={updateOverpayment(i)}
                />
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
                    left: "12%",
                    fontSize: "1rem"
                  }}
                />

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
              </div>
            ))}
          </div>
          <div className="col-sm-12">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "1rem"
              }}
            >
              <Typography
                variant="h4"
                style={labelStyle}
                id="modal-title"
                align="left"
                gutterBottom
              >
                Monthly Payment
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
            <Chart payments={payments} />
          </div>
        </div>
        <Table className="col-sm-4" payments={payments} />
      </div>
    </div>
  );
};
