import React from "react";
import App from "./App";
import {
  HomePage,
  TermsPage,
  LoginPage,
  UserDashPage,
  TestPage,
  NotFoundPage
} from "./pages";

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: "/",
        exact: true
      },
      {
        ...LoginPage,
        path: "/login",
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
        ...NotFoundPage
      }
    ]
  }
];
