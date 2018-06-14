const { CheckerPlugin } = require("awesome-typescript-loader");
const libraryName = "rucola-core-lib";
const outputFile = libraryName + ".js";

module.exports = {
  entry: __dirname + "/src/index.ts",
  devtool: "source-map",
  output: {
    path: __dirname + "/lib",
    filename: outputFile,
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },

  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "awesome-typescript-loader"
        }
      }
    ]
  },
  plugins: [new CheckerPlugin()]
};
