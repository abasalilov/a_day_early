import React from "react";
import ReactDOM from "react-dom";

import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "./index.css";

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.monthNames = [];

    this.state = {
      selectedItem: 0
    };
    this.updateLabels = this.updateLabels.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    this.updateLabels();
    this.onSliderChange(0);
  }

  componentDidUpdate() {
    this.updateLabels();
  }
  updateLabels() {
    const labels = ReactDOM.findDOMNode(
      this.slider
    ).parentNode.querySelectorAll(".mbsc-progress-step-label");
    const dayNames = ["Basics", "Programs", "Register", "Profile"];

    for (let i = 0; i < labels.length; ++i) {
      labels[i].innerHTML = dayNames[i];
    }
  }

  onSliderChange(value) {
    this.setState({
      selectedItem: value
    });
  }

  setRef(comp) {
    this.slider = comp;
  }

  render() {
    return (
      <mobiscroll.Form
        theme="ios"
        themeVariant="light"
        className="md-dateslider"
      >
        <mobiscroll.FormGroup inset>
          <mobiscroll.Slider
            ref={this.setRef}
            value={this.state.selectedItem}
            onChange={this.onSliderChange}
            data-step-labels="[0, 1, 2, 3]"
            step="1"
            min="0"
            max="3"
            theme="ios"
            themeVariant="light"
            data-highlight="false"
          />
        </mobiscroll.FormGroup>
      </mobiscroll.Form>
    );
  }
}

export const ProgressBar = Slider;
