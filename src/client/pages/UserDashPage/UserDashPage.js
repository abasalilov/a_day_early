import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { adeLoginSubmit as createAuthReqActionCreator } from "../../actions";
import { Loading } from "../../components/navigation";
import { HelpModal } from "../../components/modals";
import { Image, HelpButton } from "../../components/common";
import { FooterSection } from "../../components/Sections/SubSections/FooterSection";
import { ConnectedCalculatorPage } from "../CalculatorPage/CalculatorPage";
import { PayPalButton } from "../../components/PayPalButton";
const styles = {
  dash: {
    border: "solid #303290 2px",
    padding: "1rem",
    borderRadius: "1rem",
    width: "90%",
    marginTop: "1rem",
    marginBottom: "3rem"
  },
  mobileDash: {
    textAlign: "center",
    border: "solid #303290 2px",
    padding: "1rem",
    width: "90%",
    borderRadius: "1rem",
    margin: "2rem auto"
  },
  mobileRoot: {
    flexGrow: 1,
    marginTop: "8rem",
    backgroundColor: "#FFFFFF"
  },
  root: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center"
  },
  img: {
    width: "10rem"
  },
  mobileImg: {
    marginBottom: "1rem",
    width: "40%"
  },
  topRow: {
    padding: "1rem",
    width: "100%"
  },
  topRowContents: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  container: {
    display: "flex",
    flexDirection: "row"
  },
  mobileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  dashSection: {
    padding: "1rem"
  },
  mobileDashSection: {
    padding: "1rem",
    width: "45rem"
  },
  dashHeader: {
    margin: "1rem"
  },
  parent: {
    backgroundColor: "#FFFFFF",
    paddingTop: "3rem"
  },
  ops: {},
  vertical: {
    border: "solid blue 2px"
  }
};

class DashBoardContainerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelpModal: false,
      componentIsSet: false,
      confirmAdminAccess: false,
      socialMedia: false,
      cryptoCard: false,
      selectionMade: false,
      shouldRender: true,
      selectedOptions: []
    };

    this.handleSelectSocialMedia = this.handleSelectSocialMedia.bind(this);
    this.handleSelectCrypto = this.handleSelectCrypto.bind(this);
    this.startAnimationClock = this.startAnimationClock.bind(this);
    this.handleStopAnimation = this.handleStopAnimation.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSelectOption = this.handleSelectOption.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  componentDidMount() {
    if (!this.props.authStatus) {
      this.props.history.push("/login");
    }
  }

  handleToggleModal() {
    const { showHelpModal } = this.state;
    if (showHelpModal) {
      this.setState({
        showHelpModal: false
      });
    } else {
      this.setState({
        showHelpModal: true
      });
    }
  }

  handleReset() {
    this.setState({
      showHelpModal: false,
      componentIsSet: false,
      confirmAdminAccess: false,
      socialMedia: false,
      cryptoCard: false,
      selectionMade: false,
      shouldRender: true,
      selectedOptions: []
    });
  }

  handleSelectSocialMedia() {
    this.setState({
      socialMedia: true,
      cryptoCard: false,
      selectionMade: true
    });
    this.startAnimationClock();
  }

  handleSelectCrypto() {
    this.setState({
      socialMedia: false,
      cryptoCard: true,
      selectionMade: true
    });
    this.startAnimationClock();
  }

  setComponent() {
    this.setState({ componentIsSet: true });
  }

  startAnimationClock() {
    setTimeout(this.handleStopAnimation, 1500);
  }

  handleStopAnimation() {
    this.setState({ shouldRender: false });
  }

  handleSelectOption(option) {
    const { selectedOptions } = this.state;
    const newArr = selectedOptions.slice(0);
    newArr.push(option);
    this.setState({ selectedOptions: newArr });
  }

  handleRemoveOption(option) {
    const { selectedOptions } = this.state;
    const idx = selectedOptions.indexOf(option);
    const firstHalf = selectedOptions.slice(0, idx);
    const secondHalf = selectedOptions.slice(idx);
    const newArr = firstHalf.concat(secondHalf);
    this.setState({ selectedOptions: newArr });
  }

  renderTopRow() {
    const { classes, mobile, username } = this.props;
    const { selectedOptions } = this.state;
    const minWidth = mobile ? "100%" : "22rem";
    const containerClass = mobile ? classes.mobilePic : classes.picContainer;
    const imgClass = mobile ? classes.mobileImg : classes.img;

    return (
      <div className={classes.topRow}>
        <Grid item xs={12}>
          <div className={classes.topRowContents}>
            <Image
              showSpinner={false}
              containerClassName={containerClass}
              imgClassName={imgClass}
              src={
                "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1570753007/heroImg.png"
              }
            />

            {this.state.selectionMade && (
              <Button className={classes.dashHeader} onClick={this.handleReset}>
                Back to Main Menu
              </Button>
            )}
          </div>
        </Grid>
      </div>
    );
  }

  render() {
    const {
      classes,
      history,
      mobile,
      submit,
      submitting,
      profileComplete,
      isInternal,
      imgPublicId
    } = this.props;
    const {
      showHelpModal,
      componentIsSet,
      socialMedia,
      selectionMade,
      shouldRender,
      cryptoCard
    } = this.state;

    const gridName = mobile ? classes.mobileDash : classes.dash;
    const rootName = mobile ? classes.mobileRoot : classes.root;
    const containerJusifyStyle = {
      justifyContent: shouldRender ? "space-between" : "center"
    };

    if (!componentIsSet) {
      this.setComponent();
      return <Loading />;
    }

    if (showHelpModal) {
      return (
        <HelpModal
          open={showHelpModal}
          mobile={mobile}
          closeClick={this.handleToggleModal}
        />
      );
    }
    const dashSectionName = mobile
      ? classes.mobileDashSection
      : classes.dashSection;
    return (
      <div className={classes.parent}>
        {this.renderTopRow()}
        <div className={rootName}>
          <Grid
            container
            direction={mobile ? "column" : "row"}
            className={gridName}
          >
            <Grid item>{`User Dashboard for ${this.props.username}`}</Grid>
          </Grid>
          <div style={{ margin: "1rem" }}>
            <HelpButton onClick={this.handleToggleModal} />
          </div>
        </div>
        <div>
          <PayPalButton />
        </div>
        <div className={rootName}>
          <Grid
            container
            justify="center"
            direction={mobile ? "column" : "row"}
            className={gridName}
          >
            <ConnectedCalculatorPage />
          </Grid>
        </div>
        <FooterSection mobile={mobile} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    mobile: state.mobile,
    authStatus: state.auth.result,
    username: state.auth.username,
    profileComplete: true
  };
};

const mapDispatchToProps = dispatch => {
  return {
    makeAuthReq: (userEml, pw) =>
      dispatch(createAuthReqActionCreator(userEml, pw))
  };
};

const DashBoardContainerComponentWithStyles = withStyles(styles)(
  DashBoardContainerPage
);

const ConnectedDashBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoardContainerComponentWithStyles);

export const UserDashPage = {
  component: ConnectedDashBoard
};

DashBoardContainerPage.propTypes = {
  makeAuthReq: PropTypes.func,
  classes: PropTypes.object,
  reset: PropTypes.func,
  submit: PropTypes.func,
  auth: PropTypes.object,
  mobile: PropTypes.bool,
  history: PropTypes.object
};
