import React from "react";
import { reduxForm, Field } from "redux-form";
import DateFnsUtils from "@date-io/date-fns/build";
import { connect } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import { updateAmortGraph, updateInfoForm } from "../../actions";
import { CalendarPicker } from "../common";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const selectLabelStyle = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)"
};

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

  var mo = text.slice(5, 7);
  var yr = text.slice(0, 4);
  var d = text.slice(-2);
  return `${mo}-${d}-${yr}`;
};

const labelStyle = {
  color: "#3f51b5",
  padding: ".5rem"
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
  const { nonStandardType } = custom;
  if (nonStandardType && nonStandardType === "term") {
    console.log("nonStandardType");
    return (
      <React.Fragment>
        <InputLabel>
          <Typography variant="h6" style={selectLabelStyle} align="left">
            Term (yrs)
          </Typography>
        </InputLabel>
        <Select
          value={input.value}
          onChange={input.onChange}
          inputProps={{
            name: "Term"
          }}
          style={{
            border: "solid #049347 2px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}
        >
          {["15", "30"].map(option => {
            return <MenuItem value={option}>{option}</MenuItem>;
          })}
        </Select>
      </React.Fragment>
    );
  }
  if (type === "date") {
    const { ant } = custom;
    const originationLabel = ant
      ? "Expected First Payment Date"
      : "First Payment Date";
    let updatedDate = dateTouched ? input.value : generateFirstDate();
    return (
      <div
        style={{
          border: "solid #049347 3px",
          borderRadius: ".3rem"
        }}
      >
        <Typography variant="h5" style={labelStyle} align="left">
          {originationLabel}
        </Typography>
        <CalendarPicker
          onChange={input.onChange}
          setInitial={true}
          value={updatedDate}
        />
      </div>
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
    if (name === "originationDate") {
      this.setState({ dateTouched: true, originationDate: e }, () =>
        this.props.updateInputForm(this.state)
      );
    } else {
      this.setState({ [name]: e.target.value }, () => {
        this.props.updateInputForm(this.state);
      });
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
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid
          container
          key={"dsf"}
          justify="space-apart"
          alignItems="center"
          direction={"row"}
          id="CALCULATOR"
        >
          <Grid item xs={12}>
            <Field
              name="loanAmount"
              label={loanLabel}
              type="number"
              onChange={e => this.handleChange("loanAmount", e)}
              component={renderTextField}
              mobile={false}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="interestRate"
              component={renderTextField}
              label={interestLabel}
              type="number"
              onChange={e => this.handleChange("interestRate", e)}
              mobile={false}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
              padding: "1rem"
            }}
          >
            <Field
              name="term"
              type="term"
              nonStandardType="term"
              component={renderTextField}
              label={termLabel}
              type="number"
              onChange={e => this.handleChange("term", e)}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="paymentAmount"
              component={renderTextField}
              label={paymentLabel}
              type="number"
              onChange={e => this.handleChange("paymentAmount", e)}
              mobile={false}
            />
          </Grid>
          {!anticipated && (
            <Grid item xs={12}>
              <Field
                name="originalLoanAmount"
                component={renderTextField}
                label={"Original Loan Amount"}
                type="number"
                onChange={e => this.handleChange("paymentAmount", e)}
                mobile={false}
              />
            </Grid>
          )}
          <Grid item xs={12} style={{ padding: ".3rem" }}>
            <Field
              name="originationDate"
              label={originationLabel}
              type="date"
              anticipated={anticipated}
              component={renderTextField}
              onChange={e => this.handleChange("originationDate", e)}
              mobile={false}
              dateTouched={dateTouched}
              labelFontSize={"26px"}
              labelShrink={true}
              ant={false}
            />
          </Grid>
        </Grid>
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
