import React from "react";
import { connect } from "react-redux";
import { Section } from "../../components/Sections";
import { reduxForm, Field } from "redux-form";
import { HomeIntroSectionData, ServicesSectionData } from "../../messages";
import { BasicsForm } from "../../components/Forms";
import Grid from "@material-ui/core/Grid";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const selectLabelStyle = {
  color: "#3f51b5",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)"
};

const updatedLabelStyle = {
  color: "#317439",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  padding: "1rem"
};

const dividerStyle = { width: "100%", color: "#3f51b5", margin: "1rem" };

const HomePageComponent = props => {
  return (
    <div>
      <Section
        {...props}
        sectionProps={HomeIntroSectionData}
        showHotLink={true}
      />
      <Divider style={dividerStyle} />
      <Typography
        variant="h4"
        style={updatedLabelStyle}
        id="modal-title"
        align="center"
        gutterBottom
      >
        Let's Start with the Basics
      </Typography>
      <Grid
        container
        spacing={10}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={6}
          style={{
            border: "1px #000 solid",
            borderRadius: "1rem",
            minWidth: "30rem",
            margin: "3rem",
            backgroundColor: "rgba(24, 186, 154, 0.23)"
          }}
        >
          <BasicsForm />
        </Grid>
      </Grid>
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

// const registrationForm = reduxForm({
//   form: "registration", // a unique identifier for this form
//   validate,
//   asyncValidate,
//   onSubmit,
//   asyncBlurFields: ["username_email", "confirmPassword"]
// })(withStyles(styles)(RegistrationModalComponent));

// const mapStateToProps = state => {
//   return {
//     registered: state.users.registered,
//     confirmUserNameMsg: confirmValue(state.users.confirmUserNameMsg),
//     mobile: state.mobile
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     registerUser: user => {
//       dispatch(createRegisterUserAction(user));
//     }
//   };
// };

// const ConnectedRegistrationForm = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(registrationForm);

// export const RegistrationModal = ConnectedRegistrationForm;

// RegistrationModalComponent.propTypes = {
//   classes: PropTypes.object,
//   handleSubmit: PropTypes.func,
//   closeClick: PropTypes.func,
//   mobile: PropTypes.bool,
//   pristine: PropTypes.bool,
//   open: PropTypes.bool,
//   submitting: PropTypes.bool,
//   registered: PropTypes.bool
// };
