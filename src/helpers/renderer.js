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

            body {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
                "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
                sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            code {
              font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
                monospace;
            }

            .root {
              height:100%;
            }

            body > div:nth-child(3) > div.MuiPaper-root {
              padding: 2rem !important;
            }

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

                  #select-term {
                    text-align:left !important;
                  }

                .MuiSelect-selectMenu {
                  text-align:left !important;
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

                #Home > div > div > p.MuiTypography-root.MuiTypography-h6.MuiTypography-colorTextPrimary.MuiTypography-gutterBottom.MuiTypography-alignLeft > a {
                  color: inherit;
                  textDecoration: none;
                }

                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                .App {
                  text-align: center;
                  font-family: "Roboto", sans-serif;
                  background-color: rgb(34, 34, 34);
                  height: 100vh;
                  color: rgb(250, 250, 250);
                }
                .App-title {
                  font-size: 50px;
                  padding: 25px 0;
                }

                .Timers {
                  display: flex;
                  justify-content: center;
                }
                @media (max-width: 900px) {
                  .Timers {
                    flex-direction: column;

                    align-items: center;
                  }
                }
                @media (max-width: 900px) {
                  .Stopwatch {
                    margin-bottom: 40px;
                  }
                }
                .Countdown,
                .Stopwatch {
                  margin-left: 30px;
                  margin-right: 30px;
                  border: 2px solid grey;
                  border-radius: 4px;
                  padding: 20px;
                  width: 400px;
                  background-color: rgb(22, 27, 31);
                  box-shadow: 0 3px 6px rgb(12, 12, 12);
                }
                .Countdown {
                  padding-top: 10px;
                }

                .Countdown-header,
                .Stopwatch-header {
                  font-size: 40px;
                  font-weight: bold;
                }

                button {
                  background-color: #202b33;
                  border: solid 1px transparent;
                  border-radius: 4px;
                  padding: 10px 20px;
                  color: #ffffff;
                  font-size: 16px;
                  margin: 0 5px;
                  cursor: pointer;
                }
                button:hover {
                  background-color: #106ba3;
                }
                .Stopwatch button {
                  padding: 12px 32px;
                  font-size: 20px;
                }
                .Stopwatch-display {
                  padding: 40px 0;
                  font-size: 48px;
                }
                .Stopwatch-text {
                }
                .Countdown-display {
                  margin-top: 5px;
                  margin-bottom: 20px;
                }
                .Countdown-display button {
                  margin: 0 15px;
                  border: solid 1px transparent;
                  border-radius: 2px;
                  padding: 4px 16px;
                  color: #ffffff;

                  font-size: 16px;
                }
                .Countdown-display button:hover {
                  background-color: #106ba3;
                }
                .Countdown-label {
                  font-size: 18px;
                  margin-top: 5px;
                  margin-bottom: 10px;
                }
                .Countdown-time {
                  font-size: 36px;
                  margin: 5px 0;
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
