const fs = require("fs");
const package = require("../package.json");

fs.writeFileSync("./docs/js/system.js", `window.H5Charts_system = {
    "version": "${package.version}"
};`);