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
          <link rel="stylesheet" href="https://use.typekit.net/nex3vbe.css">
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
                  color: #2D3190
                }

                .react-reveal {
                    display: flex;
                    justify-content: space-between;
                }
                #Home > div > div > div > div > h3 > p {
                  color: #2D3190
                }

                #Calculator > h3 {
                  color: #2D3190
                }

                #Home > div > div > h4:nth-child(4){
                  color: #2D3190
                }

                #Home > div > div > h4:nth-child(5) {
                  color: #2D3190
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
                  color: #2D3190
                }

                #Calculddator > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-6 > h4 {
                  color: #2D3190
                }

                  #select-term {
                    text-align:left !important;
                  }

                .MuiSelect-selectMenu {
                  text-align:left !important;
                  border: solid red;
                  padding:1rem;
                }

                .arrow_box-top {
                  position: relative;
                  background: #fff;
                  border: 4px solid #3f51b5;
                  width: 65%;
                  margin: 1rem 10rem 1rem -1rem;
                  float: right;

                }
                .arrow_box-top:after, .arrow_box-top:before {
                  bottom: 100%;
                  left: 75%;
                  border: solid transparent;
                  content: " ";
                  height: 0;
                  width: 0;
                  position: absolute;
                  pointer-events: none;
                }

                .arrow_box-top:after {
                  border-color: rgba(255, 255, 255, 0);
                  border-width: 15px;
                  margin-top: -15px;
                }
                .arrow_box-top:before {
                  border-color: rgba(63, 81, 181, 0);
                  border-bottom-color: #3f51b5;
                  border-width: 12px;
                  margin-top: -12px;
                }

                .MuiPickersBasePicker-container-301 {
                  border: solid red 3px;
                  padding: 1rem;
                }

                .arrow_box-left {
                  position: relative;
                  background: #fff;
                  border: 4px solid #3f51b5;
                  width: 65%;
                  margin: 1rem 7rem 1rem 1rem;
                  float: right;

                }
                .arrow_box-left:after, .arrow_box-left:before {
                  right: 100%;
                  top: 50%;
                  border: solid transparent;
                  content: " ";
                  height: 0;
                  width: 0;
                  position: absolute;
                  pointer-events: none;
                }

                .arrow_box-left:after {
                  border-color: rgba(255, 255, 255, 0);
                  border-width: 15px;
                  margin-top: -15px;
                }
                .arrow_box-left:before {
                  border-color: rgba(63, 81, 181, 0);
                  border-right-color: #3f51b5;
                  border-width: 12px;
                  margin-top: -12px;
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
