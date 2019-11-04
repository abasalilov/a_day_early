import React from "react";
import Typography from "@material-ui/core/Typography";

const labelStyle = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem"
};

const isEmpty = a => typeof a === "undefined";

export default ({ payments, className, lenderName }) => {
  console.log("Table");
  let output = payments
    .filter((year, i) => i > 0 && (year.balance > 0 || year.interestYearly > 0))
    .reduce(
      (acc, year, index) => ({
        interestTotal: acc.interestTotal + year.interestYearly,
        overpaymentTotal: acc.overpaymentTotal + year.overpayment,
        rows: [
          ...acc.rows,
          [
            year.partial ? year.partial + "m" : index + 1,
            Math.round(year.interestYearly || 0),
            Math.round(year.overpayment),
            Math.round(year.balance)
          ]
        ]
      }),
      { interestTotal: 0, overpaymentTotal: 0, rows: [] }
    );

  return (
    <div>
      <table className={className}>
        <thead>
          <tr>
            <th>
              <Typography
                variant="h6"
                style={labelStyle}
                id="modal-title"
                align="left"
                gutterBottom
              >
                Years
              </Typography>
            </th>
            <th>
              <Typography
                variant="h6"
                style={labelStyle}
                id="modal-title"
                align="left"
                gutterBottom
              >
                Interest
              </Typography>
            </th>
            <th>
              <Typography
                variant="h6"
                style={labelStyle}
                id="modal-title"
                align="left"
                gutterBottom
              >
                Overpayment
              </Typography>
            </th>
            <th>
              <Typography
                variant="h6"
                style={labelStyle}
                id="modal-title"
                align="left"
                gutterBottom
              >
                Balance
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {output.rows.map((row, index) => (
            <tr key={index}>
              {row.map((d, i) => (
                <td key={i}>
                  <Typography
                    variant="subtitle1"
                    style={labelStyle}
                    id="modal-title"
                    align="left"
                    gutterBottom
                  >
                    {d.toLocaleString()}
                  </Typography>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              <Typography
                variant="subtitle1"
                style={labelStyle}
                id="modal-title"
                align="left"
                gutterBottom
              >
                {Math.round(output.interestTotal).toLocaleString()}
              </Typography>
            </td>
            <td>
              <Typography
                variant="subtitle1"
                style={labelStyle}
                id="modal-title"
                align="left"
                gutterBottom
              >
                {Math.round(output.overpaymentTotal).toLocaleString()}
              </Typography>
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
