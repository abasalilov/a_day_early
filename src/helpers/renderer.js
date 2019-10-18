import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import serialize from "serialize-javascript";
import { Helmet } from "react-helmet";
import Routes from "../client/Routes";
import { isMobile } from "../client/utils";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";

import { SheetsRegistry } from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";

export default (req, store, context) => {
  const sheetsRegistry = new SheetsRegistry();
  const theme = createMuiTheme({
    palette: {
      type: "light"
    },
    typography: {
      useNextVariants: true
    }
  });
  const generateClassName = createGenerateClassName();
  const content = renderToString(
    <JssProvider
      registry={sheetsRegistry}
      generateClassName={generateClassName}
    >
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <Provider store={store}>
          <StaticRouter location={req.path} context={context}>
            <React.Fragment>{renderRoutes(Routes)}</React.Fragment>
          </StaticRouter>
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  );

  const helmet = Helmet.renderStatic();
  const css = sheetsRegistry.toString();
  const mobile = isMobile(req.headers["user-agent"]);

  return `
    <html>
      <title>A Day Early</title>
          <head>
          <link href="https://fonts.googleapis.com/css?family=Raleway:400,700,700i,800&display=swap" rel="stylesheet">
          <style>
               .mobileRootStyle {
                color: #fff;
                font-size: 3rem;
                height: 91vh;
                width:100%;
                position:fixed;
                top: 35;
                left: 0;
                padding: 0;
                margin: 3rem 0 0 0;
                overflow: scroll;
                }
                .regRootStyle {
                margin-top:3rem;
                background-color:#FFFFFF
                }

                #Home > div > div > p {
                  color: #303290
                }

                .react-reveal {
                    display: flex;
                    justify-content: space-between;
                }
                #Home > div > div > div > div > h3 > p {
                  color: #303290
                }

                #Calculator > h3 {
                  color: #303290
                }

                #Home > div > div > h4:nth-child(4){
                  color: #303290
                }

                #Home > div > div > h4:nth-child(5) {
                  color: #303290
                }

                #Contact-Us {
                  margin-top: -50px;
                  padding-top: 50px;
                }

                #About-Us {
                  margin-top: -100px;
                  padding-top: 100px;
                }

                #Services {
                  margin-top: -100px;
                  padding-top: 100px;
                }

                #Home > div > h3 > p {
                  color: #303290
                }

                #Calculddator > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-6 > h4 {
                  color: #303290
                }
                .arrow_box {
                  position: relative;
                  background: #88b7d5;
                  border: 3px solid #c2e1f5;
                }
                .arrow_box:after, .arrow_box:before {
                  right: 99%;
                  top: 50%;
                  border: solid transparent;
                  content: " ";
                  height: 0;
                  width: 0;
                  position: absolute;
                  pointer-events: none;
                }

                .arrow_box:after {
                  border-color: rgba(136, 183, 213, 0);
                  border-right-color: #88b7d5;
                  border-width: 10px;
                  margin-top: -10px;
                }
                .arrow_box:before {
                  border-color: rgba(194, 225, 245, 0);
                  border-right-color: #c2e1f5;
                  border-width: 14px;
                  margin-top: -14px;
                }

              </style>
              <link rel="shortcut icon" href="favicon.ico">
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
              </head>
                <body>
                  <style id="jss-server-side">
                    ${css}
                  </style>
                    <div id="root"><nav/><div/>${content}</div>
                  <script>
                    var initialStore = ${serialize(store.getState())};
                    initialStore.mobile =${mobile};
                    window.INITIAL_STATE = initialStore;
                  </script>
                  <script src="bundle.js"></script>
                </body>
          </html>
        `;
};
