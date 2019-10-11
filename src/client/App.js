import * as React from "react";
import { connect } from "react-redux";
import EventListener from "react-event-listener";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import { renderRoutes } from "react-router-config";
import { Navigator, Loading } from "./components/navigation";
import { isHeaderMobile } from "./utils";
import {
  resetAuth as createResetAuthAction,
  resizeEvent as createResizeEventAction
} from "./actions";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ["Raleway-ExtraBold"].join(",")
  },
  // https://material-ui.com/customization/themes/#customizing-all-instances-of-a-component-type
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        background:
          "linear-gradient(45deg, #b9e8e2 5%, #80bcb5 65%, #303290 95%)",
        borderRadius: 3,
        border: 0,
        color: "white !important",
        height: 48,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(85, 144, 245, .3)",
        letterSpacing: "2px",
        fontWeight: "600"
      }
    }
  }
});

class App extends React.PureComponent<PropsT> {
  constructor(props) {
    super(props);

    this.state = {
      confirmedClassName: ""
    };

    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleClassNameConfirmation = this.handleClassNameConfirmation.bind(
      this
    );
  }

  async componentDidMount() {
    this.handleWindowSizeChange();
  }

  handleWindowSizeChange() {
    const { resize } = this.props;
    const headerMobile = isHeaderMobile();
    resize(headerMobile);
    this.handleClassNameConfirmation(headerMobile);
  }

  handleRedirect() {
    const { loc, resetAuthentication } = this.props;
    loc.pathname = "/login";
    resetAuthentication();
  }

  handleClassNameConfirmation(mobile) {
    if (mobile) {
      this.setState({ confirmedClassName: "mobileRootStyle" });
    } else {
      this.setState({ confirmedClassName: "regRootStyle" });
    }
  }

  render() {
    const { mobile, history, location, route } = this.props;
    const readyToRender = mobile !== null;
    return (
      <MuiThemeProvider theme={theme}>
        <Helmet>
          <title>A Day Early</title>
          <meta name="description" content="A Day Early" />
          <meta name="theme-color" content="#008f68" />
        </Helmet>
        <Helmet defaultTitle="A Day Early" titleTemplate="A Day Early" />
        <CssBaseline />
        <EventListener target="window" onResize={this.handleWindowSizeChange} />
        {readyToRender && (
          <Navigator loc={location} history={history} mobile={mobile} />
        )}
        {readyToRender && renderRoutes(route.routes)}
        {!readyToRender && <Loading />}
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetAuthentication: () => {
      dispatch(createResetAuthAction());
    },
    resize: mobile => {
      dispatch(createResizeEventAction(mobile));
    }
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    mobile: state.mobile
  };
};

const AppComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default {
  component: AppComponent
};
