import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const HeaderLinkComponent = props => {
  const { className, to, title, isHref, navKey, ...otherProps } = props;
  if (isHref) {
    return (
      <div className={className} key={navKey}>
        <a href={to} style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            style={{ color: "#51a39a" }}
            id="modal-title"
            align="center"
            gutterBottom
          >
            {title}
          </Typography>
        </a>
      </div>
    );
  }
  return (
    <div className={className} {...otherProps} key={navKey}>
      <Link to={to} style={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          style={{ color: "#51a39a" }}
          id="modal-title"
          align="center"
          gutterBottom
        >
          {title}
        </Typography>
      </Link>
    </div>
  );
};

export const HeaderLink = HeaderLinkComponent;

HeaderLinkComponent.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  navKey: PropTypes.string,
  isHref: PropTypes.bool
};
