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

const validate = values => {
  const errors = {};
  return errors;
};

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  type,
  labelShrink,
  labelFontSize,
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    fullWidth
    helperText={touched && error}
    {...input}
    {...custom}
    style={{
      border: "solid #049347 2px",
      borderRadius: "8px",
      backgroundColor: "#fff"
    }}
    margin="normal"
    InputProps={{
      type,
      style: {
        marginLeft: ".3rem"
      }
    }}
    InputLabelProps={{
      style: {
        fontSize: labelFontSize ? labelFontSize : "20px",
        color: "#303290",
        marginLeft: ".3rem"
      },
      shrink: labelShrink
    }}
  />
);

class InputFormComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidUpdate() {}

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div>
          <Field
            name="loanAmount"
            label="Original Loan Amount"
            type="number"
            component={renderTextField}
            mobile={false}
          />
        </div>
        <div>
          <Field
            name="firstPayment"
            label="First Payment Date"
            type="date"
            component={renderTextField}
            mobile={false}
            labelFontSize={"26px"}
            labelShrink={true}
          />
        </div>
        <div>
          <Field
            name="interestRate"
            component={renderTextField}
            label="Interest Rate (%)"
            type="number"
            mobile={false}
          />
        </div>
        <div>
          <Field
            name="term"
            component={renderTextField}
            label="Loan Term (Years)"
            type="number"
            max="50"
          />
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
