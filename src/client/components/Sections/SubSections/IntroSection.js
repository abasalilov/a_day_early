import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Image } from "../../common";

const styles = () => {
  return {
    pic: {
      width: "80%",
      margin: "3rem auto",
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
      alignItems: "center",
      height: "30%",
      marginTop: "4rem"
    },
    mobileIntroHeader: {
      marginBottom: "1.5rem",
      marginTop: "9rem"
    },
    heroContent: {},
    mobleImg: {
      width: "22rem"
    },
    imgContainer: {
      width: "100%"
    }
  };
};
// #303290
//
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
      <Image
        showSpinner={false}
        containerClassName={containerClass}
        imgClassName={imgClass}
        src={
          "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1570784174/adeHero.png"
        }
      />
      <div className={mobile ? classes.mobileIntroHeader : classes.introHeader}>
        <div className={classes.heroContent}>
          <Typography
            variant={mobile ? "h2" : "h3"}
            align={"center"}
            color="textPrimary"
          >
            <p>{displayContent.title}</p>
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
