/**
 * Expose `Chart` constructor.
 */

exports = module.exports = Chart;

/**
 * Initialize a new `Chart` with the given `context`.
 */

function Chart(context) {
  if (!(this instanceof Chart)) {
    return new Chart(context);
  }
  this.context = context;
};

var proto = Chart.prototype;

/**
 * Line
 * Bar
 * Radar
 * PolarArea
 * Pie
 * Doughnut
 */

'Line Bar Radar PolarArea Pie Doughnut'.split(' ')
  .forEach(function (t) {
    proto[t] = require('./' + t.toLowerCase());
  });
