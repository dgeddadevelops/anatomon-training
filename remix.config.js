/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.test.{ts,tsx}"],
  serverModuleFormat: "cjs",
  browserNodeBuiltinsPolyfill: {
    modules: {
      buffer: true,
      stream: true,
      util: true,
      crypto: true,
    },
  },
};
