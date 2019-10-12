import React from "react";
import { connect } from "react-redux";
import { Section } from "../../components/Sections";
import { LeftPanel } from "../../components/common";
import {
  IntroSectionData,
  ServicesSectionData,
  ContactUsSectionData
} from "../../messages";

const HomePageComponent = props => (
  <div>
    <Section {...props} sectionProps={IntroSectionData} />
    <Section
      {...props}
      sectionProps={ServicesSectionData}
      isLastSection={true}
    />
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
