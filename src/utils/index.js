/**
 * Throw an error if a string or number below 0 is passed
 * @param {object}
 * @returns {object}
 */
function enforceNonNegative(opts) {
  for (var key in opts) {
    if (opts.hasOwnProperty(key)) {
      if (typeof opts[key] === 'undefined' || isNaN(parseFloat(opts[key])) || opts[key] < 0) {
        throw new Error(key + ' must be a non-negative value.');
      }
    }
  }
};

module.exports = {
  enforceNonNegative
}