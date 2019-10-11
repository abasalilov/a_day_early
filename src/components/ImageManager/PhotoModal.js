import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { CloudinaryContext } from "cloudinary-react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Close from "@material-ui/icons/Close";
import { StyledButton, FormField } from "../../components/common";
import { PhotoThumbnails } from "../ImageManager/PhotoThumbnails";
import { imageConfig } from "../ImageManager/imageConfig";

function getModalStyle(mobile) {
  return {
    top: "30%",
    left: mobile ? "25%" : "35%",
    transform: `translate(-20%, -25%)`,
    width: mobile ? "75%" : "70%"
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    margin: "1rem",
    height: "80%",
    display: "flex",
    justifyContent: "center",
    overflowY: "visible"
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  modalCloseBtn: {
    border: "solid black 1px",
    borderRadius: "50%",
    alignSelf: "center",
    margin: "3rem auto 0 auto",
    fontSize: "2rem"
  },
  btnContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3rem",
    flexDirection: "column"
  },
  modalRoot: {
    flexGrow: 1,
    height: "100%",
    overflowY: "scroll"
  },
  btn: {
    margin: "1rem auto",
    width: "90%",
    fontSize: "1rem",
    margin: "1rem"
  },
  link: {
    margin: "1rem",
    fontSize: "4rem auto 0 auto"
  },
  buttons: {
    display: "flex",
    justifyContent: "center"
  },
  mobileLink: {
    margin: "3rem auto 0 auto"
  },
  linkContainer: {
    color: "black",
    whiteSpace: "pre"
  },
  field: {
    justifyContent: "center"
  },
  regLink: {
    textDecoration: "none",
    color: "#0C5297"
  },
  title: {
    margin: "2rem 0",
    fontSize: "2rem"
  },
  pending: {
    margin: "1rem",
    padding: "1rem",
    border: "solid #0C5297 3px"
  }
});

class PhotoModalCompnent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, open, closeClick, mobile, publicId } = this.props;
    /*eslint-disable*/
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
      >
        <div style={getModalStyle(mobile)} className={classes.paper}>
          <div className={classes.modalRoot}>
            <Grid
              container
              spacing={mobile ? 8 : 24}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Typography
                variant="h5"
                align="center"
                color="textPrimary"
                className={classes.title}
                gutterBottom
              >
                Select a filtered version of the image
              </Typography>

              <PhotoThumbnails publicId={publicId} />

              <div className={classes.btnContainer}>
                <Close onClick={closeClick} className={classes.modalCloseBtn} />
              </div>
            </Grid>
          </div>
        </div>
      </Modal>
    );
  }
}
/*eslint-enable*/

const PhotoModalForm = withStyles(styles)(PhotoModalCompnent);

const mapStateToProps = state => {
  return {
    mobile: state.mobile,
    emailStatus: state.email
  };
};

const ConnectedPhotoModal = connect(mapStateToProps)(PhotoModalForm);

export const PhotoModal = ConnectedPhotoModal;

PhotoModalCompnent.propTypes = {
  classes: PropTypes.object,
  closeClick: PropTypes.func,
  mobile: PropTypes.bool,
  pristine: PropTypes.bool,
  open: PropTypes.bool,
  submitting: PropTypes.bool,
  registered: PropTypes.bool
};
