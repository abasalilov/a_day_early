import React from "react";
import { connect } from "react-redux";
import { Section } from "../../components/Sections";
import { HomeIntroSectionData, ServicesSectionData } from "../../messages";

const NewHomePageComponent = props => {
  return (
    <div>
      <Section
        {...props}
        sectionProps={HomeIntroSectionData}
        showHotLink={true}
      />
      <Section
        {...props}
        sectionProps={ServicesSectionData}
        isLastSection={true}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  mobile: state.mobile
});

const ConnectedHomePage = connect(
  mapStateToProps,
  null
)(NewHomePageComponent);

export const NewHomePage = {
  component: ConnectedHomePage
};
