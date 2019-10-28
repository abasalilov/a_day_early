import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import PaypalExpressBtn from "react-paypal-express-checkout";
import {
  adePayPalSuccess as createPayPalSuccessActionCreator,
  adePayPalFailure as createPayPalFailureActionCreator
} from "../../actions";

const styles = {
  login: {
    textAlign: "center"
  },
  mobileLogin: {
    textAlign: "center"
  },
  label: {
    color: "#2C4F4D",
    fontSize: "1.5rem",
    margin: "1.5rem"
  },
  mobileLabel: {
    fontSize: "5rem",
    color: "#2C4F4D",
    margin: "4rem"
  },
  loginField: {
    margin: "2rem 1.5rem 1.5rem 1.5rem"
  },
  welcome: {
    margin: "4rem",
    textAlign: "center",
    fontSize: "2.3rem"
  },
  field: {
    width: "95%",
    borderBottom: "2rem"
  },
  spinContainer: {
    position: "relative",
    display: "flex",
    margin: "0 auto",
    flexDirection: "column"
  },
  buttons: {},
  btn: {
    margin: "0 auto",
    width: "50% !important"
  },
  err: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem auto",
    color: "red"
  },
  noErr: {
    display: "flex",
    visibility: "hidden",
    flexDirection: "column",
    margin: "1rem auto"
  },
  link: {
    margin: "1rem auto",
    color: "#2C4F4D",
    fontSize: "1.5rem"
  },
  mobileLink: {
    fontSize: "3rem",
    color: "#2C4F4D",
    whiteSpace: "pre",
    marginTop: "3rem"
  },
  img: {
    width: "28rem"
  },
  mobileImg: {
    marginBottom: "1rem",
    width: "40%"
  },
  mobileRoot: {
    flexGrow: 1,
    marginTop: "12rem"
  },
  root: {
    flexGrow: 1,
    marginTop: "4rem"
  },
  spinner: {
    background: "#4267b2",
    borderRadius: "5px",
    color: "white",
    height: "40px",
    textAlign: "center",
    width: "250px",
    margin: "2rem auto"
  },
  regLink: {
    textDecoration: "none",
    color: "#303290"
  },
  mobileLoginForm: {},
  loginForm: {},
  picContainer: {
    marginBottom: "2rem"
  },
  mobilePic: {
    width: "22rem",
    verticalAlign: "middle",
    display: "block",
    margin: "auto"
  }
};

class PayPal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    console.log("props", this.props);
    const onSuccess = payment => {
      // Congratulation, it came here means everything's fine!
      console.log("The payment has succeeded!", payment);
      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    };

    const onCancel = data => {
      // User pressed "cancel" or close Paypal's popup!
      console.log("The payment was cancelled!", data);
      // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    };

    const onError = err => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log("Error!", err);
      // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
      // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    };

    let env = "sandbox"; // you can set here to 'production' for production
    let currency = "USD"; // or you can set this value from your props or state
    let total = 1200; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const client = {
      sandbox:
        "ARRTv82XMWvdSxhe1L7KjDKXcs1NFgCYkH2FoRCvHye0pKi0EiGxNcBJsdNqW_fKJ5HrAwnMEgjjVMWl",
      production:
        "AZgeg3npjR3dcJkAiSClTGO0fIo1uiJgmb4Jm7MKI-zMxb7_coOuMaJP8aG2B2i9lbjpBK-h4BLG5mqN"
    };
    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    newUserRegistered: state.users.registered,
    mobile: state.mobile,
    paypal: state.paypal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    makePaymentSuccess: dt => dispatch(createPayPalSuccessActionCreator(dt)),
    makePaymentFailure: dt => dispatch(createPayPalFailureActionCreator(dt))
  };
};

const PayPalFormWithStyles = withStyles(styles)(
  reduxForm({
    form: "PayPal" // a unique identifier for this form
  })(PayPal)
);

const ConnectedPayPal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PayPalFormWithStyles);

export const PayPalButton = ConnectedPayPal;
