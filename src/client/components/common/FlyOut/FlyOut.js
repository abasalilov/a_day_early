import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    height: 180
  },
  container: {
    display: "flex"
  },
  paper: {
    margin: theme.spacing(1)
  },
  svg: {
    width: 100,
    height: 100
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1
  }
}));

export const FlyOut = props => {
  const classes = useStyles();
  const checked = props.show;

  return (
    <Zoom
      in={checked}
      style={{
        transitionDelay: checked ? "750ms" : "0ms",
        width: "10rem",
        borderRadius: "1rem"
      }}
    >
      <div className="arrow_box">
        <a>
          <Typography
            variant="h6"
            style={{ color: "#303290" }}
            id="modal-title"
            align="center"
            gutterBottom
          >
            Here yo
          </Typography>
        </a>
      </div>
    </Zoom>
  );
};
