import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ServiceModal } from "../../modals";

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
    border: "solid #0C5297 2px",
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
        <Grid container key={"dsf"} id="Calculator">
          <Typography
            variant={mobile ? "display4" : "h3"}
            gutterBottom
            align="center"
            color="textPrimary"
            style={{ width: "100%" }}
          >
            <p>Comparison Calculator</p>
          </Typography>
          {displayContent.map((service, idx) => (
            <Grid item key={service.title + idx} xs={mobile ? 12 : 6}>
              {/* Expander start */}
              <ExpansionPanel
                expanded={expanded === service.title}
                onChange={() => this.handleChange(service.title)} // eslint-disable-line
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon style={moreIconStyle} />}
                >
                  <div className={exapsionHeaderClassName}>
                    {service.icon(dataIconStyle)}
                    <Typography
                      className={classes.expansionSecondHeading}
                      variant={mobile ? "h3" : "h5"}
                    >
                      {mobileTitle(service.title)}
                    </Typography>
                  </div>
                </ExpansionPanelSummary>
                {/* Expander end */}

                <ExpansionPanelDetails className={classes.expansionMenuTab}>
                  {/* Expander Details start */}
                  {service.content.map(subService => (
                    <div
                      className={classes.subMenuOption}
                      key={subService.name}
                      onClick={() => this.handleToggleModal(subService)} // eslint-disable-line
                    >
                      {subService.icon(menuIconStyle)}
                      <Typography
                        variant={mobile ? "h3" : "h6"}
                        color="textSecondary"
                      >
                        {subService.name}
                      </Typography>
                    </div>
                  ))}
                </ExpansionPanelDetails>
                {/* Expander Details end */}
              </ExpansionPanel>
            </Grid>
          ))}
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
