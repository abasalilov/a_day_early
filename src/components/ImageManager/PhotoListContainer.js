import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { photosUploaded } from "../../actions";
import { Photo } from "./Photo";
import Grid from "@material-ui/core/Grid";
import { getPhotosState } from "../../reducers/photosListReducer";

const styles = {
  title: {
    fontSize: "1rem"
  },
  photo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  containerExpand: {
    width: "57rem",
    padding: "1rem",
    overflowY: "scroll"
  },
  container: {
    padding: "1rem",
    overflowY: "scroll",
    height: "22rem",
    border: "solid lightgray 1px"
  },
  photoIndv: {
    minHeight: "11rem",
    minWidth: "12rem"
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    border: "solid 1px"
  }
};

class PhotoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidUpdate() {}

  render() {
    const { classes, expand, shrink, photos, dataReady } = this.props;

    return (
      !shrink && (
        <div className={classes.titleContainer}>
          <Typography
            variant="h6"
            align="center"
            color="textPrimary"
            className={classes.title}
            gutterBottom
          >
            Previous Uploads
          </Typography>
          <div className={expand ? classes.containerExpand : classes.container}>
            <div className={classes.photo}>
              {photos.length === 0 && <p>No photos were added yet.</p>}
              <Grid
                container
                spacing={8}
                alignItems="center"
                justify="space-evenly"
              >
                {photos.map((photo, idx) => {
                  const date = new Date(photo.created_at);
                  const dateStr = `${date.getMonth()}/${date.getDate()}/${date
                    .getYear()
                    .toString()
                    .slice(1)}`;
                  const photoURL = `http://res.cloudinary.com/dbfv0bfmw/image/upload/v${
                    photo.version
                  }/${photo.public_id}.${photo.format}`;
                  return (
                    <Grid item xs={6} md={4} key={photo.public_id}>
                      <Photo
                        idx={idx}
                        url={photoURL}
                        className={classes.photoIndv}
                        date={dateStr}
                        type={photo.format}
                        key={photo.public_id}
                        publicId={photo.public_id}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        </div>
      )
    );
  }
}

PhotoList.propTypes = {
  photos: PropTypes.array,
  onPhotosUploaded: PropTypes.func
};

PhotoList.contextTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string
};

const mapStateToProps = state => {
  return {
    photos: getPhotosState(state)
  };
};

export const PhotoListContainer = connect(
  mapStateToProps,
  {
    onPhotosUploaded: photosUploaded
  }
)(withStyles(styles)(PhotoList));

Object.assign(PhotoListContainer.contextTypes, PhotoList.contextTypes);
