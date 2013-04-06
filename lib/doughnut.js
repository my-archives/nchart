var min = require('./utils').min,
    PI = Math.PI,
    PI2 = PI * 2;

exports = module.exports = Doughnut;

/**
 * `Doughnut` Chart
 */

function Doughnut (ctx, data, cfg) {
  var canvas = ctx.canvas;
  this.width = canvas.width;
  this.height = canvas.height;

  this.ctx = ctx;
  this.data = data;
  this.cfg = cfg;

  this.doughnutRadius = min([this.height / 2, this.width / 2]) - 5;

  this.cutoutRadius = this.doughnutRadius * (cfg.percentageInnerCutout / 100);

  var segmentTotal = 0;
  for (var i = 0, l = data.length; i < l; ++i) {
    segmentTotal += data[i].value;
  }
  this.segmentTotal = segmentTotal;

  this.draw();
};

var proto = Doughnut.prototype;

proto.draw = function () {
  var cumulativeAngle = -PI2,
      ctx = this.ctx,
      cfg = this.cfg,
      halfWidth = this.width / 2,
      halfHeight = this.height / 2,
      data = this.data,
      i = 0, l = data.length,
      doughnutRadius = this.doughnutRadius,
      cutoutRadius = this.cutoutRadius,
      segmentTotal = this.segmentTotal,
      segmentShowStroke = cfg.segmentShowStroke,
      segmentStrokeWidth = cfg.segmentStrokeWidth,
      segmentStrokeColor = cfg.segmentStrokeColor,
      segmentAngle = 0;

  for (; i < l; ++i) {
    segmentAngle = (data[i].value / segmentTotal) * PI2;
    ctx.beginPath();
    ctx.arc(halfWidth, halfHeight, doughnutRadius, cumulativeAngle, cumulativeAngle + segmentAngle, false);
    ctx.arc(halfWidth, halfHeight, cutoutRadius, cumulativeAngle + segmentAngle, cumulativeAngle, true);
    ctx.closePath();
    ctx.fillStyle = data[i].color;
    ctx.fill();

    if(segmentShowStroke){
      ctx.lineWidth = segmentStrokeWidth;
      ctx.strokeStyle = segmentStrokeColor;
      ctx.stroke();
    }
    cumulativeAngle += segmentAngle;
  }
};
