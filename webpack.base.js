// module.exports = {
//   // Tell webpack to run babel on every file it runs through
//   module: {
//     rules: [
//       {
//         test: /\.js?$/,
//         loader: "babel-loader",
//         exclude: /node_modules/,
//         options: {
//           presets: [
//             "react",
//             "stage-0",
//             ["env", { targets: { browsers: ["last 2 versions"] } }]
//           ]
//         }
//       },
//       {
//         test: /\.css$/i,
//         use: ["style-loader", "css-loader"]
//       },
//       {
//         test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
//         loader: "url-loader?limit=100000"
//       }
//     ]
//   }
// };

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  target: "node",
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            "react",
            "stage-0",
            ["env", { targets: { browsers: ["last 2 versions"] } }]
          ]
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    })
  ]
};
