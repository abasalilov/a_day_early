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
import { withStyles, makeStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    width: "100% !important",
    marginTop: "8px"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

const selectLabelStyle = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)"
};

const numbersOnly = value => {
  return value.replace(/[^\d]/g, "");
};

const renderInterestSelect = input => {
  return (
    <Select
      style={{
        border: "solid #049347 2px",
        borderRadius: "8px",
        backgroundColor: "#fff"
      }}
      {...input}
      value={input.value}
      onChange={input.onChange}
      inputProps={{
        style: {
          color: "#2D3190",
          fontSize: "20px",
          textDecoration: "none"
        }
      }}
    >
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
    </Select>
  );
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
  classes,
  labelShrink,
  dateTouched,
  labelFontSize,
  ...custom
}) => {
  const { nonStandardType } = custom;
  if (nonStandardType && nonStandardType === "term") {
    return (
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel
          style={{
            fontSize: labelFontSize ? labelFontSize : "20px",
            color: "#2D3190",
            paddingTop: ".4rem",
            marginLeft: "-.3rem"
          }}
          shrink={labelShrink}
        >
          {label}
        </InputLabel>
        <Select
          style={{
            border: "solid #049347 2px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}
          {...input}
          value={input.value}
          onChange={input.onChange}
          inputProps={{
            style: {
              color: "#2D3190",
              fontSize: "20px",
              textDecoration: "none"
            }
          }}
        >
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={30}>30</option>
        </Select>
      </FormControl>
    );
  }

  if (nonStandardType && nonStandardType === "interestRate") {
    return (
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel
          style={{
            fontSize: labelFontSize ? labelFontSize : "20px",
            color: "#2D3190",
            paddingTop: ".4rem",
            marginLeft: "-.3rem"
          }}
          shrink={labelShrink}
        >
          {label}
        </InputLabel>
        {renderInterestSelect(input)}
      </FormControl>
    );
  }
  if (type === "date") {
    const { ant } = custom;
    const originationLabel = ant
      ? "Expected First Payment Date"
      : "First Payment Date";
    let updatedDate = dateTouched ? input.value : generateFirstDate();
    return (
      <div>
        <Typography variant="h5" style={labelStyle} align="left">
          {originationLabel}
        </Typography>
        <CalendarPicker
          onChange={a => {
            return input.onChange({ value: a.slice(0, 9) });
          }}
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
          marginLeft: ".3rem",
          textDecoration: "none",
          textAlign: "center"
        },
        disableUnderline: true
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

function getFormattedDate(d) {
  var day = d;
  var dd = day.getDate();
  var mm = day.getMonth() + 1; //January is 0!

  var yyyy = day.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return yyyy + "-" + mm + "-" + dd;
}

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
      dateTouched: false,
      originalLoanAmount: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ originationDate: generateFirstDate() });
  }

  handleChange(name, e) {
    if (name === "originationDate") {
      const updated = new Date(e.value);
      const ur = getFormattedDate(updated);

      this.setState({ dateTouched: true, originationDate: ur }, () => {
        this.props.updateInputForm(this.state);
      });
    } else {
      this.setState({ [name]: e.target.value }, () => {
        this.props.updateInputForm(this.state);
      });
    }
  }
  // Current Loan Balance

  render() {
    const { anticipated, classes } = this.props;
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
          justify="space-around"
          alignItems="center"
          direction={"row"}
          id="calculator"
        >
          <Grid item xs={12}>
            <Field
              name="loanAmount"
              label={loanLabel}
              onChange={e => this.handleChange("loanAmount", e)}
              component={renderTextField}
              mobile={0}
              normalize={numbersOnly}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ textAlign: "center", marginBottom: ".5rem" }}
          >
            <Field
              name="interestRate"
              nonStandardType="interestRate"
              classes={classes}
              component={renderTextField}
              label={interestLabel}
              onChange={e => this.handleChange("interestRate", e)}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Field
              name="term"
              nonStandardType="term"
              classes={classes}
              component={renderTextField}
              label={termLabel}
              onChange={e => this.handleChange("term", e)}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Field
              name="paymentAmount"
              component={renderTextField}
              label={paymentLabel}
              type="number"
              onChange={e => this.handleChange("paymentAmount", e)}
              mobile={0}
            />
          </Grid>
          {!anticipated && (
            <Grid
              item
              xs={12}
              style={{ textAlign: "center", marginBottom: ".5rem" }}
            >
              <Field
                name="originalLoanAmount"
                component={renderTextField}
                label={"Original Loan Amount"}
                onChange={e => this.handleChange("originalLoanAmount", e)}
                mobile={0}
              />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            style={{
              border: "solid #049347 3px",
              borderRadius: ".3rem"
            }}
          >
            <Field
              name="originationDate"
              label={originationLabel}
              type="date"
              anticipated={anticipated}
              component={renderTextField}
              onChange={e => this.handleChange("originationDate", e)}
              mobile={0}
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
)(withStyles(styles)(calcForm));
