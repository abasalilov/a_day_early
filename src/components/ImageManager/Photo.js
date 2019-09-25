import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Image, Transformation } from "cloudinary-react";
import { url } from "./utils";
import { withStyles } from "@material-ui/core/styles";
import { Loading } from "../navigation";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import { PhotoThumbnails } from "./PhotoThumbnails";
import {
  photosFetched,
  imageSelect as createImageSelectActionCreator,
  imageReset
} from "../../actions";

function getModalStyle(mobile) {
  return {
    top: "30%",
    left: mobile ? "25%" : "35%",
    transform: `translate(-20%, -25%)`,
    width: mobile ? "75%" : "50%",
    paddingTop: "1rem"
  };
}

const styles = theme => ({
  photoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "9rem",
    border: "solid #51a39a 1px"
  },
  selectedContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "9rem",
    backgroundColor: "#51a39a"
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    paddingTop: ".25rem"
  },
  toggleInfo: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#e62401",
    display: "block",
    cursor: "help"
  },
  info: {
    fontSize: ".75rem",
    textAlign: "center",
    paddingTop: ".25rem"
  },
  modalRoot: {
    flexGrow: 1,
    height: "100%",
    overflowY: "scroll"
  },
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    margin: "1rem",
    height: "80%",
    display: "flex",
    justifyContent: "center",
    overflowY: "scroll"
  }
});

class PhotoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showMore: false };
    this.showLess = this.showLess.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  showMore() {
    this.setState({ showMore: true });
  }

  showLess() {
    this.setState({ showMore: false });
  }

  render() {
    const options = { ...this.context, ...this.props };
    const urlPath = url(options.publicId, options);
    const { classes, handleSelectPhoto, imgURL, mobile, publicId } = this.props;
    const selected = imgURL ? imgURL.includes(publicId) : false;
    const classContainer = selected
      ? classes.selectedContainer
      : classes.photoContainer;
    return (
      <React.Fragment>
        <div className={classContainer}>
          {this.props.context && <h2>{this.props.context.custom.photo}</h2>}
          <a href={this.props.url} target="_blank" rel="noopener noreferrer">
            <img
              src={this.props.url}
              className="thumbnail inline"
              width="200"
              height="150"
            />
          </a>
          <div className={classes.info}>
            {`Created: ${
              this.props.date
            }  Type: ${this.props.type.toLowerCase()}`}
          </div>
          <div className={classes.actions}>
            <div className="less_info">
              <button
                className="toggle_info"
                onClick={() => handleSelectPhoto(urlPath, selected)}
              >
                {selected ? "Unselect" : "Select"}
              </button>
            </div>

            {!this.state.showMore && (
              <div className="less_info">
                <button className="toggle_info" onClick={this.showMore}>
                  Filters
                </button>
              </div>
            )}
            {this.state.showMore && (
              <div className="more_info">
                <button className="toggle_info" onClick={this.showLess}>
                  Hide filters
                </button>
                <Modal
                  aria-labelledby="photo-filter-modal-title"
                  aria-describedby="photo-filter-modal-description"
                  open={this.state.showMore}
                  tabIndex={-1}
                >
                  <div className={classes.modalRoot}>
                    <div
                      style={getModalStyle(mobile)}
                      className={classes.paper}
                    >
                      <PhotoThumbnails
                        urlBase={this.props.url}
                        selectFilter={handleSelectPhoto}
                        close={this.showLess}
                        publicId={this.props.publicId}
                      />
                    </div>
                  </div>
                </Modal>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

PhotoComponent.propTypes = {
  context: PropTypes.object,
  publicId: PropTypes.string,
  classes: PropTypes.object
};

PhotoComponent.contextTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  handleSelectPhoto: (url, remove) =>
    dispatch(createImageSelectActionCreator(url, remove)),
  onPhotosFetched: photos => dispatch(photosFetched(photos))
});

const mapStateToProps = state => ({
  imgURL: state.socialMedia.imgUrl,
  mobile: state.mobile
});

export const Photo = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PhotoComponent));
