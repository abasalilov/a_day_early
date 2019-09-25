import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import green from "@material-ui/core/colors/green";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  checked: {},
  mobile: {
    fontSize: "1.8rem !important",
    margin: "1rem !important"
  },
  reg: {}
};

class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      classes,
      blogSelected,
      imageSelected,
      textSelected,
      handleCheckBoxChange,
      mobile
    } = this.props;

    const labelClassName = mobile ? classes.mobile : classes.reg;
    const classesObj = {
      root: classes.root,
      checked: classes.checked
    };

    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={blogSelected}
              onChange={() => handleCheckBoxChange("blogSelected")}
              value="blogSelected"
              classes={classesObj}
            />
          }
          label="Blog, article or listicle"
          classes={{ label: labelClassName }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={imageSelected}
              onChange={() => handleCheckBoxChange("imageSelected")}
              value="imageSelected"
              classes={classesObj}
            />
          }
          classes={{ label: labelClassName }}
          label="Picture or graphic"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={textSelected}
              onChange={() => handleCheckBoxChange("textSelected")}
              value="textSelected"
              classes={classesObj}
            />
          }
          classes={{ label: labelClassName }}
          label="Text, subtitle or annoucement"
        />
      </FormGroup>
    );
  }
}

export const RadioGroup = withStyles(styles)(CheckboxGroup);
