var Canvas = require('canvas'),
    utils = require('./utils'),
    PolarArea = require('./polararea');

/**
 * Expose `Chart` constructor.
 */


exports = module.exports = Chart;

/**
 * Initialize a new `Chart` with the given `context`.
 */

function Chart(context) {
  this.context = context;
};

var proto = Chart.prototype;

proto.PolarArea = function (data, options) {
  var config = options ? utils
    .merge(proto.PolarArea.defaults, options) : proto.PolarArea.defaults;
  return new PolarArea(this.context, data, config);
};

proto.PolarArea.defaults = {
  scaleOverlay : true,
	scaleOverride : false,
	scaleSteps : null,
	scaleStepWidth : null,
	scaleStartValue : null,
	scaleShowLine : true,
	scaleLineColor : "rgba(0,0,0,.1)",
	scaleLineWidth : 1,
	scaleShowLabels : true,
	scaleLabel : "<%=value%>",
	scaleFontFamily : "'Arial'",
	scaleFontSize : 12,
	scaleFontStyle : "normal",
	scaleFontColor : "#666",
	scaleShowLabelBackdrop : true,
	scaleBackdropColor : "rgba(255,255,255,0.75)",
	scaleBackdropPaddingY : 2,
	scaleBackdropPaddingX : 2,
	segmentShowStroke : true,
	segmentStrokeColor : "#fff",
	segmentStrokeWidth : 2
};
