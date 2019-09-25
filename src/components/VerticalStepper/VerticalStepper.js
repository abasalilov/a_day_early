import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {
  RadioGroup,
  PlatformRadioGroup,
  StyledButton,
  FormField,
  SaveButton,
  Text
} from "../common";
import { ImageManager } from "../ImageManager";
import {
  imageSelect as imageSelectActionCreator,
  imageReset as imageResetActionCreator
} from "../../actions";

const styles = theme => ({
  root: {
    width: "100%",
    padding: "1rem"
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    height: "3rem"
  },
  lastButtonContainer: {
    display: "flex",
    width: "20rem",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
    borderRadius: "1rem"
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  cloudOptions: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "3rem"
  },
  mobileCloudOptions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  imageBtn: {
    width: "12rem !important",
    padding: "1rem"
  },
  mobileImageBtn: {
    width: "40rem !important",
    padding: "1rem",
    margin: "2rem"
  },
  textField: {
    width: "100%"
  },
  imageSelectButtons: {
    margin: "1.5rem",
    textAlign: "center"
  },
  mobileIcon: {},
  buttons: {},
  mobileButtons: {
    display: "flex",
    justifyContent: "space-between"
  },
  button: {
    height: "6rem",
    width: "14rem !important"
  }
});

const steps = ["Type of Post", "Content", "Platforms"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Posting an image w/ a subtitle? Status update? Or all of the above? `;
    case 1:
      return "Select the content you'd like to share with your community:";
    case 2:
      return `Where would you like to share your post?`;
    default:
      return "Unknown step";
  }
}

class VerticalLinearStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      imageSelected: false,
      blogSelected: false,
      blogUrl: "",
      message: "",
      textSelected: false,
      showUploadPanel: false,
      fbSelected: false,
      twitter: false,
      instaG: false,
      telegram: false,
      imgURL: "",
      imgReady: false,
      error: "",
      showPriorPhotoList: false,
      showCamera: false,
      hideOptions: false
    };

    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleSelectUpload = this.handleSelectUpload.bind(this);
    this.handleSelectPhotoList = this.handleSelectPhotoList.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleBlog = this.handleBlog.bind(this);
    this.handleSelectCamera = this.handleSelectCamera.bind(this);
  }

  async componentDidUpdate(prevProps) {
    const name =
      this.constructor.displayName || this.constructor.name || "Component";
    console.group(name);
    Object.keys(prevProps).forEach(key => {
      if (prevProps[key] !== this.props[key]) {
        console.log(
          `property ${key} changed from ${prevProps[key]} to ${this.props[key]}`
        );
      }
    });
    console.groupEnd(name);
  }

  handleCheckBoxChange(name) {
    this.setState({ [name]: !this.state[name] });
  }

  handleNext() {
    const {
      activeStep,
      textSelected,
      imageSelected,
      blogSelected
    } = this.state;
    const { urlSelected } = this.props;

    let hasFilledOutData = false;

    if (activeStep === 0) {
      if (textSelected || imageSelected || blogSelected) {
        hasFilledOutData = true;
      }
    } else if (activeStep === 1) {
      const { blogUrl, message } = this.state;
      if (confirmValue(blogUrl) || confirmValue(message) || urlSelected) {
        hasFilledOutData = true;
      }
    } else if (activeStep === 2) {
      const { fbSelected, twitter, instaG, telegram } = this.state;
      if (fbSelected || twitter || instaG || telegram) {
        hasFilledOutData = true;
      }
    }
    if (hasFilledOutData) {
      this.setState(state => ({
        activeStep: state.activeStep + 1
      }));
    } else {
      alert("Please fill out the fields before moving on to the next step");
    }
  }

  handleBack() {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  }

  handleReset() {
    this.setState({
      activeStep: 0,
      imageSelected: false,
      blogSelected: false,
      blogUrl: "",
      message: "",
      textSelected: false,
      showUploadPanel: false,
      fbSelected: false,
      twitter: false,
      instaG: false,
      telegram: false,
      imgURL: "",
      imgReady: false,
      error: "",
      showPriorPhotoList: false
    });
  }

  handleSelectUpload() {
    this.setState({
      showUploadPanel: true,
      showPriorPhotoList: false,
      showCamera: false,
      hideOptions: true
    });
  }

  handleSelectPhotoList() {
    this.setState({
      showUploadPanel: false,
      showPriorPhotoList: true,
      showCamera: false,
      hideOptions: true
    });
  }

  handleSelectCamera() {
    this.setState({
      showUploadPanel: false,
      showPriorPhotoList: false,
      showCamera: true,
      hideOptions: true
    });
  }

  handleTextChange(e) {
    this.setState({ message: e.target.value });
  }

  handleBlog(e) {
    this.setState({ blogUrl: e.target.value });
  }

  renderImageSelectBtnsSection() {
    const { classes, mobile } = this.props;
    const cameraOptionLabel = mobile ? "Take a Picture" : "Take a selfie";
    const btnClassName = mobile
      ? classes.mobileCloudOptions
      : classes.cloudOptions;

    const imgBtnName = mobile ? classes.mobileImageBtn : classes.imageBtn;

    return (
      <div className={btnClassName}>
        <StyledButton
          label="Upload New Images"
          name="Upload New Images"
          variant="contained"
          className={imgBtnName}
          onClick={this.handleSelectUpload}
          primary={1}
        />
        <div />
        <StyledButton
          label="Prior uploads"
          name="Prior uploads"
          variant="contained"
          className={imgBtnName}
          onClick={this.handleSelectPhotoList}
          primary={1}
        />
        <div />
        <StyledButton
          label={cameraOptionLabel}
          name={cameraOptionLabel}
          variant="contained"
          className={imgBtnName}
          onClick={this.handleSelectCamera}
          primary={1}
        />
      </div>
    );
  }

  renderButtons() {
    const { activeStep } = this.state;
    const { classes, mobile } = this.props;
    if (mobile) {
      return (
        <div className={classes.mobileButtons}>
          <StyledButton
            disabled={activeStep === 0}
            onClick={this.handleBack}
            className={classes.button}
            label={"Back"}
          />
          <StyledButton
            variant="contained"
            color="primary"
            onClick={this.handleNext}
            className={classes.button}
            label={activeStep === steps.length - 1 ? "Finish" : "Next"}
          />
        </div>
      );
    }
    return (
      <div className={classes.buttons}>
        <Button
          disabled={activeStep === 0}
          onClick={this.handleBack}
          className={classes.button}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleNext}
          className={classes.button}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    );
  }

  render() {
    const { classes, mobile } = this.props;
    const {
      activeStep,
      blogSelected,
      imageSelected,
      textSelected,
      showUploadPanel,
      fbSelected,
      twitter,
      instaG,
      telegram,
      showPriorPhotoList,
      showCamera,
      hideOptions
    } = this.state;
    const iconContainerName = mobile ? classes.mobileIcon : classes.reg;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>
                  <Text>{label}</Text>
                </StepLabel>
                <StepContent>
                  <Text>{getStepContent(index)}</Text>
                  <div className={classes.actionsContainer}>
                    <div>
                      {activeStep === 0 && (
                        <RadioGroup
                          mobile={mobile}
                          blogSelected={blogSelected}
                          imageSelected={imageSelected}
                          textSelected={textSelected}
                          handleCheckBoxChange={this.handleCheckBoxChange}
                        />
                      )}
                      {activeStep === 1 && imageSelected && (
                        <div className={classes.imageSelectButtons}>
                          <Text align="center" gutterBottom variant="subtitle1">
                            Select Image Source
                          </Text>

                          {!hideOptions && this.renderImageSelectBtnsSection()}
                        </div>
                      )}
                      {activeStep === 1 && textSelected && (
                        <FormField
                          meta={{ touched: false, error: false }}
                          type="text"
                          label="Status Update"
                          name="statusUpdate"
                          className={classes.textField}
                          placeholder="#GMAS #yolo"
                          margin={"none"}
                          multiline
                          rows="2"
                          rowsMax="10"
                          showborder={1}
                          value={this.state.message}
                          onChange={e => this.handleTextChange(e)}
                        />
                      )}
                      {activeStep === 1 && blogSelected && (
                        <div className={classes.textField}>
                          <FormField
                            meta={{ touched: false, error: false }}
                            type="text"
                            label="Blog URL"
                            name="statusUpdate"
                            placeholder="www.medium.com/my-great-article"
                            margin={"none"}
                            multiline
                            rows="2"
                            rowsMax="10"
                            showborder={1}
                            value={this.state.blogUrl}
                            onChange={this.handleBlog}
                          />
                        </div>
                      )}

                      {activeStep === 1 && imageSelected && (
                        <div className={classes.textField}>
                          <ImageManager
                            showUploadPanel={showUploadPanel}
                            showPriorPhotoList={showPriorPhotoList}
                            showCamera={showCamera}
                          />
                        </div>
                      )}

                      {activeStep === 2 && (
                        <PlatformRadioGroup
                          fbSelected={fbSelected}
                          twitter={twitter}
                          instaG={instaG}
                          telegram={telegram}
                          handleCheckBoxChange={this.handleCheckBoxChange}
                        />
                      )}
                      {this.renderButtons()}
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Text>All steps completed - you&quot;re ready to post!</Text>
            <div className={classes.lastButtonContainer}>
              <Button
                onClick={this.handleReset}
                className={classes.button}
                variant="contained"
                color="secondary"
              >
                Reset
              </Button>
              <SaveButton
                socialData={this.props.socialData}
                fbSelected={fbSelected}
                twitter={twitter}
                instaG={instaG}
                telegram={telegram}
              />
            </div>
          </Paper>
        )}
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = state => {
  return {
    mobile: state.mobile,
    urlSelected: state.socialMedia.imgSelected,
    socialData: state.socialMedia
  };
};

const ConnectedVerticalStepper = connect(mapStateToProps)(
  withStyles(styles)(VerticalLinearStepper)
);

export const VerticalStepper = ConnectedVerticalStepper;

function confirmValue(data) {
  if (typeof data === "undefined") {
    return false;
  } else if (data === "") {
    return false;
  } else if (data === null) {
    return false;
  } else {
    return true;
  }
}
