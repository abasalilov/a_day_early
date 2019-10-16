import React from "react";
import { connect } from "react-redux";
import { Section } from "../../components/Sections";
import { LeftPanel } from "../../components/common";
import { IntroSectionData } from "../../messages";

const HomePageComponent = props => {
  return (
    <div>
      <Section {...props} sectionProps={IntroSectionData} />
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

export const LandingPage = {
  component: ConnectedHomePage
};
