var min = require('./utils').min
  , PI = Math.PI
  , PIx2 = PI * 2;

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

  var segmentTotal = 0, i = 0, d;
  while ((d = data[i++])) {
    segmentTotal += d.value;
  }
  this.segmentTotal = segmentTotal;

  this.draw();
};

var proto = Doughnut.prototype;

proto.draw = function () {
  var ctx = this.ctx
    , cfg = this.cfg
    , halfWidth = this.width / 2
    , halfHeight = this.height / 2
    , data = this.data
    , doughnutRadius = this.doughnutRadius
    , cutoutRadius = this.cutoutRadius
    , pieRadius = doughnutRadius
    , scaleShowValues = cfg.scaleShowValues
    , scaleFontStyle = cfg.scaleFontStyle
    , scaleFontSize = cfg.scaleFontSize
    , scaleFontFamily = cfg.scaleFontFamily
    , scaleFontColor = cfg.scaleFontColor
    , scaleValuePaddingX = cfg.scaleValuePaddingX
    , segmentTotal = this.segmentTotal
    , segmentShowStroke = cfg.segmentShowStroke
    , segmentStrokeWidth = cfg.segmentStrokeWidth
    , segmentStrokeColor = cfg.segmentStrokeColor
    , cumulativeAngle = - PI / 2
    , segmentAngle = 0
    , i = 0
    , d;

  while ((d = data[i++])) {
    segmentAngle = (d.value / segmentTotal) * PIx2;
    ctx.beginPath();
    ctx.arc(halfWidth, halfHeight, doughnutRadius, cumulativeAngle, cumulativeAngle + segmentAngle, false);
    ctx.arc(halfWidth, halfHeight, cutoutRadius, cumulativeAngle + segmentAngle, cumulativeAngle, true);
    ctx.closePath();
    ctx.fillStyle = d.color;
    ctx.fill();

    if (scaleShowValues) {
      ctx.save()
      ctx.translate(halfWidth, halfHeight);
      ctx.textAlign = 'center';
      ctx.font = scaleFontStyle + ' ' + scaleFontSize + 'px ' + scaleFontFamily;
      ctx.textBaselne = 'middle';
      var a = (cumulativeAngle + cumulativeAngle + segmentAngle) / 2
        , w = ctx.measureText(d.value).width
        , b = PI / 2 < a && a < PI * 3 / 2;
      ctx.translate(Math.cos(a) * pieRadius, Math.sin(a) * pieRadius);
      ctx.rotate(a - (b ? PI : 0));
      ctx.fillStyle = scaleFontColor;
      ctx.fillText(d.value, (b ? 1 : -1) * (w / 2 + scaleValuePaddingX), scaleFontSize / 2);
      ctx.restore();
    }

    if (segmentShowStroke) {
      ctx.lineWidth = segmentStrokeWidth;
      ctx.strokeStyle = segmentStrokeColor;
      ctx.stroke();
    }
    cumulativeAngle += segmentAngle;
  }
};
