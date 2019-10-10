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
                background-color:#F1F3F4
                }
                .react-reveal {
                    display: flex;
                    justify-content: space-between;
                }
                #Home {
                  margin-top: -30px;
                  padding-top: 30px;
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

                #root {
                  background-color: #F1F3F4
                }

                  #posterframe {
                      position: relative;
                  }


                  #logo {
                      height: 51px;
                      width: 241px;
                  }

                  .manipulation-video {
                      margin: 10px 0;
                  }

                  .actions {
                      margin: 20px 0;
                  }

                  .upload_link {
                      color: #000;
                      border: 1px solid #aaa;
                      background-color: #e0e0e0;
                      font-size: 18px;
                      padding: 5px 10px;
                      width: 250px;
                      font-weight: bold;
                      text-align: center;
                      text-decoration: none;
                      margin: 5px;
                      cursor:pointer;
                  }

                  .introducing-cloudinary {
                      max-width: 80%;
                  }

                  img.static-photo {
                      max-width: 20%;
                      position: absolute;
                      right: 0;
                  }

                  .thumbnail {
                      margin-top: 10px;
                      border: none;
                  }

                  .note {
                      margin: 20px 0
                  }

                  .inline {
                      display: inline-block;
                  }

                  #direct_upload {
                      box-sizing: content-box;
                  }

                  #direct_upload {
                      padding: 20px 20px;
                      border-top: 1px solid #ccc;
                      border-bottom: 1px solid #ccc;
                    }

                  h1, #direct_upload h1 { margin: 0 0 15px 0; }
                  #direct_upload { border: 4px dashed #ccc}
                  #direct_upload.dragover { border-color: #0c0; }
                  #direct_upload.dragover-err { border-color: #c00; }

                  .upload_details { font-size: 12px; margin: 20px; border-top: 1px solid #ccc; word-wrap: break-word; }
                  .upload_button_holder {
                      position: relative;
                      overflow: hidden;
                      display: inline-block;
                  }

                  .upload_button {
                      display: inline-block;
                      position: relative;
                      font-weight: bold;
                      font-size: 14px;
                      background-color: rgb(15, 97, 172);
                      color: #fff;
                      padding: 5px 0;
                      border: 1px solid #000;
                      border-radius: 4px;
                      width: 100px;
                      height: 18px;
                      text-decoration: none;
                      text-align: center;
                      cursor: pointer;
                  }

                  .upload_button_holder .upload_button {
                      display: block;
                  }

                  .upload_button_holder input {
                      display: none;
                  }

                  .upload_button:hover {
                      background-color: rgb(17, 133, 240);
                  }
                  .upload_button_holder .cloudinary_fileupload {
                      opacity: 0;
                      cursor: pointer;
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      margin: 0;
                      padding: 0;
                      border: none;
                  }
                  .progress-bar{
                      width: 50%;
                      position: relative;
                      height: 4px;
                  }
                  .progress-bar .progress{
                      height: 4px;
                      background-color: #ff0000;
                      width: 0;
                  }
                  .preview img, .preview audio, .preview video {
                      max-width: 300px;
                      max-height: 150px;
                  }

                  html, body {
                    background-color: #F1F3F4 !important;
                  }

                  circle {
                    background-color: #5590F5 !important;
                    color: #5590F5 !important;
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
