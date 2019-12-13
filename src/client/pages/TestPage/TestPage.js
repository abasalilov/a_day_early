import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { StepperForm } from "../../components/Forms";
import { ProgressBar } from "./ProgressSlider";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "./index.css";

const styles = {
  container: {
    margin: "4rem"
  }
};

const topLabelStyle = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem",
  margin: "6rem 1rem 1rem 2rem"
};

const labelStyle = {
  color: "#3f51b5"
  // textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
};

const sectionStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  border: "solid #317439 1px",
  padding: "1rem",
  borderRadius: "1rem"
};

class TestPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelOpen: true,
      steps: 50
    };

    this.handleTogglePanel = this.handleTogglePanel.bind(this);
    this.setSteps = this.setSteps.bind(this);
  }

  componentDidMount() {}

  handleTogglePanel() {
    const { panelOpen } = this.state;
    this.setState({ panelOpen: !panelOpen });
  }

  setSteps(value) {
    console.log("value", value);
    this.setState({
      steps: value
    });
  }

  render() {
    const { panelOpen } = this.state;
    const formClass = panelOpen ? "mbsc-col-8" : "mbsc-col-10";
    const panelClass = panelOpen ? "mbsc-col-3" : "mbsc-col-1";
    return (
      <div style={{ marginTop: "6rem" }}>
        <mobiscroll.Form
          className="mbsc-form-grid"
          theme="ios"
          themeVariant="light"
        >
          <mobiscroll.Button onClick={this.handleTogglePanel}>
            Toggle
          </mobiscroll.Button>
          <div className="mbsc-grid">
            <div className="mbsc-col-12">
              <ProgressBar />
            </div>
            <div className="mbsc-col-12">
              <div className="mbsc-row" style={{ justifyContent: "center" }}>
                <div className={formClass} style={{ border: "solid red" }}>
                  <Typography
                    variant="h4"
                    style={labelStyle}
                    align="left"
                    gutterBottom
                  >
                    Loan Information - 2
                  </Typography>
                  <div>
                    <StepperForm />
                  </div>
                </div>
                <div className={panelClass} style={{ border: "solid green" }}>
                  Here
                  <span class="mbsc-ic mbsc-ic-close"></span>
                  <span class="mbsc-ic mbsc-ic-plus"></span>
                  <span class="mbsc-ic mbsc-ic-arrow-right2"></span>
                  <span class="mbsc-ic mbsc-ic-arrow-left2"></span>
                </div>
              </div>
            </div>
          </div>
        </mobiscroll.Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mobile: state.mobile,
  input: state.input
});

const mapDispatchToProps = dispatch => {
  return {};
};

const ConnectedProgramsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TestPageComponent));

export const TestPage = {
  component: ConnectedProgramsPage
};

// <div className="mbsc-col-6">
// <mobiscroll.Input
//   name="paymentAmount"
//   placeholder="Payment Amount ($)"
//   inputStyle="box"
//   labelStyle="floating"
// >
//   {"paymentLabel"}
// </mobiscroll.Input>
// </div>
