import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Image } from "../../common";

const styles = () => {
  return {
    pic: {
      width: "24rem",
      margin: "3rem auto",
      padding: "2rem 0",
      height: "17rem",
      textAlign: "center"
    },
    mobilePic: {
      width: "22rem",
      height: "22rem",
      verticalAlign: "middle",
      display: "block",
      margin: "auto"
    },
    introHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: "30%",
      marginTop: "4rem",
      marginLeft: "-1rem"
    },
    mobileIntroHeader: {
      marginBottom: "1.5rem",
      marginTop: "9rem"
    },
    heroContent: {
      margin: "1rem"
    },
    mobleImg: {
      width: "22rem"
    },
    imgContainer: {
      width: "200%"
    }
  };
};

export const IntroSectionComponent = props => {
  const {
    classes,
    mobile,
    sectionProps: { displayContent }
  } = props;

  const mobileVariantStyle = {
    fontSize: !mobile && "1.5rem",
    margin: "2rem 0"
  };
  const containerClass = mobile ? classes.mobilePic : classes.pic;
  const imgClass = mobile ? classes.mobleImg : classes.imgContainer;
  return (
    <Grid item key={displayContent.title} xs={12}>
      <div className={mobile ? classes.mobileIntroHeader : classes.introHeader}>
        <div className={classes.heroContent}>
          <Typography
            variant={mobile ? "h2" : "h4"}
            align={mobile ? "center" : "left"}
            color="textPrimary"
          >
            {displayContent.title}
          </Typography>
        </div>
      </div>
      <Typography
        variant="h6"
        align="left"
        color="textSecondary"
        component="p"
        style={mobileVariantStyle}
        gutterBottom
      >
        {displayContent.top}
      </Typography>
      {!mobile && (
        <React.Fragment>
          <Typography
            variant="h4"
            align="left"
            style={mobileVariantStyle}
            color="textSecondary"
            gutterBottom
          >
            {displayContent.middle}
          </Typography>
          <Typography
            variant="h4"
            align="left"
            style={mobileVariantStyle}
            color="textSecondary"
            gutterBottom
          >
            {displayContent.bottom}
          </Typography>
        </React.Fragment>
      )}
    </Grid>
  );
};

export const IntroSection = withStyles(styles)(IntroSectionComponent);

IntroSectionComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  mobile: PropTypes.bool,
  sectionProps: PropTypes.object
};
