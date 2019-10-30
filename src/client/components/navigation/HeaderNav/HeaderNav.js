import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { HeaderLink } from "../../common";
import { confirmAuth } from "../../../utils";
import { resetAuth as createResetAuthAction } from "../../../actions";
const LOGIN = "LOGIN";

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
    marginBottom: "2rem"
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
    marginBottom: "2rem",
    padding: "0 1rem"
  },
  w3Button: {
    userSelect: "none",
    color: "#2D3190",
    "&:hover": {
      color: "#7BB16",
      textShadow: "1px 1px 4px #7BB16"
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
    color: "#2D3190",
    textShadow: "1px 1px 4px #2D3190"
  },
  notSelected: {}
};

const loginStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
};

const externalHeaderLinks = [
  "HOME",
  "PROGRAMS",
  "CALCULATOR",
  "LENDERS",
  "LOGIN"
];

const iconStyles = {
  color: "#2D3190",
  marginBottom: ".5rem"
};

const internalHeaderLinks = ["HOME", "LOGIN"];

const getTitle = title => {
  const link = title.replace(" ", "-");
  if (title === LOGIN) {
    return "/login";
  }
  if (title === "PROGRAMS") {
    return "/programs";
  }
  return link;
};

const isLogin = title => title === LOGIN;

const NavButton = props => {
  const {
    auth: { attempted, result },
    mobile,
    title,
    onClick,
    classes
  } = props;
  let button;
  const style = { color: "#2D3190", textDecoration: "none" };
  const linkClassName = classNames(classes.w3BarItem, classes.w3Button);
  const linkPath = getTitle(title);
  const isLoginComponent = isLogin(title);

  if (attempted && result === "OK" && title === "LOGIN") {
    button = (
      <HeaderLink
        className={linkClassName}
        to="/"
        style={style}
        onClick={onClick}
        title={"LOGOUT"}
        mobile={mobile ? 1 : 0}
      />
    );
  } else if (isLoginComponent) {
    const isHref = linkPath.includes("#");
    button = (
      <div style={loginStyle}>
        <HeaderLink
          isHref={isHref}
          className={linkClassName}
          to={linkPath}
          title={title}
          hasIcon={true}
          mobile={mobile ? 1 : 0}
        />
        {/* <AccountCircle style={iconStyles} /> */}
      </div>
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
