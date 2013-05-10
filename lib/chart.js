var Canvas = require('canvas'),
    utils = require('./utils'),
    merge = utils.merge,
    PolarArea = require('./polararea'),
    Line = require('./line'),
    Pie = require('./pie'),
    Doughnut = require('./doughnut'),
    Bar = require('./bar'),
    Radar = require('./radar');

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


/**
 * `Doughnut` Chart
 */

proto.Doughnut = function (data, options) {
  var config = options ? merge(DoughnutDefaults, options) : DoughnutDefaults;
  return new Doughnut(this.context, data, config);
};

var DoughnutDefaults = proto.Doughnut.defaults = {
  segmentShowStroke: true,
  segmentStrokeColor: "#fff",
  segmentStrokeWidth: 2,
  percentageInnerCutout: 50
};


/**
 * `Bar` Chart
 */

proto.Bar = function (data, options) {
  var config = options ? merge(BarDefaults, options) : BarDefaults;
  return new Bar(this.context, data, config);
};

var BarDefaults = proto.Bar.defaults = {
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
  barShowStroke: true,
  barStrokeWidth: 2,
  barValueSpacing: 5,
  barDatasetSpacing: 1
};


/**
 * `Radar` Chart
 */

proto.Radar = function (data, options) {
  var config = options ? merge(RadarDefaults, options) : RadarDefaults;
  return new Radar(this.context, data, config);
};

var RadarDefaults = proto.Radar.defaults = {
  scaleOverlay: false,
  scaleOverride: false,
  scaleSteps: null,
  scaleStepWidth: null,
  scaleStartValue: null,
  scaleShowLine: true,
  scaleLineColor: "rgba(0,0,0,.1)",
  scaleLineWidth: 1,
  scaleShowLabels: false,
  scaleLabel: "<%=value%>",
  scaleFontFamily: "'Arial'",
  scaleFontSize: 12,
  scaleFontStyle: "normal",
  scaleFontColor: "#666",
  scaleShowLabelBackdrop: true,
  scaleBackdropColor: "rgba(255,255,255,0.75)",
  scaleBackdropPaddingY: 2,
  scaleBackdropPaddingX: 2,
  angleShowLineOut: true,
  angleLineColor: "rgba(0,0,0,.1)",
  angleLineWidth: 1,
  pointLabelFontFamily: "'Arial'",
  pointLabelFontStyle: "normal",
  pointLabelFontSize: 12,
  pointLabelFontColor: "#666",
  pointDot: true,
  pointDotRadius: 3,
  pointDotStrokeWidth: 1,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true
};


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
  scaleLineColor: "rgba(0,0,0,.1)",
  scaleLineWidth: 1,
  scaleShowLabels: true,
  scaleLabel: "<%=value%>",
  scaleFontFamily: "'Arial'",
  scaleFontSize: 12,
  scaleFontStyle: "normal",
  scaleFontColor: "#666",
  scaleShowLabelBackdrop: true,
  scaleBackdropColor: "rgba(255,255,255,0.75)",
  scaleBackdropPaddingY: 2,
  scaleBackdropPaddingX: 2,
  segmentShowStroke: true,
  segmentStrokeColor: "#fff",
  segmentStrokeWidth: 2
};

