import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { HeaderLink } from "../../common";
import { confirmAuth } from "../../../utils";
import { resetAuth as createResetAuthAction } from "../../../actions";

const styles = {
  w3Top: {
    top: "0",
    positiion: "fixed",
    zIndex: "1"
  },
  w3Black: {
    backgroundColor: "black !important",
    color: "#fff !important"
  },
  w3Bar: {
    width: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "100",
    backgroundColor: "black",
    marginBottom: "2rem",
    opacity: ".8"
  },
  w3BarAuth: {
    width: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "100",
    backgroundColor: "black",
    marginBottom: "2rem",
    opacity: ".8",
    padding: "0 1rem"
  },
  w3Button: {
    userSelect: "none",
    color: "#51a39a",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#03c0fe",
      textShadow: "1px 1px 4px #03c0fe"
    }
  },
  w3BarItem: {
    display: "inline-block",
    padding: "8px 16px",
    verticalAlign: "middle",
    textDecoration: "none",
    backgroundColor: "inherit",
    cursor: "pointer",
    whiteSpace: "nowrap"
  },
  selected: {
    backgroundColor: "#fff",
    color: "#03c0fe",
    textShadow: "1px 1px 4px #03c0fe"
  },
  notSelected: {}
};

const externalHeaderLinks = [
  "Home",
  "WHO WE ARE",
  "CALCULATOR",
  "CONTACT US",
  "LOGIN"
];

const internalHeaderLinks = ["Profile", "LOGIN"];

const getTitle = title => {
  const link = title.replace(" ", "-");
  if (title === "LOGIN") {
    return "/login";
  }
  return "/#" + link;
};

const NavButton = props => {
  const {
    auth: { attempted, result },
    mobile,
    title,
    onClick,
    classes
  } = props;
  let button;
  const style = { color: "#51a39a", textDecoration: "none" };
  const linkClassName = classNames(classes.w3BarItem, classes.w3Button);
  const linkPath = getTitle(title);
  if (attempted && result === "OK" && title === LOGIN) {
    button = (
      <HeaderLink
        className={linkClassName}
        to="/"
        style={style}
        onClick={onClick}
        title={"Logout"}
        mobile={mobile ? 1 : 0}
      />
    );
  } else {
    const isHref = linkPath.includes("#");
    button = (
      <HeaderLink
        isHref={isHref}
        className={linkClassName}
        to={linkPath}
        title={title}
        mobile={mobile ? 1 : 0}
      />
    );
  }
  return button;
};
/* eslint-disable */

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  async componentDidMount() {}

  async handleLogOut() {
    const { history, resetAuthentication } = this.props;
    await resetAuthentication();
    this.props.loc.pathname = "/";
  }

  render() {
    const { classes, auth } = this.props;
    const isAuthed = confirmAuth(auth);
    return (
      <nav>
        <div className={classNames(classes.w3Top, classes.w3Black)}>
          <div className={isAuthed ? classes.w3BarAuth : classes.w3Bar}>
            {isAuthed &&
              internalHeaderLinks.map(title => {
                return (
                  <NavButton
                    key={title}
                    {...this.props}
                    title={title}
                    onClick={this.handleLogOut}
                  />
                );
              })}
            {!isAuthed &&
              externalHeaderLinks.map(title => {
                return (
                  <NavButton
                    key={title}
                    {...this.props}
                    title={title}
                    onClick={this.handleLogOut}
                  />
                );
              })}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    mobile: state.mobile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetAuthentication: () => {
      dispatch(createResetAuthAction());
    }
  };
};

export const HeaderNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HeaderComponent));

HeaderComponent.propTypes = {
  classes: PropTypes.object.isRequired
};
