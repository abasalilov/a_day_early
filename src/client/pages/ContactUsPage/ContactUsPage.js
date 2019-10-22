import React from "react";
import { connect } from "react-redux";
import { ContactUsSection } from "../../components/Sections";

const ContactUsPageComponent = props => {
  return (
    <div>
      <ContactUsSection {...props} />
    </div>
  );
};

const mapStateToProps = state => ({
  mobile: state.mobile
});

const ConnectedContactUsPage = connect(
  mapStateToProps,
  null
)(ContactUsPageComponent);

export const ContactUsPage = {
  component: ConnectedContactUsPage
};
