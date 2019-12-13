import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import PublishIcon from "@material-ui/icons/Publish";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class JoinButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      success: false
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleButtonClick() {
    const { data, onClick } = this.props;
    const { agent, broker, hasEOS, eosAcct } = data;
    let type = "user";
    if (agent) {
      type = "agent";
    } else if (broker) {
      type = "broker";
    }

    if (!this.state.loading) {
      onClick(type, { hasEOS, eosAcct });
      // this.setState(
      //   {
      //     success: false,
      //     loading: true
      //   },
      //   () => {
      //     this.timer = setTimeout(() => {
      //       this.setState({
      //         loading: false,
      //         success: true
      //       });
      //     }, 4000);
      //   }
      // );
    }
  }

  render() {
    const { loading, success } = this.state;
    const { classes } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success
    });

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            variant="extendedFab"
            color="primary"
            aria-label="Join"
            className={buttonClassname}
            disabled={loading}
            onClick={this.handleButtonClick}
          >
            {success ? <CheckIcon /> : <PublishIcon />}
            {success ? "Joined" : "Join"}
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </div>
    );
  }
}

JoinButtonComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export const JoinButton = withStyles(styles)(JoinButtonComponent);
