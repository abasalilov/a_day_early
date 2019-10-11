import React from "react";
import { connect } from "react-redux";
import { Section } from "../../components/Sections";
import { LeftPanel } from "../../components/common";
import {
  IntroSectionData,
  ServicesSectionData,
  ContactUsSectionData
} from "../../messages";

const splitStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  border: "solid red"
};

const HomePageComponent = props => (
  <div>
    <div style={splitStyle}>
      <LeftPanel />
    </div>
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
