import React from "react";
import App from "./App";
import {
  HomePage,
  TermsPage,
  LoginPage,
  UserDashPage,
  CalculatorPage,
  InterestPage,
  LandingPage,
  ProgramsPage,
  LendersPage,
  NotFoundPage,
  NewLoanCalculatorPage,
  ContactUsPage,
  CountDownPage
} from "./pages";

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: "/home",
        exact: true
      },
      {
        ...LandingPage,
        path: "/landing",
        exact: true
      },
      {
        ...LoginPage,
        path: "/login",
        exact: true
      },
      {
        ...HomePage,
        path: "/",
        exact: true
      },
      {
        ...UserDashPage,
        path: "/dash",
        exact: true
      },
      {
        ...TermsPage,
        path: "/terms",
        exact: true
      },
      {
        ...CalculatorPage,
        path: "/calculator",
        exact: true
      },
      {
        ...InterestPage,
        path: "/interest",
        exact: true
      },
      {
        ...ContactUsPage,
        path: "/contact-us",
        exact: true
      },
      {
        ...NewLoanCalculatorPage,
        path: "/anticipated-loan-calculator",
        exact: true
      },
      {
        ...LendersPage,
        path: "/lenders",
        exact: true
      },
      {
        ...ProgramsPage,
        path: "/programs",
        exact: true
      },
      {
        ...ProgramsPage,
        path: "/a-day-early",
        exact: true
      },
      {
        ...ProgramsPage,
        path: "/jump-start",
        exact: true
      },
      {
        ...ProgramsPage,
        path: "/round-up",
        exact: true
      },
      {
        ...ProgramsPage,
        path: "/flex-pay",
        exact: true
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
