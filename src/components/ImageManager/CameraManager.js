import React from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import saveAs from "file-saver";
import { isServer } from "../../utils";
import { StyledButton, FlexContainer } from "../common";
import Checkbox from "@material-ui/core/Checkbox";
import green from "@material-ui/core/colors/green";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import ThreeSixtyIcon from "@material-ui/icons/ThreeSixty";
import request from "superagent";

const initialState = {
  imageSrc: null,
  filterPhoto: false
};

const gridRoot = mobile => ({
  flexGrow: 1,
  padding: "2rem",
  width: mobile && "100%"
});

const styles = {
  root: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  checked: {},
  webContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem"
  },
  camBtn: {
    margin: "0 auto",
    width: "24rem !important",
    height: "7rem !important"
  },
  photoBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  mobileBtns: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  flipped: {
    borderRadius: "50%",
    backgroundColor: "orange"
  },
  notFlipped: {
    border: "solid #51a39a 3px",
    borderRadius: "50%",
    backgroundColor: "orange"
  },
  cameraBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    border: "solid #666 2px",
    borderRadius: "1rem"
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "1rem"
  },
  noBtnContainer: {
    margin: "0 auto"
  },
  iconBtn: {
    border: "solid yellow"
  },
  styledBtn: {
    margin: "2rem",
    padding: "1rem",
    width: "26rem !important"
  }
};

const makeCloudinaryReq = file =>
  request
    .post("https://api.cloudinary.com/v1_1/dbfv0bfmw/image/upload")
    .field("upload_preset", "uzh8rlgp")
    .field("file", file);

class CameraManagerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSrc: null,
      filterPhoto: false,
      url: null,
      public_id: null,
      flipped: false
    };

    this.setRef = this.setRef.bind(this);
    this.capture = this.capture.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleToggleFilterModal = this.handleToggleFilterModal.bind(this);
    this.handleFlipCamera = this.handleFlipCamera.bind(this);
  }

  setRef(webcam) {
    this.webcam = webcam;
  }

  async capture() {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ imageSrc });
    const response = await makeCloudinaryReq(imageSrc);
    const { url, public_id } = await response.body;
    this.setState({ url, public_id }, () => console.log("this", this.state));
  }

  handleToggleFilterModal() {
    const { url, public_id } = this.state;
    this.props.toggleFilterModal(url, public_id);
  }

  handleClear() {
    this.setState(initialState);
  }

  async handleSelect() {
    const { url, public_id } = this.state;
    this.props.selectImage(url, public_id);
  }

  handleFlipCamera() {
    this.setState({ flipped: !this.state.flipped });
  }

  render() {
    const {
      cameraName,
      photoName,
      height = 525,
      mobile,
      width = 700,
      classes
    } = this.props;
    const { imageSrc, flipped } = this.state;
    const videoConstraints = {
      width: 1792,
      height: 1008,
      facingMode: mobile && flipped ? "environment" : "user"
    };
    const classesObj = {
      root: classes.root,
      checked: classes.checked
    };
    const flipBtnSize = mobile ? "8rem" : "4rem";
    const buttonLabel = flipped ? "Take photo" : "Selfie";
    const initialBtnName = mobile
      ? classes.btnContainer
      : classes.noBtnContainer;
    const selectionBtnsName = mobile ? classes.mobileBtns : classes.photoBtns;
    return (
      <div className={cameraName} style={gridRoot(mobile)}>
        <FlexContainer mobile={mobile}>
          <div className={classes.webContainer}>
            <Webcam
              audio={false}
              height={height}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={width}
              videoConstraints={videoConstraints}
            />
            <div className={initialBtnName}>
              <StyledButton
                label={buttonLabel}
                name={buttonLabel}
                variant="contained"
                className={classes.camBtn}
                onClick={this.capture}
                primary={1}
              />

              <IconButton
                aria-label="Toggle camera direction"
                onClick={this.handleFlipCamera}
                disableRipple
              >
                <div className={flipped ? classes.flipped : classes.notFlipped}>
                  FLIP
                </div>
                {mobile && <ThreeSixtyIcon style={{ fontSize: flipBtnSize }} />}
              </IconButton>
            </div>
          </div>

          {imageSrc && (
            <div className={classes.webContainer}>
              <div style={{ height, width }}>
                <img className={photoName} src={imageSrc} />
              </div>
              <div className={selectionBtnsName}>
                <StyledButton
                  label="Use image"
                  name="Use image"
                  className={classes.styledBtn}
                  variant="contained"
                  onClick={this.handleSelect}
                  primary={1}
                />
                <StyledButton
                  label="Apply Filters"
                  name="Apply Filters"
                  className={classes.styledBtn}
                  variant="contained"
                  onClick={this.handleToggleFilterModal}
                  primary={1}
                />
                <StyledButton
                  label="Clear"
                  name="Clear"
                  className={classes.styledBtn}
                  variant="contained"
                  onClick={this.handleClear}
                  primary={1}
                />
              </div>
            </div>
          )}
        </FlexContainer>
      </div>
    );
  }
}

export const CameraManager = withStyles(styles)(CameraManagerComponent);

// deletePhoto() {
// add this to the clear image button
//   request
//     .post(
//       `https://api.cloudinary.com/v1_1/${
//         this.context.cloudName
//       }/delete_by_token`
//     )
//     .set("Content-Type", "application/json")
//     .set("X-Requested-With", "XMLHttpRequest")
//     .send({
//       token: this.props.uploadedPhoto.response.body.delete_token
//     })
//     .then(this.onDeletePhoto.bind(this));
// }

// onDeletePhoto() {
//   this.props.onDeleteUploadedPhoto(
//     this.props.uploadedPhoto.response.body.public_id
//   );
// }
