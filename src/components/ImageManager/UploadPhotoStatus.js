import React, { Component } from "react";
import PropTypes from "prop-types";
import request from "superagent";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { deleteUploadedPhoto } from "../../actions";
import { StyledButton } from "../common";

const styles = {
  dataValue: {
    maxWidth: "30rem",
    padding: ".5rem",
    overflowWrap: "break-word",
    overflowX: "hidden"
  },
  dataKey: {
    padding: ".5rem"
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row"
  },
  dataRow: {
    margin: ".5rem",
    border: "solid green 1px",
    display: "flex",
    flexDirection: "row"
  },
  dataContainer: {
    margin: "1rem",
    padding: "1rem",
    height: "40%",
    border: "solid black 1px",
    overflowY: "scroll"
  }
};

class UploadedPhotoStatusComponent extends Component {
  render() {
    const { classes, mobile } = this.props;
    const uploadedPhoto = this.props.uploadedPhoto;
    const response = uploadedPhoto.response;
    const data = response && response.body;
    const percent = Math.floor(uploadedPhoto.progress.percent);
    return (
      <div>
        <h3>{uploadedPhoto.fileName}</h3>
        {data && data.delete_token && (
          <StyledButton
            className="delete-image"
            onClick={this.deletePhoto.bind(this)}
            label="Delete image"
            name="Delete image"
            mobile={mobile}
            primary
          />
        )}
        <div className={classes.statusContainer}>
          {!response && <div>Uploading... {percent}%</div>}
          {!response && <div>In progress</div>}
          {response && (
            <div className={classes.statusCode}>
              <Typography align="center" color="textPrimary">
                {`Upload completed with status code : ${response.status}`}
              </Typography>
            </div>
          )}
        </div>
        <div className="progress-bar">
          <div
            className="progress"
            role="progressbar"
            style={{ width: percent + "%" }}
          />
        </div>
        {data && (
          <div className="info">
            <div className={classes.dataContainer}>
              {Object.keys(data).map(key => {
                return (
                  <div key={key} className={classes.dataRow}>
                    <div className={classes.dataKey}>{`${key} :`}</div>
                    <div className={classes.dataValue}>
                      {JSON.stringify(data[key])}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  deletePhoto() {
    request
      .post(
        `https://api.cloudinary.com/v1_1/${
          this.context.cloudName
        }/delete_by_token`
      )
      .set("Content-Type", "application/json")
      .set("X-Requested-With", "XMLHttpRequest")
      .send({
        token: this.props.uploadedPhoto.response.body.delete_token
      })
      .then(this.onDeletePhoto.bind(this));
  }

  onDeletePhoto() {
    this.props.onDeleteUploadedPhoto(
      this.props.uploadedPhoto.response.body.public_id
    );
  }
}

const StyledUploadPhotoStatus = withStyles(styles)(
  UploadedPhotoStatusComponent
);

UploadedPhotoStatusComponent.propTypes = {
  uploadedPhoto: PropTypes.object,
  onDeleteUploadedPhoto: PropTypes.func
};

UploadedPhotoStatusComponent.contextTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string
};

const mapStateToProps = state => {
  return {
    mobile: state.mobile
  };
};

const UploadedPhotoStatus = connect(
  mapStateToProps,
  {
    onDeleteUploadedPhoto: deleteUploadedPhoto
  }
)(StyledUploadPhotoStatus);

Object.assign(
  UploadedPhotoStatusComponent.contextTypes,
  UploadedPhotoStatusComponent.contextTypes
);

export default UploadedPhotoStatus;
