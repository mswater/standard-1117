const path = require("path");

const ROOT_PATH = process.cwd();

const SRC_PATH = path.join(ROOT_PATH, "/src");

const BUILD_PATH = path.join(ROOT_PATH, "/build");

const ASSETS_PATH = "/assets/";

const VENDORS = [
  "react",
  "react-dom",
  "react-router",
  "react-router-dom",
  "redux",
  "react-redux",
  "axios",
  "react-loadable",
];

module.exports = { ROOT_PATH, SRC_PATH, BUILD_PATH, ASSETS_PATH, VENDORS };
