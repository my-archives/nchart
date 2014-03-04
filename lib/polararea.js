var utils = require('./utils'),
    min = utils.min,
    max = utils.max,
    PI = Math.PI,
    PIx2 = PI * 2,
    tmpl = utils.tmpl,
    floor = Math.floor,
    calculateScale = utils.calculateScale,
    round = Math.round,
    calculateOffset = utils.calculateOffset,
    proto;

exports = module.exports = PolarArea;

function PolarArea(ctx, data, cfg) {
  var canvas = ctx.canvas;
  this.width = canvas.width;
  this.height = canvas.height;

  this.ctx = ctx;
  this.data = data;
  this.cfg = cfg;

  this.maxSize
    = this.scaleHop
    = this.calculatedScale
    = this.labelHeight
    = this.scaleHeight
    = this.valueBounds
    = this.labelTemplateString
    = void 0;

  this.calculateDrawingSizes();

  this.valueBounds = function getValueBounds(data, scaleHeight, labelHeight) {
    var upperValue = Number.MIN_VALUE;
    var lowerValue = Number.MAX_VALUE;
    for (var i = 0, len = data.length; i < len; ++i) {
      var v = data[i].value;
      if (v > upperValue) { upperValue = v; }
      if (v < lowerValue) { lowerValue = v; }
    };

    var maxSteps = floor((scaleHeight / (labelHeight*0.66)));
    var minSteps = floor((scaleHeight / labelHeight*0.5));

    return {
      maxValue : upperValue,
      minValue : lowerValue,
      maxSteps : maxSteps,
      minSteps : minSteps
    };
  }(data, this.scaleHeight, this.labelHeight);

  var labelTemplateString = this.labelTemplateString = cfg.scaleShowLabels ? cfg.scaleLabel : '';

  var calculatedScale;
  if (cfg.scaleOverride) {
    console.log('scaleSteps scaleStepWidth scaleStartValue must be required if scaleOverride is true.');
    calculatedScale = {
      steps: cfg.scaleSteps,
      stepValue: cfg.scaleStepWidth,
      graphMin: cfg.scaleStartValue,
      labels: []
    };

    for (var i = 0, l = calculatedScale.steps; i < l; ++i) {
      if (labelTemplateString) {
        calculatedScale.labels.push(
          tmpl(
            labelTemplateString,
            {
              value: (cfg.scaleStartValue + (cfg.scaleStepWidth * i)).toFixed(getDecimalPlaces(cfg.scaleStepWidth))
            }
          )
        );
      }
    }
  } else {
    calculatedScale = calculateScale(this.scaleHeight, this.valueBounds.maxSize, this.valueBounds.minSteps, this.valueBounds.maxValue, this.valueBounds.minValue, this.labelTemplateString);
  }

  this.calculatedScale = calculatedScale;

  this.scaleHop = this.maxSize / (this.calculatedScale.steps);

  this.draw();
}

proto = PolarArea.prototype;

proto.calculateDrawingSizes = function () {
  var cfg = this.cfg,
      maxSize = min([this.width, this.height]) / 2,
      scaleLineWidth = cfg.scaleLineWidth,
      scaleFontSize = cfg.scaleFontSize,
      scaleBackdropPaddingY = cfg.scaleBackdropPaddingY,
      labelHeight = scaleFontSize * 2;

  maxSize -= max([scaleFontSize * 0.5, scaleLineWidth * 0.5]);

  if (cfg.scaleShowLabelBackdrop) {
    labelHeight += (2 * scaleBackdropPaddingY);
    maxSize -= scaleBackdropPaddingY * 1.5;
  }

  this.scaleHeight = this.maxSize = maxSize;
  this.labelHeight = labelHeight;
};

proto.drawData = function () {
  var data = this.data,
      ctx = this.ctx,
      cfg = this.cfg,
      segmentShowStroke = cfg.segmentShowStroke,
      segmentStrokeColor = cfg.segmentStrokeColor,
      segmentStrokeWidth = cfg.segmentStrokeWidth,
      calculatedScale = this.calculatedScale,
      scaleHop = this.scaleHop,
      startAngle = - PI / 2,
      angleStep = PIx2 / data.length,
      halfWidth = this.width / 2,
      halfHeight = this.height / 2;

  for (var i= 0, len = data.length; i < len; ++i){
    ctx.beginPath();
    ctx.arc(halfWidth, halfHeight, calculateOffset(data[i].value, calculatedScale, scaleHop), startAngle, startAngle + angleStep, false);
    ctx.lineTo(halfWidth, halfHeight);
    ctx.closePath();
    ctx.fillStyle = data[i].color;
    ctx.fill();

    if(segmentShowStroke){
      ctx.strokeStyle = segmentStrokeColor;
      ctx.lineWidth = segmentStrokeWidth;
      ctx.stroke();
    }
    startAngle += angleStep;
  }
};

proto.drawScale = function () {
  var ctx = this.ctx,
      cfg = this.cfg,
      calculatedScale = this.calculatedScale,
      scaleShowLine = cfg.scaleShowLine,
      scaleLineColor = cfg.scaleLineColor,
      scaleShowLabels = cfg.scaleShowLabels,
      scaleLineWidth = cfg.scaleLineWidth,
      scaleFontStyle = cfg.scaleFontStyle,
      scaleFontSize = cfg.scaleFontSize,
      scaleFontFamily = cfg.scaleFontFamily,
      scaleFontColor = cfg.scaleFontColor,
      scaleShowLabelBackdrop = cfg.scaleShowLabelBackdrop,
      scaleBackdropColor = cfg.scaleBackdropColor,
      scaleBackdropPaddingX = cfg.scaleBackdropPaddingX,
      scaleBackdropPaddingY = cfg.scaleBackdropPaddingY,
      scaleHop = this.scaleHop,
      halfWidth = this.width / 2,
      halfHeight = this.height / 2;

  for (var i = 0, len = calculatedScale.steps; i < len; ++i) {
    if (scaleShowLine) {
      ctx.beginPath();
      ctx.arc(halfWidth, halfHeight, scaleHop * (i + 1), 0, PIx2, true);
      ctx.strokeStyle = scaleLineColor;
      ctx.lineWidth = scaleLineWidth;
      ctx.stroke();
    }

    if (scaleShowLabels) {
      ctx.textAlign = "center";
      ctx.font = scaleFontStyle + " " + scaleFontSize + "px " + scaleFontFamily;
      var label =  calculatedScale.labels[i];
      if (scaleShowLabelBackdrop){
        var textWidth = ctx.measureText(label).width;
        ctx.fillStyle = scaleBackdropColor;
        ctx.beginPath();
        ctx.rect(
          round(halfWidth - textWidth / 2 - scaleBackdropPaddingX),     //X
          round(halfHeight - (scaleHop * (i + 1)) - scaleFontSize * 0.5 - scaleBackdropPaddingY),//Y
          round(textWidth + scaleBackdropPaddingX * 2), //Width
          round(scaleFontSize + scaleBackdropPaddingY * 2) //Height
        );
        ctx.fill();
      }
      ctx.textBaseline = "middle";
      ctx.fillStyle = scaleFontColor;
      ctx.fillText(label, halfWidth, halfHeight - (scaleHop * (i + 1)));
    }
  }
};

proto.draw = function () {
  if (this.cfg.scaleOverlay) {
    this.drawData();
    this.drawScale();
  } else {
    this.drawScale();
    this.drawData();
  }
};
