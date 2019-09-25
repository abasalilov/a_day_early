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
