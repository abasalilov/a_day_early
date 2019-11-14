import React from "react";
import DateFnsUtils from "@date-io/date-fns/build";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const materialTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        left: "135px !important"
      }
    },
    MuiPickersBasePicker: {
      container: {}
    }
  }
});

class CalendarPickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    this.changeDate = this.changeDate.bind(this);
  }

  componentDidMount() {
    const { setInitial, value } = this.props;
    if (setInitial) {
      let date = new Date(value);
      this.setState({ date });
    }
  }

  changeDate(e) {
    const dt = e.toLocaleString();
    this.setState({ date: e });
    this.props.onChange(dt);
  }

  render() {
    const { date } = this.state;
    return (
      <MuiThemeProvider theme={materialTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            variant="inline"
            style={{
              color: "#2D3190",
              fontSize: "20px"
            }}
            autoOk
            openTo="date"
            value={date}
            style={{ width: "100%" }}
            inputProps={{
              style: {
                backgroundColor: "#fff",
                color: "#2D3190",
                paddingTop: ".4rem",
                fontSize: "20px",
                fontWeight: "bold",
                marginLeft: ".4rem",
                textDecoration: "none"
              }
            }}
            onChange={this.changeDate}
          />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

export const CalendarPicker = CalendarPickerComponent;
