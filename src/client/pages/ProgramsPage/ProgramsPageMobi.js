import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { routePrograms } from "../../actions";
import { FooterSection } from "../../components/Sections/SubSections";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Divider from "@material-ui/core/Divider";
import "./index.css";

const styles = {};

const ListItem = props => {
  const { data, btn } = props;
  return (
    <React.Fragment>
      <li data-icon="home" className="mbsc-ic mbsc-ic-home">
        <h2>{data.description}</h2>
      </li>
      <li>
        <mobiscroll.Button color="info" block={true} onClick={() => btn()}>
          <h3>{`Explore the ${data.program} program`}</h3>
        </mobiscroll.Button>
      </li>
    </React.Fragment>
  );
};

class ProgramsPageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          id: 1,
          program: "OneDayEarly",
          description:
            "Make a one time extra principal payment and see the exponential effect of time and money."
        },
        {
          id: 2,
          program: "FlexPay",
          description: "Set up a custom payment campaign"
        },
        {
          id: 3,
          program: "LeapFrog",
          description:
            "Jump ahead to any months payment on your amortization schedule, pay the principal portion now, aDayEarly, and NEVER pay the associated interest. EVER."
        },
        {
          id: 4,
          program: "DoubleDown",
          description:
            "It simply allows double the principle to be paid. The current month and the principle portion of the following month on the amortization schedule. Kind of like LeapFrog but defined by the next month's principle rather than a chosen future amount."
        },
        {
          id: 5,
          program: "RoundUp",
          description:
            "Round your payment up to the nearest $100, $1000 or create your own round up and see the effects!"
        },
        {
          id: 6,
          program: "EasyStart",
          description: "Start accelerating your current loan."
        },
        {
          program: "JumpStart",
          description:
            "Jump ahead to any months payment on your amortization schedule, pay the principal portion now, aDayEarly, and NEVER pay the associated interest. EVER."
        }
      ]
    };
    this.handleADayEarly = this.handleADayEarly.bind(this);
    this.handleLeapFrog = this.handleLeapFrog.bind(this);
    this.handleJumpStart = this.handleJumpStart.bind(this);
    this.handleEasyStart = this.handleEasyStart.bind(this);
    this.handleFlexPay = this.handleFlexPay.bind(this);
    this.handleRoundUp = this.handleRoundUp.bind(this);
    this.handleDoubleDown = this.handleDoubleDown.bind(this);
  }

  componentDidMount() {}

  handleADayEarly() {
    this.props.routeToProgram(["ADE", "One Day Early"]);
    this.props.history.push("/calculator");
  }

  handleLeapFrog() {
    this.props.routeToProgram(["LF", "LeapFrog"]);
    this.props.history.push("/calculator");
  }

  handleFlexPay() {
    const fp = [
      "FP",
      "FlexPay",
      "Dropdown is calculator with these fields:",
      "Extra principal payment amount:",
      "Payment date:",
      "(+ add an additional payment)",
      "Show interest savings, time saved and new payoff date",
      "Let’s get registered and accelerate (button)",
      "*your campaign(s) can be modified at any time"
    ];
    this.props.routeToProgram(["FLEX", "FlexPay"]);
    this.props.history.push("/calculator");
  }

  handleEasyStart() {
    const es = [
      "ES",
      "Easy Start",
      "Interactive Amortization schedule click any future principal payment you want to prepay and see how much you can save.",
      "After user clicks calculate show:  interest savings, time saved and new payoff date",
      "Let’s get registered and accelerate (button)"
    ];

    this.props.routeToProgram(["ES", "EasyStart"]);
    this.props.history.push("/calculator");
  }

  handleJumpStart() {
    const js = [
      "JS",
      "Jump Start",
      "Mortgage Snapshot",
      "Adjust payoff date and extra principal payment amount to see how you can reach your goals.",
      "If I pay an extra $___________ in principal each month my mortgage will be paid off by ____________(date) Calculate (button)",
      "After user clicks calculate show:  interest savings, time saved and new payoff date",
      "Let’s get registered and accelerate (button)",
      "*your campaign(s) can be modified at any time"
    ];
    this.props.routeToProgram(["JS", "JumpStart"]);
    this.props.history.push("/calculator");
  }
  handleRoundUp() {
    const ru = [
      "RU",
      "Round Up",
      "Dropdown is Calculator with these fields:",
      "Round to nearest: drop down with pick one $100, $500, $1000",
      "One time or recurring? (hotlinks)",
      "Show interest savings, time saved and new payoff date",
      "Let’s get registered and accelerate (button)",
      "*your campaign(s) can be modified at any time"
    ];
    this.props.routeToProgram(["RU", "RoundUp"]);
    this.props.history.push("/calculator");
  }

  handleDoubleDown() {
    const ru = [
      "DD",
      "Double Down",
      "Dropdown is Calculator with these fields:",
      "Round to nearest: drop down with pick one $100, $500, $1000",
      "One time or recurring? (hotlinks)",
      "Show interest savings, time saved and new payoff date",
      "Let’s get registered and accelerate (button)",
      "*your campaign(s) can be modified at any time"
    ];
    this.props.routeToProgram(["DD", "DoubleDown"]);
    this.props.history.push("/calculator");
  }

  closeAll() {
    this.refs.cont1.instance.hide();
    this.refs.cont2.instance.hide();
    this.refs.cont3.instance.hide();
    this.refs.cont4.instance.hide();
  }

  toggleLast() {
    this.refs.cont1.instance.toggle();
    this.refs.cont2.instance.toggle();
    this.refs.cont3.instance.toggle();
    this.refs.cont4.instance.toggle();
    this.refs.cont5.instance.toggle();
    this.refs.cont6.instance.toggle();
    this.refs.cont7.instance.toggle();
  }

  render() {
    return (
      <div style={{ marginTop: "4rem !important" }}>
        <div className="mbsc-grid" style={{ marginTop: "4rem !important" }}>
          <div className="mbsc-row" style={{ marginTop: "8rem" }}>
            <div className="mbsc-col-2" />
            <div className="mbsc-col-8">
              <mobiscroll.CardTitle
                className="mbsc-bold mbsc-txt-l"
                style={{ color: "#252774" }}
              >
                <h2>
                  Pick a Program and see the results! Try a few options to see
                  what works best for you. Fill out info for a simulation of
                  program results.
                </h2>{" "}
              </mobiscroll.CardTitle>
            </div>
            <div className="mbsc-col-2" />
          </div>

          <div className="mbsc-row">
            <div className="mbsc-col-1" />

            <div className="mbsc-col-4" style={{ marginTop: "4rem" }}>
              <mobiscroll.Accordion theme="ios">
                <mobiscroll.Card
                  collapsible
                  style={{ margin: "2rem" }}
                  open
                  ref="cont1"
                  open
                  theme="material"
                  themeVariant="light"
                >
                  <mobiscroll.CardHeader>
                    <mobiscroll.CardTitle className="mbsc-bold mbsc-txt-l">
                      <h3>OneDayEarly</h3>
                    </mobiscroll.CardTitle>
                  </mobiscroll.CardHeader>
                  <mobiscroll.CardContent>
                    <mobiscroll.Listview
                      itemType={() => (
                        <ListItem
                          data={this.state.items[0]}
                          btn={this.handleADayEarly}
                        />
                      )}
                      data={[this.state.items[0]]}
                      theme="ios"
                      themeVariant="light"
                      swipe={true}
                      enhance={true}
                    />
                  </mobiscroll.CardContent>
                </mobiscroll.Card>

                <mobiscroll.Card
                  collapsible
                  style={{ margin: "2rem" }}
                  ref="cont2"
                  open
                  theme="material"
                  themeVariant="light"
                >
                  <mobiscroll.CardHeader>
                    <mobiscroll.CardTitle className="mbsc-bold">
                      <h3>FlexPay</h3>
                    </mobiscroll.CardTitle>
                  </mobiscroll.CardHeader>
                  <mobiscroll.CardContent>
                    <mobiscroll.Listview
                      itemType={() => (
                        <ListItem
                          data={this.state.items[1]}
                          btn={this.handleFlexPay}
                        />
                      )}
                      data={[this.state.items[1]]}
                      theme="ios"
                      themeVariant="light"
                      swipe={true}
                      enhance={true}
                    />
                  </mobiscroll.CardContent>
                </mobiscroll.Card>
                <mobiscroll.Card
                  collapsible
                  style={{ margin: "2rem" }}
                  ref="cont3"
                  open
                  theme="material"
                  themeVariant="light"
                >
                  <mobiscroll.CardHeader>
                    <mobiscroll.CardTitle className="mbsc-bold">
                      <h3>LeapFrog</h3>
                    </mobiscroll.CardTitle>
                  </mobiscroll.CardHeader>
                  <mobiscroll.CardContent>
                    <mobiscroll.Listview
                      itemType={() => (
                        <ListItem
                          data={this.state.items[2]}
                          btn={this.handleLeapFrog}
                        />
                      )}
                      data={[this.state.items[2]]}
                      theme="ios"
                      themeVariant="light"
                      swipe={true}
                      enhance={true}
                    />
                  </mobiscroll.CardContent>
                </mobiscroll.Card>
              </mobiscroll.Accordion>
            </div>
            <div className="mbsc-col-1" />
            <div className="mbsc-col-4" style={{ marginTop: "4rem" }}>
              <mobiscroll.Accordion theme="ios">
                <mobiscroll.Card
                  collapsible
                  style={{ margin: "2rem" }}
                  ref="cont4"
                  open
                  theme="material"
                  themeVariant="light"
                >
                  <mobiscroll.CardHeader>
                    <mobiscroll.CardTitle className="mbsc-bold mbsc-txt-l">
                      <h3 style={{ marginBlockStart: "0rem !important" }}>
                        RoundUp
                      </h3>
                    </mobiscroll.CardTitle>
                  </mobiscroll.CardHeader>
                  <mobiscroll.CardContent>
                    <mobiscroll.Listview
                      itemType={() => (
                        <ListItem
                          data={this.state.items[4]}
                          btn={this.handleRoundUp}
                        />
                      )}
                      data={[this.state.items[4]]}
                      theme="ios"
                      themeVariant="light"
                      swipe={true}
                      enhance={true}
                    />
                  </mobiscroll.CardContent>
                </mobiscroll.Card>

                <mobiscroll.Card
                  collapsible
                  style={{ margin: "2rem" }}
                  ref="cont5"
                  open
                  theme="material"
                  themeVariant="light"
                >
                  <mobiscroll.CardHeader>
                    <mobiscroll.CardTitle className="mbsc-bold">
                      <h3>EasyStart</h3>
                    </mobiscroll.CardTitle>
                  </mobiscroll.CardHeader>
                  <mobiscroll.CardContent>
                    <mobiscroll.Listview
                      itemType={() => (
                        <ListItem
                          data={this.state.items[5]}
                          btn={this.handleEasyStart}
                        />
                      )}
                      data={[this.state.items[5]]}
                      theme="ios"
                      themeVariant="light"
                      swipe={true}
                      enhance={true}
                    />
                  </mobiscroll.CardContent>
                </mobiscroll.Card>

                <mobiscroll.Card
                  collapsible
                  style={{ margin: "2rem" }}
                  ref="cont6"
                  open
                  theme="material"
                  themeVariant="light"
                >
                  <mobiscroll.CardHeader>
                    <mobiscroll.CardTitle className="mbsc-bold">
                      <h3>JumpStart</h3>
                    </mobiscroll.CardTitle>
                  </mobiscroll.CardHeader>
                  <mobiscroll.CardContent>
                    <mobiscroll.Listview
                      itemType={() => (
                        <ListItem
                          data={this.state.items[6]}
                          btn={this.handleJumpStart}
                        />
                      )}
                      data={[this.state.items[6]]}
                      theme="ios"
                      themeVariant="light"
                      swipe={true}
                      enhance={true}
                    />
                  </mobiscroll.CardContent>
                </mobiscroll.Card>

                <mobiscroll.Card
                  collapsible
                  style={{ margin: "2rem" }}
                  ref="cont7"
                  open
                  theme="material"
                  themeVariant="light"
                >
                  <mobiscroll.CardHeader>
                    <mobiscroll.CardTitle className="mbsc-bold">
                      <h3>DoubleDown</h3>
                    </mobiscroll.CardTitle>
                  </mobiscroll.CardHeader>
                  <mobiscroll.CardContent>
                    <mobiscroll.Listview
                      itemType={() => (
                        <ListItem
                          data={this.state.items[3]}
                          btn={this.handleDoubleDown}
                        />
                      )}
                      data={[this.state.items[3]]}
                      theme="ios"
                      themeVariant="light"
                      swipe={true}
                      enhance={true}
                    />
                  </mobiscroll.CardContent>
                </mobiscroll.Card>
              </mobiscroll.Accordion>{" "}
            </div>
            <div className="mbsc-col-1" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Divider style={{ margin: "2", width: "90%" }} id="programs-footer" />
        </div>
        <div className="mbsc-col-12">
          <div className="mbsc-row" style={{ justifyContent: "center" }}>
            <FooterSection />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mobile: state.mobile,
  input: state.input
});

const mapDispatchToProps = dispatch => {
  return {
    routeToProgram: msg => dispatch(routePrograms(msg))
  };
};

const ConnectedProgramsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProgramsPageComponent));

export const ProgramsPage = {
  component: ConnectedProgramsPage
};
