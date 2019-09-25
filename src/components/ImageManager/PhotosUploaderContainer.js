import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import request from "superagent";
import Dropzone from "react-dropzone";
import Typography from "@material-ui/core/Typography";
import { photosUploaded, updateUploadedPhoto } from "../../actions";
import UploadedPhotoStatus from "./UploadPhotoStatus";
import TextField from "@material-ui/core/TextField";

const styles = {
  form: {
    display: "flex",
    justifyContent: "space-between",
    width: "60%",
    margin: "0 auto"
  },
  formLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "45%",
    margin: "1rem",
    fontSize: "1rem"
  },
  mobileInput: {
    fontSize: "3rem",
    height: "10rem",
    marginTop: "1rem",
    marginLeft: "1rem",
    width: "100%"
  },
  dropzone: {
    width: "100%"
  }
};

class PhotosUploader extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { uploadedPhotos: [] };
    this.photoId = 1;
  }

  render() {
    const { show, classes, mobile } = this.props;
    return show ? (
      <Dropzone
        className={classes.dropzone}
        style={{ margin: "-1rem" }}
        disableClick={true}
        multiple={false}
        accept="image/*"
        style={{ position: "relative" }}
        onDrop={this.onPhotoSelected.bind(this)}
      >
        <div id="direct_upload">
          <Typography
            variant="h6"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Upload New Images Files
          </Typography>
          <Typography align="center" color="textPrimary" gutterBottom>
            You can also drag and drop an image file into the grey dashed area.
          </Typography>
          <form className={classes.form}>
            <div className={classes.formLine}>
              <div className="form_controls">
                <TextField
                  type="text"
                  ref={titleEl => (this.titleEl = titleEl)}
                  className="form-control"
                  placeholder="Title for Image"
                  label="Title for Image"
                />
              </div>
            </div>
            <div className={classes.formLine}>
              <Typography align="center" color="textPrimary" gutterBottom>
                Select File:
              </Typography>
              <div className="form_controls">
                <div className="upload_button_holder">
                  <label className="upload_button" htmlFor="fileupload">
                    Upload
                  </label>
                  <input
                    type="file"
                    id="fileupload"
                    accept="image/*"
                    multiple="multiple"
                    ref={fileInputEl => (this.fileInputEl = fileInputEl)}
                    onChange={() =>
                      this.onPhotoSelected(this.fileInputEl.files)
                    }
                  />
                </div>
              </div>
            </div>
          </form>
          {this.props.uploadedPhotos.map(uploadedPhoto => {
            return (
              <UploadedPhotoStatus
                key={uploadedPhoto.public_id}
                uploadedPhoto={uploadedPhoto}
              />
            );
          })}
        </div>
      </Dropzone>
    ) : null;
  }

  onPhotoSelected(files) {
    const url = `https://api.cloudinary.com/v1_1/${
      this.context.cloudName
    }/upload`;
    const title = this.titleEl.value;
    const { username } = this.props;

    for (let file of files) {
      const photoId = this.photoId++;

      request
        .post(url)
        .field("upload_preset", this.context.uploadPreset)
        .field("file", file)
        .field("multiple", true)
        .field("fetch_format", "jpg")
        .field(
          "tags",
          title ? `clients, ${title}, ${username}` : `clients, ${username}`
        )
        .field("context", title ? `photo=${title}` : "")
        .on("progress", progress =>
          this.onPhotoUploadProgress(photoId, file.name, progress)
        )
        .end((error, response) => {
          this.onPhotoUploaded(photoId, file.name, response);
        });
    }
  }

  onPhotoUploadProgress(id, fileName, progress) {
    this.props.onUpdateUploadedPhoto({
      id: id,
      fileName: fileName,
      progress: progress
    });
  }

  onPhotoUploaded(id, fileName, response) {
    this.props.onUpdateUploadedPhoto({
      id: id,
      fileName: fileName,
      response: response
    });

    this.props.onPhotosUploaded([response.body]);
  }
}

PhotosUploader.propTypes = {
  uploadedPhotos: PropTypes.array,
  onUpdateUploadedPhoto: PropTypes.func,
  onPhotosUploaded: PropTypes.func
};

PhotosUploader.contextTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string
};

export const PhotosUploaderContainer = connect(
  state => state,
  {
    onUpdateUploadedPhoto: updateUploadedPhoto,
    onPhotosUploaded: photosUploaded
  }
)(withStyles(styles)(PhotosUploader));

Object.assign(
  PhotosUploaderContainer.contextTypes,
  PhotosUploader.contextTypes
);
