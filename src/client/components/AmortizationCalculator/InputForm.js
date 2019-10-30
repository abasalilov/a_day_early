import React from "react";
import { reduxForm, Field } from "redux-form";
import DateFnsUtils from "@date-io/date-fns/build";
import { connect } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import { updateAmortGraph, updateInfoForm } from "../../actions";

const validate = values => {
  const errors = {};
  return errors;
};

const generateFirstDate = () => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var text = new Date(firstDay.getTime() - firstDay.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  return text;
};

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  type,
  labelShrink,
  dateTouched,
  labelFontSize,
  ...custom
}) => {
  if (type === "date") {
    let updatedDate = dateTouched ? input.value : generateFirstDate();
    return (
      <TextField
        error={touched && invalid}
        label={label}
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
          type: "date",
          style: {
            marginLeft: ".3rem"
          },
          value: updatedDate
        }}
        InputLabelProps={{
          style: {
            fontSize: labelFontSize ? labelFontSize : "20px",
            color: "#2D3190",
            marginLeft: ".3rem"
          },
          shrink: labelShrink
        }}
      />
    );
  }

  return (
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
          color: "#2D3190",
          marginLeft: ".3rem"
        },
        shrink: labelShrink
      }}
    />
  );
};

class InputFormComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loanAmount: null,
      originationDate: null,
      interestRate: null,
      term: null,
      paymentAmount: null,
      currentLoanAmount: null,
      payOffDate: null,
      dateTouched: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ originationDate: generateFirstDate() });
  }

  handleChange(name, e) {
    this.setState({ [name]: e.target.value }, () => {
      this.props.updateInputForm(this.state);
    });
    if (name === "originationDate") {
      this.setState({ dateTouched: true });
    }
  }
  // Current Loan Balance

  render() {
    const { anticipated } = this.props;
    const { dateTouched } = this.state;
    const loanLabel = anticipated
      ? "Anticipated Loan Amount"
      : "Current Loan Amount";
    const originationLabel = anticipated
      ? "Expected First Payment Date"
      : "First Payment Date";
    const interestLabel = anticipated
      ? "Anticipated Interest Rate"
      : "Interest Rate (%)";
    const paymentLabel = anticipated
      ? "Anticipated Monthly Payment Amount ($)"
      : "Monthly Payment Amount ($)";
    const termLabel = anticipated
      ? "Loan Term Desired (Years)"
      : "Loan Term (Years)";
    console.log("state", this.state);
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div>
          <Field
            name="loanAmount"
            label={loanLabel}
            type="number"
            onChange={e => this.handleChange("loanAmount", e)}
            component={renderTextField}
            mobile={false}
          />
        </div>
        <div>
          <Field
            name="originationDate"
            label={originationLabel}
            type="date"
            component={renderTextField}
            onChange={e => this.handleChange("originationDate", e)}
            mobile={false}
            dateTouched={dateTouched}
            labelFontSize={"26px"}
            labelShrink={true}
          />
        </div>
        <div>
          <Field
            name="interestRate"
            component={renderTextField}
            label={interestLabel}
            type="number"
            onChange={e => this.handleChange("interestRate", e)}
            mobile={false}
          />
        </div>
        <div>
          <Field
            name="term"
            component={renderTextField}
            label={termLabel}
            type="number"
            onChange={e => this.handleChange("term", e)}
          />
        </div>
        <div>
          <Field
            name="paymentAmount"
            component={renderTextField}
            label={paymentLabel}
            type="number"
            onChange={e => this.handleChange("paymentAmount", e)}
            mobile={false}
          />
        </div>
        <div>
          {!anticipated && (
            <Field
              name="originalLoanAmount"
              component={renderTextField}
              label={"Original Loan Amount"}
              type="number"
              onChange={e => this.handleChange("paymentAmount", e)}
              mobile={false}
            />
          )}
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
    input: state.input,
    monthly: state.input.monthlyPayment,
    initialValues: {
      originationDate: generateFirstDate,
      term: state.input.term,
      interestRate: state.input.interestRate,
      loanAmount: state.input.loanAmount
    }
  };
}
const mapDispatchToProps = dispatch => {
  return {
    updateCalc: st => {
      dispatch(updateAmortGraph(st));
    },
    updateInputForm: st => {
      dispatch(updateInfoForm(st));
    }
  };
};

export const InputForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(calcForm);
