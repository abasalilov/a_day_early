import * as React from "react";
import { connect } from "react-redux";
import EventListener from "react-event-listener";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import { renderRoutes } from "react-router-config";
import { Navigator, Loading } from "./components/navigation";
import { Image } from "./components/common";
import { isHeaderMobile } from "./utils";
import {
  resetAuth as createResetAuthAction,
  resizeEvent as createResizeEventAction
} from "./actions";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Modal from "react-modal";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const NewModal = props => (
  <Modal
    closeTimeoutMS={200}
    isOpen={props.showModal}
    onRequestClose={props.closeModal}
  >
    <Grid container alignItems="center" justify="center" direction="column">
      <Grid item xs={12}>
        <Grid item xs={6}>
          <Image
            showSpinner={false}
            style={{ width: "600px" }}
            src={
              "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1571170225/adeLogo.png"
            }
          />
        </Grid>
      </Grid>
      <Grid item xs={6} style={{ marginTop: "5rem" }}>
        <Typography
          variant="h4"
          align="center"
          style={{
            fontSize: "2rem",
            marginTop: "2rem",
            color: "#2D3190"
          }}
          gutterBottom
        >
          We have launched a day early, please pardon the dust as we refine our
          functionality for you!
        </Typography>
      </Grid>
      <Grid item xs={6} style={{ marginTop: "2rem" }}>
        <Typography
          variant="h4"
          align="center"
          style={{
            fontSize: "2rem",
            marginTop: "2rem",
            color: "#2D3190"
          }}
          gutterBottom
        >
          Navigating to A Day Early in 2 seconds.
        </Typography>
      </Grid>
    </Grid>
  </Modal>
);

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
        background: "white",
        borderRadius: 3,
        border: 0,
        height: 48,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(85, 144, 245, .3)",
        letterSpacing: "2px",
        fontWeight: "600",
        "&:hover": {
          background: "red"
        }
      }
    },
    MuiInputBase: {
      root: {
        fontSize: "20px"
      }
    }
  }
});

class App extends React.PureComponent<PropsT> {
  constructor(props) {
    super(props);

    this.state = {
      confirmedClassName: "",
      modalOpen: true
    };

    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleClassNameConfirmation = this.handleClassNameConfirmation.bind(
      this
    );
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  async componentDidMount() {
    this.handleWindowSizeChange();
    setTimeout(() => this.handleCloseModal(), 40);
  }

  handleWindowSizeChange() {
    const { resize } = this.props;
    const headerMobile = isHeaderMobile();
    resize(headerMobile);
    this.handleClassNameConfirmation(headerMobile);
  }

  handleCloseModal() {
    this.setState({ modalOpen: false });
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
    const readyToRenderNav = mobile !== null && location.pathname !== "/";
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
        {readyToRenderNav && (
          <Navigator loc={location} history={history} mobile={mobile} />
        )}
        <div>
          <NewModal
            showModal={this.state.modalOpen}
            closeModal={this.handleCloseModal}
          />
          {readyToRender && renderRoutes(route.routes)}
        </div>

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
