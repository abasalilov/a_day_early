import React from "react";
import DateFnsUtils from "@date-io/date-fns/build";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

export const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#3F51B5",
      light: "#c96a6a",
      dark: "#3F51B5"
    },
    secondary: {
      main: "#3F51B5"
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
    const { setInitial, value, onChange } = this.props;
    if (setInitial) {
      let date = new Date(value);
      this.setState({ date });
    }
  }

  changeDate(e) {
    const dt = e.toString();
    this.setState({ date: e });
    this.props.onChange(dt);
  }

  render() {
    const { date } = this.state;
    return (
      <div style={{ backgroundColor: "red" }}>
        <MuiThemeProvider theme={customTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              orientation="landscape"
              variant="static"
              openTo="date"
              value={date}
              onChange={this.changeDate}
            />
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export const CalendarPicker = CalendarPickerComponent;
