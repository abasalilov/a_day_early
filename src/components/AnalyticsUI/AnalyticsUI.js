import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import LineChart from "recharts/lib/chart/LineChart";
import Line from "recharts/lib/cartesian/Line";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Tooltip from "recharts/lib/component/Tooltip";
import Legend from "recharts/lib/component/Legend";
import Label from "recharts/lib/component/Label";
import { StyledButton } from "../../components/common";
import { partsDetectGetOrders as createPDDataRequestAction } from "../../actions";
import {
  getDelta,
  getTotal,
  formatWklyTotal,
  get4wkMVA,
  getAverages,
  syncData
} from "../../utils/pdUtils";

export const shortenTotal = total => {
  let newTotal = 0;
  const dot = total.toString().indexOf(".");
  if (dot !== -1) {
    newTotal = total.toString().slice(0, dot + 3);
  } else {
    newTotal = total;
  }
  return Number(newTotal);
};

const styles = theme => ({
  container: {
    width: "100%"
  },
  quickFactsContainer: {
    padding: "2rem"
  },
  quickFacts: {
    border: "solid orange 1px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: "2rem"
  },
  title: {
    margin: "1rem"
  },
  topDiv: {
    padding: "0rem 3rem 3rem 3rem",
    width: "100%"
  },
  div: {
    width: "90%",
    border: "solid #51a39a 1px",
    margin: "2rem"
  },
  grid: {
    border: "solid orange 2px",
    borderRadius: "1rem",
    padding: "2rem"
  },
  gLabel: {
    textAlign: "center"
  },
  averagesContainer: {
    padding: "1rem",
    display: "flex",
    justifyContent: "space-evenly"
  },
  averages: {
    border: "solid black 1px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: "2rem"
  },
  mechanicDelta: {
    display: "flex",
    flexDirection: "row",
    margin: "1rem",
    padding: "1rem",
    justifyContent: "space-evenly",
    border: "solid blue 1px",
    borderRadius: "1rem"
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    margin: ".5rem",
    padding: ".5rem",
    width: "20rem",
    borderRadius: ".5rem",
    justifyContent: "space-between",
    border: "solid black 1px"
  },
  newUsers: {
    display: "flex",
    flexDirection: "row",
    margin: ".5rem",
    padding: ".5rem",
    width: "20rem",
    borderRadius: ".5rem",
    justifyContent: "space-between",
    border: "solid green 1px"
  },
  droppedUsers: {
    display: "flex",
    flexDirection: "row",
    margin: ".5rem",
    padding: ".5rem",
    width: "20rem",
    borderRadius: ".5rem",
    justifyContent: "space-between",
    border: "solid red 1px"
  },
  titleSpace: {
    margin: "1rem"
  },
  mechsDetla: {
    display: "flex",
    flexDirection: "column"
  },
  delta4wk: {
    display: "flex",
    flexDirection: "column"
  }
});

const data = [
  { name: "Mon", Visits: 2200, Orders: 3400 },
  { name: "Tue", Visits: 1280, Orders: 2398 },
  { name: "Wed", Visits: 5000, Orders: 4300 },
  { name: "Thu", Visits: 4780, Orders: 2908 },
  { name: "Fri", Visits: 5890, Orders: 4800 },
  { name: "Sat", Visits: 4390, Orders: 3800 },
  { name: "Sun", Visits: 4490, Orders: 4300 }
];

class AnalyticsUIComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      movingAvg: null,
      orders: [],
      ordersQuickFacts: [{ a: 1, b: 2, c: 3 }],
      revenueQuickFacts: [{ a: 1, b: 2, c: 3 }],
      pending: true
    };

    this.handleReqTypeChange = this.handleReqTypeChange.bind(this);
    this.handleConfirmDataRender = this.handleConfirmDataRender.bind(this);
  }

  async componentDidMount() {
    const orders = await this.props.getPDOrdersData();
    await this.mountWeeklyData();
  }

  async mountWeeklyData() {
    const { weeklyOrders } = this.props.pdData.data;

    const dataReadyToRender = [];
    const yearKeys = Object.keys(weeklyOrders);
    const weeklyKeys = Object.keys(weeklyOrders["2018"]);

    weeklyKeys.map(week => {
      dataReadyToRender.push({
        Total: getTotal(weeklyOrders["2018"][week]),
        Orders: weeklyOrders["2018"][week].length,
        week
      });
    });
    const avgs = get4wkMVA(dataReadyToRender);
    const currentWeek = dataReadyToRender[dataReadyToRender.length - 1];
    const lastWeek = dataReadyToRender[dataReadyToRender.length - 2];
    const twoWeeksAgo = dataReadyToRender[dataReadyToRender.length - 3];
    const fourWeeksData = dataReadyToRender.slice(-4);
    const mergedData = syncData(dataReadyToRender, avgs);

    await this.setState({
      orders: mergedData,
      movingAvg: getAverages(fourWeeksData),
      ordersQuickFacts: [
        { k: "Two Wks Ago", v: twoWeeksAgo.Orders },
        { k: "Last Wk", v: lastWeek.Orders },
        {
          k: "Δ",
          v: getDelta(twoWeeksAgo.Orders, lastWeek.Orders)
        },
        { k: "Current", v: currentWeek.Orders }
      ],
      revenueQuickFacts: [
        { k: "Two Wks Ago", v: formatWklyTotal(twoWeeksAgo.Total) },
        { k: "Last Wk", v: formatWklyTotal(lastWeek.Total) },
        {
          k: "Δ",
          v: getDelta(twoWeeksAgo.Total, lastWeek.Total)
        },
        { k: "Current", v: formatWklyTotal(currentWeek.Total) }
      ]
    });

    await setTimeout(this.handleConfirmDataRender, 300);
  }

  async handleConfirmDataRender() {
    await this.setState({ pending: false });
  }
  handleReqTypeChange(e) {
    this.setState({ requestType: e.target.value });
  }

  renderAverages() {
    const { classes } = this.props;
    const { movingAvg } = this.state;

    if (this.state.pending) {
      return (
        <Typography
          variant="h5"
          align="center"
          color="textPrimary"
          className={classes.title}
          gutterBottom
        >
          processing, please wait....
        </Typography>
      );
    } else {
      return (
        <React.Fragment>
          <Typography
            variant="h5"
            align="center"
            className={classes.title}
            gutterBottom
          >
            {`Orders: ${movingAvg.mvo}`}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            className={classes.title}
            gutterBottom
          >
            {`Total: $${shortenTotal(movingAvg.mvt)}`}
          </Typography>
        </React.Fragment>
      );
    }
  }

  renderMechDeltas() {
    const data = this.props.pdData.data.mechDelta;
    const { classes } = this.props;
    if (!this.state.pending) {
      const delta12to4wk = mechDelta(data.mech12.mechs, data.mech4.mechs);
      const delta4to1wk = mechDelta(data.mech4.mechs, data.mech1.mechs);
      return (
        <React.Fragment>
          <div>
            <Typography
              variant="h5"
              align="center"
              className={classes.title}
              gutterBottom
            >
              {`12 wks (${data.mech12.mechs.length} users)`}
            </Typography>
            {data.mech12.mechs.map(mech => {
              return (
                <div key={mech.name} className={classes.dataContainer}>
                  <div>{mech.name}</div>
                  <div>{mech.email}</div>
                </div>
              );
            })}
          </div>
          <div className={classes.delta4wk}>
            <div>
              <Typography
                variant="h5"
                align="center"
                className={classes.title}
                gutterBottom
              >
                {`4 wks (${data.mech4.mechs.length} users)`}
              </Typography>
              {data.mech4.mechs.map(mech => {
                return (
                  <div key={mech.name} className={classes.dataContainer}>
                    <div>{mech.name}</div>
                    <div>{mech.email}</div>
                  </div>
                );
              })}
            </div>
            <div>
              <Typography
                variant="h5"
                align="center"
                className={classes.title}
                gutterBottom
              >
                12 - 4wk Δ
              </Typography>
              <div className={classes.titleSpace}>{`New Users: ${
                delta12to4wk.newUsers.length
              }`}</div>
              {delta12to4wk.newUsers.map(mech => {
                return (
                  <div key={mech.name} className={classes.newUsers}>
                    <div>{mech.name}</div>
                    <div>{mech.email}</div>
                  </div>
                );
              })}
              <div className={classes.titleSpace}>{`Dropped Users: ${
                delta12to4wk.droppedUsers.length
              }`}</div>
              {delta12to4wk.droppedUsers.map(mech => {
                return (
                  <div key={mech.name} className={classes.droppedUsers}>
                    <div>{mech.name}</div>
                    <div>{mech.email}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classes.mechsDetla}>
            <div>
              <Typography
                variant="h5"
                align="center"
                className={classes.title}
                gutterBottom
              >
                {`1 wk (${data.mech1.mechs.length} users)`}
              </Typography>
              {data.mech1.mechs.map(mech => {
                return (
                  <div key={mech.name} className={classes.dataContainer}>
                    <div>{mech.name}</div>
                    <div>{mech.email}</div>
                  </div>
                );
              })}
            </div>
            <div>
              <Typography
                variant="h5"
                align="center"
                className={classes.title}
                gutterBottom
              >
                4 - 1 wk Δ
              </Typography>
              <div className={classes.titleSpace}>{`New Users: ${
                delta4to1wk.newUsers.length
              }`}</div>
              {delta4to1wk.newUsers.map(mech => {
                return (
                  <div key={mech.name} className={classes.newUsers}>
                    <div>{mech.name}</div>
                    <div>{mech.email}</div>
                  </div>
                );
              })}
              <div className={classes.titleSpace}>{`Dropped Users: ${
                delta4to1wk.droppedUsers.length
              }`}</div>
              {delta4to1wk.droppedUsers.map(mech => {
                return (
                  <div key={mech.name} className={classes.droppedUsers}>
                    <div>{mech.name}</div>
                    <div>{mech.email}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

  renderQuickFacts(quickFacts, isRev) {
    const { classes } = this.props;

    if (this.state.pending) {
      return (
        <Typography
          variant="h5"
          align="center"
          color="textPrimary"
          className={classes.title}
          gutterBottom
        >
          processing, please wait....
        </Typography>
      );
    } else {
      return quickFacts.map((facts, idx) => {
        let showRed = false;
        if (facts.v.toString().indexOf("-") !== -1) {
          showRed = true;
        }
        return (
          <Typography
            key={facts.k}
            variant="h5"
            align="center"
            color={showRed ? "error" : "textPrimary"}
            style={{
              color: facts.v.toString().includes("+") ? "green" : "black"
            }}
            className={classes.title}
            gutterBottom
          >
            {facts.k}: {facts.v}
          </Typography>
        );
      });
    }
  }

  render() {
    const { classes, mobile } = this.props;

    return (
      <div className={classes.topDiv}>
        <Typography
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Analytics
        </Typography>
        <div className={classes.averagesContainer}>
          <Typography
            variant="h5"
            align="center"
            className={classes.title}
            gutterBottom
          >
            4 Wk Moving Averages
          </Typography>
          <div className={classes.averages}>{this.renderAverages()}</div>
        </div>
        <div className={classes.container}>
          <Grid container spacing={mobile ? 8 : 24} justify="center">
            <Grid item xs={12}>
              <div className={classes.grid}>
                <Typography
                  variant="h5"
                  align="center"
                  color="textPrimary"
                  className={classes.title}
                  gutterBottom
                >
                  Weekly Orders
                </Typography>
                <div className={classes.quickFactsContainer}>
                  <div className={classes.quickFacts}>
                    {this.renderQuickFacts(this.state.ordersQuickFacts)}
                  </div>
                </div>
                <ResponsiveContainer width="99%" height={"50%"}>
                  <LineChart data={this.state.orders}>
                    <XAxis dataKey="week" />
                    <YAxis
                      label={{
                        value: "Orders",
                        angle: -90,
                        position: "insideLeft"
                      }}
                    />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Line
                      type="monotone"
                      dataKey="Orders"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="OrdersMVA"
                      stroke="#82ca9d"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className={classes.gLabel}>Week</div>
              </div>
            </Grid>

            <Divider className={classes.div} />

            <Grid item xs={12}>
              <div className={classes.grid}>
                <Typography
                  variant="h5"
                  align="center"
                  color="textPrimary"
                  className={classes.title}
                  gutterBottom
                >
                  Weekly Revenue
                </Typography>
                <div className={classes.quickFactsContainer}>
                  <div className={classes.quickFacts}>
                    {this.renderQuickFacts(this.state.revenueQuickFacts, true)}
                  </div>
                </div>
                <ResponsiveContainer width="99%" height={"50%"}>
                  <LineChart data={this.state.orders}>
                    <XAxis
                      dataKey="week"
                      label={{
                        value: "Week",
                        position: "bottom"
                      }}
                    />
                    <YAxis
                      label={{
                        value: "Orders",
                        angle: -90,
                        position: "insideLeft"
                      }}
                    />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Line
                      type="monotone"
                      dataKey="Total"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="TotalsMVA"
                      stroke="#82ca9d"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className={classes.gLabel}>Week</div>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.mechanicDelta}>
                {this.renderMechDeltas()}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
/*eslint-enable*/

const AnalyticsUIForm = withStyles(styles)(AnalyticsUIComponent);

const mapStateToProps = state => {
  return {
    mobile: state.mobile,
    emailStatus: state.email,
    pdData: state.pd
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPDOrdersData: message => dispatch(createPDDataRequestAction())
  };
};

const ConnectedAnalyticsUI = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnalyticsUIForm);

export const AnalyticsUI = ConnectedAnalyticsUI;

AnalyticsUIComponent.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  closeClick: PropTypes.func,
  mobile: PropTypes.bool,
  pristine: PropTypes.bool,
  open: PropTypes.bool,
  submitting: PropTypes.bool,
  registered: PropTypes.bool
};

function mechDelta(arr12, arr4) {
  const newUsers = [];
  const droppedUsers = [];
  const userMatch = [];
  const matchObj = {};

  for (let i = 0; i < arr12.length; i++) {
    const priorInstance = arr12[i];
    for (let j = 0; j < arr4.length; j++) {
      if (priorInstance.email === arr4[j].email) {
        userMatch.push(priorInstance);
        matchObj[arr4[j].email] = arr4[j];
      }
    }
  }

  for (let h = 0; h < arr4.length; h++) {
    if (!matchObj[arr4[h].email]) {
      newUsers.push(arr4[h]);
    }
  }
  for (let m = 0; m < arr12.length; m++) {
    if (!matchObj[arr12[m].email]) {
      droppedUsers.push(arr12[m]);
    }
  }
  // comparing old to mutual matches you get droppedUsers
  // comparing new to mutual matches you get newUsers
  return { newUsers, droppedUsers };
}
