import React from "react";
import { connect } from "react-redux";
import { Section } from "../../components/Sections";
import { LeftPanel } from "../../components/common";
import { IntroSectionData } from "../../messages";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import { Image } from "../../components/common";
import { setNavHomePage } from "../../actions";

const data = {
  displayType: "INTRO",
  displayContent: {},
  isLastSection: false,
  isFirstSection: true,
  hasHero: false,
  heroProps: {
    secondaryText: ``,
    hasImage: false,
    imageUrl:
      "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1569108593/ade3.png"
  }
};

const styles = () => {
  return {
    pic: {
      margin: "0 auto",
      textAlign: "center"
    },
    mobilePic: {
      width: "36rem",
      verticalAlign: "middle",
      display: "block",
      margin: "4rem auto"
    },
    introHeader: {
      alignItems: "center",
      height: "30%",
      marginTop: "1rem"
    },
    mobileIntroHeader: {
      marginBottom: "1.5rem",
      marginTop: "9rem"
    },
    heroContent: {},
    mobleImg: {
      width: "36rem"
    },
    imgContainer: {
      width: "100%"
    },
    logoContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "2rem"
    },
    linkText: {
      textDecoration: "none",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "2rem"
    },
    introLink: {
      color: "#2D3190",
      "&:hover": {
        color: "#049347"
      },
      textDecoration: "none"
    },
    adeText: {
      color: "#2D3190 !important"
    },
    container: {
      display: "flex",
      flexDirection: "row"
    },
    mobileContainer: {
      marginTop: "9rem"
    },
    split: {
      display: "flex",
      flexDirection: "row",
      marginTop: "6rem"
    },
    half: {
      padding: "1rem",
      margin: "3rem"
    },
    mobileSplit: {
      display: "flex",
      flexDirection: "column",
      marginTop: "6rem"
    },
    mobileFont: {
      fontSize: "3rem"
    },
    font: {
      fontSize: "2rem",
      marginTop: "2rem"
    }
  };
};

const HomePageComponent = props => {
  const { classes, mobile, history, setBackButton } = props;
  const logoClass = mobile ? classes.mobilePic : classes.pic;
  const imgClass = mobile ? classes.mobleImg : classes.imgContainer;
  const containerClass = mobile ? classes.mobileSplit : classes.split;
  const fontClass = mobile ? classes.mobileFont : classes.font;
  console.log("props", props);
  return (
    <Grid item key={data.title} xs={12}>
      <div className={containerClass}>
        <div className={classes.half}>
          <Image
            showSpinner={false}
            containerClassName={logoClass}
            imgClassName={imgClass}
            src={
              "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1571170225/adeLogo.png"
            }
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Typography
              variant="h5"
              align="left"
              className={fontClass}
              gutterBottom
            >
              Are you a{" "}
              <a
                className={classes.introLink}
                style={{ textDecoration: "none" }}
                href="/home"
                onClick={() => setBackButton("/borrower")}
              >
                homeowner?
              </a>
            </Typography>
            <Button
              onClick={() => {
                setBackButton("/borrower");
                history.push("/home");
              }}
              variant="outlined"
              size="large"
              color="primary"
              style={{
                width: "80%",
                margin: "3rem",
                fontSize: "1rem"
              }}
            >
              Home Owner
            </Button>
          </div>
        </div>
        {mobile && <Divider style={{ width: "100%" }} />}
        <div className={classes.half}>
          <div>
            <Image
              showSpinner={false}
              containerClassName={logoClass}
              imgClassName={imgClass}
              src={
                "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1571170238/adeLogoPro.png"
              }
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Typography
                variant="h5"
                align="left"
                gutterBottom
                className={fontClass}
              >
                Or a{" "}
                <a
                  className={classes.introLink}
                  style={{ textDecoration: "none" }}
                  href="/lenders"
                  onClick={() => setBackButton("/lenders")}
                >
                  mortgage lender?
                </a>
              </Typography>
              <Button
                onClick={() => {
                  setBackButton("/lenders");
                  history.push("/lenders");
                }}
                variant="outlined"
                size="large"
                color="primary"
                style={{
                  width: "80%",
                  margin: "3rem",
                  fontSize: "1rem"
                }}
              >
                Mortgage Lender
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

const mapStateToProps = state => ({
  mobile: state.mobile
});

const mapDispatchToProps = dispatch => {
  return {
    setBackButton: pg => {
      dispatch(setNavHomePage(pg));
    }
  };
};

const ConnectedHomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HomePageComponent));

export const LandingPage = {
  component: ConnectedHomePage
};
