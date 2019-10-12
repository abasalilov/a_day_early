import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ServiceModal } from "../../modals";
import { CalculatorForm } from "../../CalculatorForm";
import TrendingFlat from "@material-ui/icons/TrendingFlat";

const styles = theme => ({
  expansionHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.text.secondary,
    width: "100%"
  },
  mobExpansionHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.text.secondary,
    width: "100%",
    justifyContent: "center",
    fontSize: "3rem"
  },
  expansionSecondHeading: {
    color: theme.palette.text.secondary,
    marginLeft: "3rem",
    width: "100%"
  },
  expansionMenuTab: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    padding: "1rem"
  },
  subMenuOption: {
    border: "solid #303290 2px",
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    padding: ".5rem 1rem",
    borderRadius: ".5rem",
    margin: ".5rem"
  }
});

const mobileTitle = title => {
  return title;
};

class ServiceSectionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      showModal: false,
      selectedService: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  handleChange(panel) {
    if (this.state.expanded === panel) {
      this.setState({
        expanded: null,
        showModal: false,
        selectedService: null
      });
    } else {
      this.setState({
        expanded: panel,
        showModal: false,
        selectedService: null
      });
    }
  }

  handleToggleModal(selectedService = {}) {
    const { showModal } = this.state;
    if (showModal) {
      this.setState({
        showModal: false,
        selectedService: null
      });
    } else {
      this.setState({
        showModal: true,
        selectedService
      });
    }
  }

  render() {
    const { classes, mobile, sectionProps } = this.props;
    const { expanded, showModal, selectedService } = this.state;
    const { displayContent } = sectionProps;
    const dataIconStyle = {
      fontSize: mobile ? "5rem" : "2.5rem"
    };

    const menuIconStyle = {
      fontSize: mobile ? "4rem" : "2.5rem",
      marginRight: "1rem"
    };

    const moreIconStyle = { fontSize: mobile ? "4rem" : "2.5rem" };
    const exapsionHeaderClassName = mobile
      ? classes.mobExpansionHeader
      : classes.expansionHeader;

    if (showModal) {
      return (
        <ServiceModal
          sectionProps={sectionProps}
          data={selectedService}
          open={showModal}
          mobile={mobile}
          closeClick={this.handleToggleModal}
        />
      );
    }
    return (
      <React.Fragment>
        <Divider style={{ width: "100%", marginBottom: "2rem" }} />
        <Grid
          container
          key={"dsf"}
          justify="space-apart"
          alignItems="center"
          direction={"row"}
          id="Calculator"
        >
          <Grid item xs={7}>
            <Grid
              container
              key={"dddsf"}
              justify="space-between"
              alignItems="center"
              direction={"row"}
              id="Calculddator"
              style={{
                minWidth: "20%",
                backgroundColor: "#f6f6f6"
              }}
            >
              <Grid item xs={4}>
                <Typography
                  variant={mobile ? "display4" : "h4"}
                  gutterBottom
                  align="center"
                  color="textPrimary"
                  style={{ width: "100%", color: "#303290" }}
                >
                  Let's Start With The Basics
                </Typography>
              </Grid>
              <Grid item xs={7} style={{ width: "100%", marginRight: "1rem" }}>
                <CalculatorForm />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant={mobile ? "display4" : "h4"}
              align="left"
              color="textPrimary"
              style={{ width: "100%", color: "#303290" }}
              gutterBottom
            >
              MONTHLY PAYMENT
            </Typography>
            <Typography
              variant={mobile ? "display4" : "h1"}
              align="left"
              color="textPrimary"
              style={{ width: "100%", color: "#049347" }}
              gutterBottom
            >
              $200.00
            </Typography>
            <Typography
              variant={mobile ? "display4" : "h6"}
              align="left"
              color="textPrimary"
              style={{
                width: "100%",
                color: "#049347",
                fontWeight: 600,
                fontFamily: "Raleway-Thin",
                transform: "scaleY(1.2)"
              }}
            >
              Learn how our service can help you save on monthly payment
            </Typography>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              style={{
                width: "80%",
                margin: "1rem 1rem 1rem 0",
                fontSize: "1.5rem"
              }}
            >
              Next Step {<TrendingFlat style={{ fontSize: "2rem" }} />}
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

ServiceSectionComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  mobile: PropTypes.bool,
  sectionProps: PropTypes.object
};

export const ServiceSection = withStyles(styles)(ServiceSectionComponent);
