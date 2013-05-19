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
  //Boolean - If we show the scale above the chart data
  scaleOverlay : false,

  //Boolean - If we want to override with a hard coded scale
  scaleOverride : false,

  //** Required if scaleOverride is true **
  //Number - The number of steps in a hard coded scale
  scaleSteps : null,
  //Number - The value jump in the hard coded scale
  scaleStepWidth : null,
  //Number - The scale starting value
  scaleStartValue : null,

  //String - Colour of the scale line
  scaleLineColor : "rgba(0,0,0,.1)",

  //Number - Pixel width of the scale line
  scaleLineWidth : 1,

  //Boolean - Whether to show labels on the scale
  scaleShowLabels : false,

  //Interpolated JS string - can access value
  scaleLabel : "<%=value%>",

  //String - Scale label font declaration for the scale label
  scaleFontFamily : "'Arial'",

  //Number - Scale label font size in pixels
  scaleFontSize : 12,

  //String - Scale label font weight style
  scaleFontStyle : "normal",

  //String - Scale label font colour
  scaleFontColor : "#666",

  ///Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines : true,

  //String - Colour of the grid lines
  scaleGridLineColor : "rgba(0,0,0,.05)",

  //Number - Width of the grid lines
  scaleGridLineWidth : 1,

  //Boolean - Whether the line is curved between points
  bezierCurve : true,

  //Boolean - Whether to show a dot for each point
  pointDot : true,

  //Number - Radius of each point dot in pixels
  pointDotRadius : 3,

  //Number - Pixel width of point dot stroke
  pointDotStrokeWidth : 1,

  //Boolean - Whether to show a stroke for datasets
  datasetStroke : true,

  //Number - Pixel width of dataset stroke
  datasetStrokeWidth : 2,

  //Boolean - Whether to fill the dataset with a colour
  datasetFill : true
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

