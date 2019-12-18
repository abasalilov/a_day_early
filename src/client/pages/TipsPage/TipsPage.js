import React from "react";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { FooterSection } from "../../components/Sections/SubSections/FooterSection";
import Typography from "@material-ui/core/Typography";

class ListItem extends React.Component {
  render() {
    const classes =
      (this.props.item.id % 2 == 0
        ? "custom-card-rotate-right"
        : this.props.item.id % 3 == 0
        ? "custom-card-rotate-left"
        : "") + " custom-card";

    return (
      <li>
        <mobiscroll.Card className={classes} theme="ios" themeVariant="light">
          <mobiscroll.CardHeader>
            <mobiscroll.CardTitle>{this.props.item.title}</mobiscroll.CardTitle>
            <mobiscroll.CardSubtitle>
              {this.props.item.desc}
            </mobiscroll.CardSubtitle>
          </mobiscroll.CardHeader>
          <mobiscroll.CardContent>
            <img draggable="false" src={this.props.item.img} />
          </mobiscroll.CardContent>
        </mobiscroll.Card>
      </li>
    );
  }
}

const topLabelStyle = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem",
  margin: "6rem 1rem 1rem 2rem"
};

const TipsPageComponent = props => {
  return (
    <div
      style={{
        minHeight: "60rem",
        marginTop: "8rem",
        alignItems: "center"
      }}
    >
      <Typography
        variant="h3"
        style={topLabelStyle}
        align="center"
        gutterBottom
      >
        Tips for loan repayment acceleration
      </Typography>

      <mobiscroll.Card theme="ios" themeVariant="light">
        <mobiscroll.CardHeader>
          <mobiscroll.CardTitle>
            1.) Positive Visualization:
          </mobiscroll.CardTitle>
        </mobiscroll.CardHeader>
        <mobiscroll.CardContent>
          <h2>
            Always imagine and strive for a debt free life, same income, without
            the payments.
          </h2>
        </mobiscroll.CardContent>
      </mobiscroll.Card>

      <mobiscroll.Card theme="ios" themeVariant="light">
        <mobiscroll.CardHeader>
          <mobiscroll.CardTitle>
            2.) Get an aDayEarly tip jar:
          </mobiscroll.CardTitle>
        </mobiscroll.CardHeader>
        <mobiscroll.CardContent>
          <h2>
            We tip a dollar or two at coffee and eating out. At the end of the
            day put your coins and paper change from the day in to your own
            aDayEarly tip jar. Near the end of the month, bank it and make a
            OneDayEarly payment.
          </h2>
        </mobiscroll.CardContent>
      </mobiscroll.Card>

      <mobiscroll.Card theme="ios" themeVariant="light">
        <mobiscroll.CardHeader>
          <mobiscroll.CardTitle>3.) Canceled Plans</mobiscroll.CardTitle>
        </mobiscroll.CardHeader>
        <mobiscroll.CardContent>
          <h2>
            Had plans to spend money on dinner, drinks, maybe even a vacation
            that had been canceled? Put the money you were going to spend into
            your aDayEarly account for a month's end OneDayEarly payment.
          </h2>
        </mobiscroll.CardContent>
      </mobiscroll.Card>

      <mobiscroll.Card theme="ios" themeVariant="light">
        <mobiscroll.CardHeader>
          <mobiscroll.CardTitle>4.) Sold</mobiscroll.CardTitle>
        </mobiscroll.CardHeader>
        <mobiscroll.CardContent>
          <h2>
            Sell anything lately? A car, boat, tennis racket? Maybe you have
            something you don't need or want. You get the picture. Sell it, bank
            it and use some of that money for a month's end OneDayearly payment.
          </h2>
        </mobiscroll.CardContent>
      </mobiscroll.Card>

      <mobiscroll.Card theme="ios" themeVariant="light">
        <mobiscroll.CardHeader>
          <mobiscroll.CardTitle>5.) Uncle Sam Refund</mobiscroll.CardTitle>
        </mobiscroll.CardHeader>
        <mobiscroll.CardContent>
          <h2>
            This is a no brainer. Dicipline all or a portion each year. As soon
            as you receive it, schedule a month's end OneDayEarly payment.
          </h2>
        </mobiscroll.CardContent>
      </mobiscroll.Card>
      <div style={{ marginTop: "16rem" }}>
        <FooterSection />
      </div>
    </div>
  );
};

//sell anything lately? a car, boat, tennis racket? Maybe you have something you don't need or want. You get the picture. Sell it, bank it and use some of that money for a month's end OneDayearly payment.
export const TipsPage = {
  component: TipsPageComponent
};
