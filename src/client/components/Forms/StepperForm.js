import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import Typography from "@material-ui/core/Typography";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

mobiscroll.settings = {
  theme: "ios",
  themeVariant: "light"
};

class StepperComponent extends React.Component {
  render() {
    return (
      <div className="mbsc-grid mbsc-grid-fixed md-custom-usage">
        <div className="mbsc-row">
          <div className="mbsc-col-md-10 mbsc-col-xl-9 custom-section">
            <h4>Skip enhancement of elements inside a mobiscroll form</h4>
            <mobiscroll.Form className="mbsc-form-grid mbsc-grid">
              <div className="mbsc-row">
                <div className="mbsc-col-md-6 mbsc-col-12">
                  <mobiscroll.Input
                    inputStyle="box"
                    labelStyle="floating"
                    type="text"
                    placeholder="Email"
                  >
                    Email
                  </mobiscroll.Input>
                </div>
                <div className="mbsc-col-md-6 mbsc-col-12">
                  <mobiscroll.Input
                    inputStyle="box"
                    labelStyle="floating"
                    type="password"
                    placeholder="Password"
                    passwordToggle={true}
                  >
                    Password
                  </mobiscroll.Input>
                </div>
              </div>
              <div className="mbsc-row">
                <div className="mbsc-col-md-6 mbsc-col-12">
                  <mobiscroll.Input
                    inputStyle="box"
                    labelStyle="floating"
                    type="text"
                    placeholder="City"
                  >
                    City
                  </mobiscroll.Input>
                </div>
                <div className="mbsc-col-md-3 mbsc-col-6">
                  <mobiscroll.Input
                    inputStyle="box"
                    labelStyle="floating"
                    type="text"
                    placeholder="State"
                  >
                    State
                  </mobiscroll.Input>
                </div>
                <div className="mbsc-col-md-3 mbsc-col-6">
                  <mobiscroll.Input
                    inputStyle="box"
                    labelStyle="floating"
                    type="text"
                    placeholder="Zip"
                  >
                    Zip
                  </mobiscroll.Input>
                </div>
              </div>
              <div className="mbsc-row">
                <div className="mbsc-col-md-6 mbsc-col-12">
                  <mobiscroll.Switch inputStyle="box">
                    Agree to terms and conditions
                  </mobiscroll.Switch>
                </div>
              </div>
              <div className="mbsc-row">
                <div className="mbsc-col-6">
                  <button data-enhance="false" className="custom-button">
                    Submit
                  </button>
                </div>
              </div>
            </mobiscroll.Form>
          </div>
          <div
            className="mbsc-col-md-10 mbsc-col-xl-9 mbsc-form-grid outside-form"
            style={{ border: "solid green" }}
          >
            <h4>Using form elements outside of forms</h4>
            <div className="mbsc-row mbsc-padding">
              <p>
                Lorem ipsum dolor sit amet, similique expetendis suscipiantur no
                eos. Veniam officiis singulis usu id. Iriure animal vim ad, vix
                ex porro melius labitur, ea mentitum splendide laboramus pro.
                His vitae fabellas in, ad sed justo maiestatis. Te per quot
                brute civibus. Ei elit voluptatum usu. Fuisset necessitatibus
                eum cu, te deserunt omittantur nam.
              </p>
            </div>
            <div className="mbsc-row mbsc-align-items-center mbsc-justify-content-center mbsc-padding">
              <div className="mbsc-col-12 mbsc-align-center">
                <h4>Subscribe to our newsletter</h4>
              </div>
              <div className="mbsc-col-md-6 mbsc-col-12">
                <mobiscroll.Input
                  inputStyle="box"
                  type="text"
                  placeholder="Enter your email address"
                ></mobiscroll.Input>
              </div>
              <div className="mbsc-col-md-3 mbsc-col-12 mbsc-align-center">
                <mobiscroll.Button className="mbsc-btn-primary">
                  Subscribe
                </mobiscroll.Button>
              </div>
            </div>
            <div className="mbsc-row mbsc-padding">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const StepperForm = StepperComponent;
