var Canvas = require('canvas'),
    utils = require('./utils'),
    merge = utils.merge,
    PolarArea = require('./polararea'),
    Line = require('./line'),
    Pie = require('./pie');

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
 * `PolarArea` Chart
 */

proto.PolarArea = function (data, options) {
  var config = options ? merge(PolarAreaDefaults, options) : PolarAreaDefaults;
  return new PolarArea(this.context, data, config);
};

var PolarAreaDefaults = proto.PolarArea.defaults = {
  scaleOverlay: true,
  scaleOverride: false,
  scaleSteps: null,
  scaleStepWidth: null,
  scaleStartValue: null,
  scaleShowLine: true,
  scaleLineColor: "rgba(0, 0, 0, .1)",
  scaleLineWidth: 1,
  scaleShowLabels: true,
  scaleLabel: "<%=value%>",
  scaleFontFamily: "'Arial'",
  scaleFontSize: 12,
  scaleFontStyle: "normal",
  scaleFontColor: "#666",
  scaleShowLabelBackdrop: true,
  scaleBackdropColor: "rgba(255, 255, 255, 0.75)",
  scaleBackdropPaddingY: 2,
  scaleBackdropPaddingX: 2,
  segmentShowStroke: true,
  segmentStrokeColor: "#fff",
  segmentStrokeWidth: 2
};

/**
 * `Line` Chart
 */

proto.Line = function (data, options) {
  var config = options ? merge(LineDefaults, options) : LineDefaults;
  return new Line(this.context, data, config);
};

var LineDefaults = proto.Line.defaults = {
  scaleOverlay: false,
  scaleOverride: false,
  scaleSteps: null,
  scaleStepWidth: null,
  scaleStartValue: null,
  scaleLineColor: "rgba(0,0,0,.1)",
  scaleLineWidth: 1,
  scaleShowLabels: true,
  scaleLabel: "<%=value%>",
  scaleFontFamily: "'Arial'",
  scaleFontSize: 12,
  scaleFontStyle: "normal",
  scaleFontColor: "#666",
  scaleShowGridLines: true,
  scaleGridLineColor: "rgba(0,0,0,.05)",
  scaleGridLineWidth: 1,
  bezierCurve: true,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 2,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true
};


/**
 * `Pie` Chart
 */

proto.Pie = function (data, options) {
  var config = options ? merge(PieDefaults, options) : PieDefaults;
  return new Pie(this.context, data, config);
};

var PieDefaults = proto.Pie.defaults = {
  segmentShowStroke: true,
  segmentStrokeColor: "#fff",
  segmentStrokeWidth: 2
};
