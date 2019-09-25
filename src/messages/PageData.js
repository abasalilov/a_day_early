import React from "react";
import Code from "@material-ui/icons/Code";
import Gavel from "@material-ui/icons/Gavel";
import ShowChart from "@material-ui/icons/ShowChart";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";
import PlayCircleFilled from "@material-ui/icons/PlayCircleFilled";
import FlightTakeoff from "@material-ui/icons/FlightTakeoff";
import Search from "@material-ui/icons/Search";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Create from "@material-ui/icons/Create";
import People from "@material-ui/icons/People";
import TouchApp from "@material-ui/icons/TouchApp";
const CARD_LIST = "CARD_LIST";
const INTRO = "INTRO";
const SERVICES = "SERVICES";
const CONTACT_US = "CONTACT_US";
/** data **/

const introContent = {
  title: "Exponentional Mortgage Acceleration",
  top: "Your Financial Freedom Awaits... aDay Early",
  middle:
    "Launching Fall 2019. If you would like to be part of our Beta Release, let us know",
  bottom: ""
};

/* eslint-disable */

const servicesContent = [
  {
    title: "Buying or Refinancing?",
    icon: style => <FlightTakeoff style={style} />,
    content: [
      {
        anchor: "wp",
        name: "",
        icon: style => <Create style={style} />,
        description: [],
        list: [],
        example: {
          customer: "",
          service: "Mortgage Acceleration",
          address: ""
        }
      },
      {
        anchor: "token",
        name: "Have an Existing Mortgage to Accelerate?",
        icon: style => <MonetizationOn style={style} />,
        description: [""],
        list: [],
        example: {
          customer: "",
          service: "Website",
          address: ""
        }
      }
    ]
  },
  {
    title: "Mortgage acceleration",
    icon: style => <PlayCircleOutline style={style} />,
    content: [
      {
        anchor: "",
        name: "",
        icon: style => <PlayCircleFilled style={style} />,
        description: [""],
        list: [""],
        example: {
          address: "",
          service: "",
          customer: ""
        }
      },
      {
        anchor: "pr",
        name: "PR and Marketing",
        icon: style => <ShowChart style={style} />,
        description: [""],
        list: ["Crypto Blogs"],
        example: {
          customer: "",
          service: "",
          address: ""
        }
      }
    ]
  },
  {
    title: "Refinance",
    icon: style => <Code style={style} />,
    content: [
      {
        anchor: "",
        name: "",
        icon: style => <MonetizationOn style={style} />,
        description: [""],
        list: [],
        example: {}
      },
      {
        anchor: "",
        name: "",
        icon: style => <TouchApp style={style} />,
        description: [""],
        list: [],
        example: {}
      },
      {
        anchor: "",
        name: "",
        icon: style => <Code style={style} />,
        description: [""],
        list: [],
        example: {}
      },
      {
        anchor: "",
        name: "",
        icon: style => <PersonAdd style={style} />,
        description: [""],
        list: [""],
        example: {}
      }
    ]
  },
  {
    title: "Other",
    icon: style => <Gavel style={style} />,
    content: [
      {
        anchor: "reg",
        name: "",
        icon: style => <Gavel style={style} />,
        description: [""],
        list: [],
        example: {}
      },
      {
        anchor: "wp",
        name: "Other",
        icon: style => <Search style={style} />,
        description: [""],
        list: [""],
        example: {
          customer: "",
          service: "",
          address: ""
        }
      }
    ]
  }
];

/** data containers **/

export const ServicesSectionData = {
  hasHero: false,
  displayType: SERVICES,
  displayContent: servicesContent,
  isLastSection: false
};

export const ContactUsSectionData = {
  hasHero: false,
  displayType: CONTACT_US,
  displayContent: servicesContent,
  isLastSection: true
};

export const AboutUsSectionData = {
  hasHero: true,
  heroProps: {
    title: "About Us",
    secondaryText: `Dedication = Excellence.`,
    hasImage: false,
    imageUrl:
      "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1569108593/ade3.png"
  },
  displayType: CARD_LIST,
  displayContent: {},
  isLastSection: false
};

export const IntroSectionData = {
  displayType: INTRO,
  displayContent: introContent,
  isLastSection: false,
  isFirstSection: true,
  hasHero: false,
  heroProps: {
    title: introContent.title,
    secondaryText: ``,
    hasImage: false,
    imageUrl:
      "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1569108593/ade3.png"
  }
};
