const replaceOwnDeviceId = require('./replaceOwnDeviceId');

module.exports = {
  // Allowed keys: generate:before, generate:after
  // Values can be a single function or an array of functions.
  'generate:before': replaceOwnDeviceId,
};
