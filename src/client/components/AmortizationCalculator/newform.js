import React from "react";
import { reduxForm, Field } from "redux-form";
import DateFnsUtils from "@date-io/date-fns/build";
import { Row, Col } from "react-grid-system";
import { connect } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import { FormField } from "../common/FormField";
import TextField from "@material-ui/core/TextField";
// import { withStyles } from "@material-ui/core/styles";

const validate = values => {
  const errors = {};
  return errors;
};

// const styles = {
//   resize: {
//     fontSize: 50
//   }
// };

class InputFormComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidUpdate() {}

  render() {
    // const { classes } = this.props;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div>
          <div
            name="input"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              border: "solid blue"
            }}
          >
            here
            <Field
              name="originalLoanAmount"
              label="Desired Loan Amount ($)"
              type="number"
              component={
                <TextField
                  InputProps={{
                    classes: {
                      // input: classes.resize
                    }
                  }}
                />
              }
              mobile={false}
              meta={{ touched: false, error: false }}
            />
          </div>
          <Col xs={12} lg={6} xl={6}>
            <Row>
              <Field
                name="loanAmount"
                label="Loan Amount ($)"
                type="number"
                component={FormField}
                mobile={false}
                meta={{ touched: false, error: false }}
              />
              <Field
                name="interestRate"
                component={FormField}
                label="Anticipated Interest Rate (%)"
                type="number"
                meta={{ touched: false, error: false }}
                value={this.props.input.interestRate || ""}
              />
            </Row>
          </Col>
          <Row>
            <Field
              name="term"
              component={FormField}
              label="Loan Term Desired (Years)"
              type="number"
              max="50"
              value={this.props.input.term}
              meta={{ touched: false, error: false }}
            />
            <DatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              autoOk
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={this.props.input.beginDate}
              onChange={date => this.props.setBeginDate(date)} // eslint-disable-line react/jsx-no-bind, max-len
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Row>
          <Row>
            <Button
              label="Reset"
              onClick={() => this.props.resetAmortization()} // eslint-disable-line react/jsx-no-bind, max-len
            />
          </Row>
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

const calcForm = reduxForm({
  form: "input",
  validate // a unique identifier for this form
})(InputFormComponent);

function mapStateToProps(state) {
  return {
    input: state.input
  };
}

export const InputForm = connect(
  mapStateToProps,
  null
)(calcForm);
