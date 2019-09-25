import React from "react";
import { connect } from "react-redux";
import { Section } from "../components";
import {
  IntroSectionData,
  AboutUsSectionData,
  ServicesSectionData,
  ContactUsSectionData
} from "../messages";

const HomePageComponent = props => (
  <div>
    {/* <img
      src={
        "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1569108593/ade3.png"
      }
      className="App-logo"
      alt="logo"
    /> */}
    <Section {...props} sectionProps={IntroSectionData} />
    <Section {...props} sectionProps={ServicesSectionData} />
    <Section {...props} sectionProps={ContactUsSectionData} />
  </div>
);

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
