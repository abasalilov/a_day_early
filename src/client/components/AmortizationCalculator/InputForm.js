import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { updateAmortGraph, updateInfoForm } from "../../actions";
import { withStyles } from "@material-ui/core/styles";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

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
      originalLoanAmount: null,
      openCalendar: false
    };
    this.handleOpenCalendar = this.handleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ originationDate: generateFirstDate() });
  }

  handleChange(name, e) {
    console.log("1 handleChange", name);
    if (name === "calendar") {
      if (this.state.calendarOpen === true) {
        this.setState({ calendar: e.target.value });
      } else {
        this.setState({ calendar: e.target.value, calendarOpen: true });
      }
    } else if (name === "originationDate") {
      const updated = new Date(e.value);
      const ur = getFormattedDate(updated);
      this.setState({ dateTouched: true, originationDate: ur }, () => {
        const oldState = Object.assign({}, this.state);
        delete oldState.dateTouched;
        this.props.updateInputForm(oldState);
      });
    } else {
      this.setState({ [name]: e.target.value }, () => {
        const oldState = Object.assign({}, this.state);
        delete oldState.dateTouched;
        this.props.updateInputForm(oldState);
      });
    }
  }

  render() {
    const { anticipated } = this.props;
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
      <mobiscroll.Form
        className="mbsc-form-grid"
        theme="ios"
        themeVariant="light"
      >
        <div className="mbsc-grid">
          <div className="mbsc-row-12">
            <div className="mbsc-col-12">
              <mobiscroll.Input
                inputStyle="box"
                labelStyle="floating"
                label={loanLabel}
                onChange={e => this.handleChange("loanAmount", e)}
                placeholder="Enter Loan Amount ($)"
              >
                {loanLabel}
              </mobiscroll.Input>
            </div>
            <div className="mbsc-col-12">
              <mobiscroll.Dropdown
                label={interestLabel}
                name="interestRate"
                onChange={e => this.handleChange("interestRate", e)}
                inputStyle="box"
                labelStyle="floating"
              >
                <option></option>
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
              </mobiscroll.Dropdown>
            </div>

            <div className="mbsc-col-12">
              <mobiscroll.Dropdown
                label={termLabel}
                name="term"
                onChange={e => this.handleChange("term", e)}
                inputStyle="box"
                labelStyle="floating"
              >
                <option></option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
              </mobiscroll.Dropdown>
            </div>
            <div className="mbsc-col-12">
              <mobiscroll.Input
                name="paymentAmount"
                placeholder="Payment Amount ($)"
                onChange={e => this.handleChange("paymentAmount", e)}
                inputStyle="box"
                labelStyle="floating"
              >
                {paymentLabel}
              </mobiscroll.Input>
            </div>
            {!anticipated && (
              <div className="mbsc-col-12">
                <mobiscroll.Input
                  name="originalLoanAmount"
                  label={"Original Loan Amount"}
                  placeholder="Original Loan Amount ($)"
                  onChange={e => this.handleChange("originalLoanAmount", e)}
                  inputStyle="box"
                  labelStyle="floating"
                >
                  Original Loan Amount
                </mobiscroll.Input>
              </div>
            )}
            <div className="mbsc-col-12 mbsc-col-lg-8">
              <mobiscroll.Calendar
                display="bottom"
                theme="material"
                touchUi={false}
                anchor="span"
                onChange={e => this.handleChange("calendar", e)}
                value={
                  this.state.openCalendar
                    ? this.state.calendar
                    : generateFirstDate()
                }
              >
                <mobiscroll.Input inputStyle="box" labelStyle="floating">
                  {originationLabel}
                </mobiscroll.Input>
              </mobiscroll.Calendar>
            </div>
          </div>
        </div>
      </mobiscroll.Form>
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
      console.log("3 st update Forminpu", st);
      dispatch(updateInfoForm(st));
    }
  };
};

export const InputForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(calcForm));
