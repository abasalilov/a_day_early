import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { withStyles } from "@material-ui/core/styles";
import { LearnMoreDescription } from "../../common";

const styles = theme => ({
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardActions: {
    [theme.breakpoints.up("xs")]: {
      paddingBottom: Number(theme.spacing.unit)
    }
  },
  mobileProfilePic: {
    width: "100%"
  },
  profilePic: {
    padding: ".5rem",
    width: "25rem"
  },
  mobilePic: {
    width: "15rem",
    padding: "1rem"
  },
  linked: {
    textDecoration: "none",
    color: theme.palette.grey[700]
  },
  cardContent: {
    flex: "1 0 auto",
    height: "29.5rem"
  },
  mobileCardContent: {
    flex: "1 0 auto"
  }
});

const AboutUsSectionComponent = props => {
  const { classes, sectionProps = {}, mobile } = props;
  const { displayContent } = sectionProps;
  const titleProps = {
    align: "center",
    variant: mobile ? "h2" : "h4"
  };

  const gridStyle3 = {};
  const gridStyle1 = {
    marginTop: "2rem"
  };

  return (
    displayContent &&
    displayContent.map((contents, idx) => (
      <Grid
        item
        key={contents.title}
        style={mobile && idx !== 0 ? gridStyle3 : gridStyle1}
        xs={mobile ? 12 : 6}
      >
        <Card>
          <CardHeader
            title={contents.title}
            titleTypographyProps={titleProps}
            subheaderTypographyProps={{
              align: "center",
              gutterBottom: true
            }}
            className={classes.cardHeader}
          />
          <CardContent
            className={mobile ? classes.mobileCardContent : classes.cardContent}
          >
            <img
              src={contents.imgUrl}
              className={mobile ? classes.mobileProfilePic : classes.profilePic}
            />
            <div>
              <LearnMoreDescription
                description={contents.description}
                mobile={mobile ? 1 : 0}
              />
            </div>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              fullWidth
              variant={contents.buttonVariant}
              color="primary"
              style={{
                fontSize: mobile ? "3rem" : "1.2rem"
              }}
            >
              <a href={"/#Contact-Us"} className={classes.linked}>
                {contents.buttonText}
              </a>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))
  );
};

AboutUsSectionComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  submitEmail: PropTypes.func,
  mobile: PropTypes.bool
};

export const AboutUsSection = withStyles(styles)(AboutUsSectionComponent);
