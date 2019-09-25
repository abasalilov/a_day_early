import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { CloudinaryContext } from "cloudinary-react";
import { PhotoListContainer } from "./PhotoListContainer";
import { PhotosUploaderContainer } from "./PhotosUploaderContainer";
import { CameraManager } from "./CameraManager";
import { imageConfig } from "./imageConfig";
import { fetchPhotos } from "./utils";
import { StyledButton, FlexContainer } from "../common";
import {
  photosFetched,
  imageSelect as createImageSelectActionCreator,
  toggleFilterModal as createToggleFilterActionCreator,
  imageReset
} from "../../actions";

const styles = {
  cloudContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    padding: "1rem"
  },
  photo: {
    border: "solid red 1px"
  },
  camera: {
    border: "solid #666 1px"
  }
};

class ImageManagerSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandPhotoList: false,
      expandPhotoUpload: false,
      dataReady: true
    };

    this.handleTogglePhotoList = this.handleTogglePhotoList.bind(this);
    this.handleToggleUpload = this.handleToggleUpload.bind(this);
    this.handleToggleDataReady = this.handleToggleDataReady.bind(this);
    let called = false;
  }

  async componentDidMount() {
    if (!this.called) {
      this.called = true;
      await fetchPhotos(imageConfig.cloud_name).then(
        this.props.onPhotosFetched
      );
    }
  }

  handleToggleDataReady() {}

  handleTogglePhotoList() {
    const { expandPhotoList } = this.state;
    this.setState({
      expandPhotoList: !expandPhotoList,
      expandPhotoUpload: false
    });
  }

  handleToggleUpload() {
    const { expandPhotoUpload } = this.state;
    this.setState({
      expandPhotoList: false,
      expandPhotoUpload: !expandPhotoUpload
    });
  }

  render() {
    const { expandPhotoList, expandPhotoUpload, dataReady } = this.state;
    const {
      username,
      mobile,
      classes,
      showUploadPanel,
      selectImage,
      selectedImgUrl,
      showCamera,
      showPriorPhotoList,
      toggleFilterModal
    } = this.props;

    return (
      <CloudinaryContext
        className={classes.cloudContainer}
        cloudName={imageConfig.cloud_name}
        uploadPreset={imageConfig.upload_preset}
      >
        <React.Fragment>
          {showPriorPhotoList && (
            <PhotoListContainer
              expand={expandPhotoList}
              selectedImgUrl={selectedImgUrl}
              shrink={expandPhotoUpload}
            />
          )}
          {showUploadPanel && (
            <PhotosUploaderContainer
              username={username}
              show={showUploadPanel}
              expandPhotoUpload={expandPhotoUpload}
            />
          )}
          {showCamera && (
            <FlexContainer mobile={mobile}>
              <CameraManager
                mobile={mobile}
                selectImage={selectImage}
                toggleFilterModal={toggleFilterModal}
                cameraName={classes.camera}
                photoName={classes.photo}
              />
            </FlexContainer>
          )}
        </React.Fragment>
      </CloudinaryContext>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  mobile: state.mobile
});

const mapDispatchToProps = dispatch => ({
  selectImage: (url, public_id, remove) =>
    dispatch(createImageSelectActionCreator(url, public_id, remove)),
  onPhotosFetched: photos => dispatch(photosFetched(photos)),
  toggleFilterModal: (url, public_id) =>
    dispatch(createToggleFilterActionCreator(url, public_id))
});

ImageManagerSection.propTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string,
  onPhotosFetched: PropTypes.func
};

ImageManagerSection.contextTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string
};

export const ImageManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ImageManagerSection));

Object.assign(
  ImageManagerSection.contextTypes,
  ImageManagerSection.contextTypes
);
