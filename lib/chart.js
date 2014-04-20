var utils = require('./utils'),
    merge = utils.merge,
    Line = require('./line'),
    Bar = require('./bar'),
    Radar = require('./radar'),
    PolarArea = require('./polararea'),
    Pie = require('./pie'),
    Doughnut = require('./doughnut');

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
  scaleShowLabels : true,

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
 * `Bar` Chart
 */

proto.Bar = function (data, options) {
  var config = options ? merge(BarDefaults, options) : BarDefaults;
  return new Bar(this.context, data, config);
};

var BarDefaults = proto.Bar.defaults = {
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

  //Boolean - If there is a stroke on each bar
  barShowStroke : true,

  //Number - Pixel width of the bar stroke
  barStrokeWidth : 2,

  //Number - Spacing between each of the X value sets
  barValueSpacing : 5,

  //Number - Spacing between data sets within X values
  barDatasetSpacing : 1
};


/**
 * `Radar` Chart
 */

proto.Radar = function (data, options) {
  var config = options ? merge(RadarDefaults, options) : RadarDefaults;
  return new Radar(this.context, data, config);
};

var RadarDefaults = proto.Radar.defaults = {
  //Boolean - If we show the scale above the chart data
  scaleOverlay : false,

  //Boolean - If we want to override with a hard coded scale
  scaleOverride : false,

  //** Required if scaleOverride is true **
  //Number - The number of steps in a hard coded scale
  scaleSteps : null,
  //Number - The value jump in the hard coded scale
  scaleStepWidth : null,
  //Number - The centre starting value
  scaleStartValue : null,

  //Boolean - Whether to show lines for each scale point
  scaleShowLine : true,

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

  //Boolean - Show a backdrop to the scale label
  scaleShowLabelBackdrop : true,

  //String - The colour of the label backdrop
  scaleBackdropColor : "rgba(255,255,255,0.75)",

  //Number - The backdrop padding above & below the label in pixels
  scaleBackdropPaddingY : 2,

  //Number - The backdrop padding to the side of the label in pixels
  scaleBackdropPaddingX : 2,

  //Boolean - Whether we show the angle lines out of the radar
  angleShowLineOut : true,

  //String - Colour of the angle line
  angleLineColor : "rgba(0,0,0,.1)",

  //Number - Pixel width of the angle line
  angleLineWidth : 1,

  //String - Point label font declaration
  pointLabelFontFamily : "'Arial'",

  //String - Point label font weight
  pointLabelFontStyle : "normal",

  //Number - Point label font size in pixels
  pointLabelFontSize : 12,

  //String - Point label font colour
  pointLabelFontColor : "#666",

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
 * `PolarArea` Chart
 */

proto.PolarArea = function (data, options) {
  var config = options ? merge(PolarAreaDefaults, options) : PolarAreaDefaults;
  return new PolarArea(this.context, data, config);
};

var PolarAreaDefaults = proto.PolarArea.defaults = {
  //Boolean - Whether we show the scale above or below the chart segments
  scaleOverlay : true,

  //Boolean - If we want to override with a hard coded scale
  scaleOverride : false,

  //** Required if scaleOverride is true **
  //Number - The number of steps in a hard coded scale
  scaleSteps : null,
  //Number - The value jump in the hard coded scale
  scaleStepWidth : null,
  //Number - The centre starting value
  scaleStartValue : null,

  //Boolean - Show line for each value in the scale
  scaleShowLine : true,

  //String - The colour of the scale line
  scaleLineColor : "rgba(0,0,0,.1)",

  //Number - The width of the line - in pixels
  scaleLineWidth : 1,

  //Boolean - whether we should show text labels
  scaleShowLabels : true,

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

  //Boolean - Show a backdrop to the scale label
  scaleShowLabelBackdrop : true,

  //String - The colour of the label backdrop
  scaleBackdropColor : "rgba(255,255,255,0.75)",

  //Number - The backdrop padding above & below the label in pixels
  scaleBackdropPaddingY : 2,

  //Number - The backdrop padding to the side of the label in pixels
  scaleBackdropPaddingX : 2,

  //Boolean - Stroke a line around each segment in the chart
  segmentShowStroke : true,

  //String - The colour of the stroke on each segement.
  segmentStrokeColor : "#fff",

  //Number - The width of the stroke value in pixels
  segmentStrokeWidth : 2
};


/**
 * `Pie` Chart
 */

proto.Pie = function (data, options) {
  var config = options ? merge(PieDefaults, options) : PieDefaults;
  return new Pie(this.context, data, config);
};

var PieDefaults = proto.Pie.defaults = {
    //Boolean - whether we should show value
    scaleShowValues: false

    //Number - The  padding above & below the value in pixels
  , scaleValuePaddingX: 35

    //String - Scale label font declaration for the scale label
  , scaleFontFamily : "'Arial'"

    //Number - Scale label font size in pixels
  , scaleFontSize : 12

    //String - Scale label font weight style
  , scaleFontStyle : "normal"

    //String - Scale label font colour
  , scaleFontColor : "#666"

    //Boolean - Whether we should show a stroke on each segment
  , segmentShowStroke : true

    //String - The colour of each segment stroke
  , segmentStrokeColor : "#fff"

    //Number - The width of each segment stroke
  , segmentStrokeWidth : 2
};


/**
 * `Doughnut` Chart
 */

proto.Doughnut = function (data, options) {
  var config = options ? merge(DoughnutDefaults, options) : DoughnutDefaults;
  return new Doughnut(this.context, data, config);
};

var DoughnutDefaults = proto.Doughnut.defaults = {

    //Boolean - whether we should show value
    scaleShowValues: false

    //Number - The  padding above & below the value in pixels
  , scaleValuePaddingX: 35

    //String - Scale label font declaration for the scale label
  , scaleFontFamily : "'Arial'"

    //Number - Scale label font size in pixels
  , scaleFontSize : 12

    //String - Scale label font weight style
  , scaleFontStyle : "normal"

    //String - Scale label font colour
  , scaleFontColor : "#666"
    //Boolean - Whether we should show a stroke on each segment

  , segmentShowStroke : true

    //String - The colour of each segment stroke
  , segmentStrokeColor : "#fff"

    //Number - The width of each segment stroke
  , segmentStrokeWidth : 2

    //The percentage of the chart that we cut out of the middle.
  ,  percentageInnerCutout : 50
};
