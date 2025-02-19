const pkg = require("./package.json")
const pluginNodeResolve = require("@rollup/plugin-node-resolve")
const pluginCommonjs = require("@rollup/plugin-commonjs")
const typescript = require('@rollup/plugin-typescript')

module.exports = {
    input: "./src/index.ts",
    output: {
        name: 'H5Charts',
        file: "./dist/H5Charts.js",
        format: "umd",
        banner: `/*!
 * H5Charts v${pkg.version}
 * git+https://github.com/handless-ui/H5Charts.git
 */`
    },
    plugins: [
        typescript(require('./tsconfig.json')),
        pluginNodeResolve(),
        pluginCommonjs()
    ]
}