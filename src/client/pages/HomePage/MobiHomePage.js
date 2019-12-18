import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Section } from "../../components/Sections";
import { HomeIntroSectionData, ServicesSectionData } from "../../messages";
import { FooterSection } from "../../components/Sections/SubSections";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Divider from "@material-ui/core/Divider";
import "./index.css";

const mobileVariantStyle = {
  textShadow: "2px 2px 0px rgba(0,0,0,0.2)"
};

const HomePageComponent = props => {
  return (
    <div>
      <div className="mbsc-col-12" style={{ marginTop: "6rem" }}>
        <Typography
          variant={"h4"}
          gutterBottom
          align="center"
          color="textPrimary"
          style={{
            width: "100%",
            color: "#252774",
            textShadow: "3px 3px 0px rgba(0,0,0,0.2)"
          }}
        >
          The Nation's #1 Mortgage Accelerator
        </Typography>
        <div className="mbsc-row" style={{ justifyContent: "center" }}>
          <div className="mbsc-col-8" style={{ marginBottom: "2rem" }}>
            <Section
              {...props}
              sectionProps={HomeIntroSectionData}
              showHotLink={true}
            />
            <Divider style={{ width: "90%", margin: "2rem" }} id="basics" />
            <Section
              {...props}
              sectionProps={ServicesSectionData}
              isLastSection={true}
            />
          </div>
          <div className="mbsc-col-3">
            <div
              style={{
                border: "solid  #479e70",
                height: "95%",
                padding: "1rem",
                width: "100%",
                borderRadius: "1rem",
                marginBottom: "1rem"
              }}
            >
              <Typography
                variant={"h6"}
                gutterBottom
                align="center"
                color="textPrimary"
                style={{
                  width: "100%",
                  color: "#252774",
                  textShadow: "3px 3px 0px rgba(0,0,0,0.2)"
                }}
              >
                News & Events
              </Typography>
              <div style={{ margin: "1rem" }}>
                <li style={{ textDecoration: "none !important" }}>
                  <a
                    href="https://www.eventbrite.com/e/adayearly-kickoff-event-tickets-86144020083"
                    style={{
                      color: "#019246 !important",
                      textDecoration: "none !important"
                    }}
                    target="_blank"
                  >
                    aDayEarly Kickoff Event
                  </a>
                </li>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Divider style={{ margin: "2" }} id="basics" />
        </div>
        <div className="mbsc-col-12">
          <div className="mbsc-row" style={{ justifyContent: "center" }}>
            <FooterSection />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  mobile: state.mobile
});

const ConnectedHomePage = connect(
  mapStateToProps,
  null
)(HomePageComponent);

export const HomePage = {
  component: ConnectedHomePage
};
