var utils = require('./utils'),
    min = utils.min,
    max = utils.max,
    sin = Math.sin,
    cos = Math.cos,
    PI = Math.PI,
    round = Math.round,
    PIx2 = PI * 2,
    tmpl = utils.tmpl,
    capValue = utils.capValue,
    getValueBounds = utils.getValueBounds,
    calculateScale = utils.calculateScale,
    calculateOffset = utils.calculateOffset,
    proto;

exports = module.exports = Radar;

function Radar(ctx, data, cfg) {
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

  if (!data.labels) {
    data.labels = [];
  }

  this.calculateDrawingSizes();

  this.valueBounds = getValueBounds(data, this.scaleHeight, this.labelHeight);

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

proto = Radar.prototype;

proto.calculateDrawingSizes = function () {
  var ctx = this.ctx,
      cfg = this.cfg,
      data = this.data,
      labels = data.labels,
      pointLabelFontStyle = cfg.pointLabelFontStyle,
      pointLabelFontSize = cfg.pointLabelFontSize,
      pointLabelFontFamily = cfg.pointLabelFontFamily,
      maxSize = min([this.width, this.height]) / 2,
      labelHeight = cfg.scaleFontSize * 2;

  var labelLength = 0;
  for (var i = 0, len = labels.length; i < len; ++i) {
    ctx.font = pointLabelFontStyle + ' ' + pointLabelFontSize + 'px ' + pointLabelFontFamily;
    var textMeasurement = ctx.measureText(labels[i]).width;
    if (textMeasurement > labelLength) labelLength = textMeasurement;
  }

  maxSize -= max([labelLength, (pointLabelFontSize / 2) * 1.5]);

  maxSize -= pointLabelFontSize;
  maxSize = capValue(maxSize, null, 0);
  this.scaleHeight = this.maxSize = maxSize;
  this.labelHeight = labelHeight || 5;
};

proto.drawScale = function () {
  var ctx = this.ctx,
      cfg = this.cfg,
      data = this.data,
      datasets = data.datasets,
      len = datasets[0].data.length,
      rotationDegree = PIx2 / len,
      maxSize = this.maxSize,
      scaleHop = this.scaleHop,
      calculatedScale = this.calculatedScale,
      scaleShowLine = cfg.scaleShowLine,
      scaleShowLabels = cfg.scaleShowLabels,
      scaleLineColor = cfg.scaleLineColor,
      scaleLineWidth = cfg.scaleLineWidth,
      scaleFontStyle = cfg.scaleFontStyle,
      scaleFontSize = cfg.scaleFontSize,
      scaleFontFamily = cfg.scaleFontFamily,
      scaleFontColor = cfg.scaleFontColor,
      scaleShowLabelBackdrop = cfg.scaleShowLabelBackdrop,
      scaleBackdropColor = cfg.scaleBackdropColor,
      scaleBackdropPaddingX = cfg.scaleBackdropPaddingX,
      scaleBackdropPaddingY = cfg.scaleBackdropPaddingY,
      pointLabelFontStyle = cfg.pointLabelFontStyle,
      pointLabelFontSize = cfg.pointLabelFontSize,
      pointLabelFontColor = cfg.pointLabelFontColor,
      pointLabelFontFamily = cfg.pointLabelFontFamily;

  ctx.save();
  ctx.translate(this.width / 2, this.height / 2);

  if (cfg.angleShowLineOut) {
    ctx.strokeStyle = cfg.angleLineColor;
    ctx.lineWidth = cfg.angleLineWidth;
    for (var h = 0; h < len; ++h) {
      ctx.rotate(rotationDegree);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -maxSize);
    }
  }

  for (var i = 0, steps = calculatedScale.steps; i < steps; ++i) {
    ctx.beginPath();

    if (scaleShowLine) {
      ctx.strokeStyle = scaleLineColor;
      ctx.lineWidth = scaleLineWidth;
      ctx.moveTo(0, -scaleHop * (i + 1));
      for (var j = 0; j < len; ++j) {
        ctx.rotate(rotationDegree);
        ctx.lineTo(0, -scaleHop * (i + 1));
      }
      ctx.closePath();
      ctx.stroke();
    }

    if (scaleShowLabels) {
      ctx.textAlign = 'center';
      ctx.font = scaleFontStyle + ' ' + scaleFontSize + 'px ' + scaleFontFamily;
      ctx.textBaselne = 'middle';

      if (scaleShowLabelBackdrop) {
        var textWidth = ctx.measureText(calculatedScale.labels[i]).width;
        ctx.fillStyle = scaleBackdropColor;
        ctx.beginPath();
        ctx.rect(
          // x
          round(- textWidth / 2 - scaleBackdropPaddingX),
          // y
          round(- scaleHop * (i + 1) - scaleFontSize * 0.5 - scaleBackdropPaddingY),
          // width
          round(textWidth + scaleBackdropPaddingX * 2),
          // height
          round(scaleFontSize + scaleBackdropPaddingY * 2)
        );
        ctx.fill();
      }

      ctx.fillStyle = scaleFontColor;
      ctx.fillText(calculatedScale.labels[i], 0, -scaleHop * (i + 1));
    }
  }

  for (var k = 0, l = data.labels.length; k < l; ++k) {
    ctx.font = pointLabelFontStyle + ' ' + pointLabelFontSize + 'px ' + pointLabelFontFamily;
    ctx.fillStyle = pointLabelFontColor;

    var rk = rotationDegree * k;

    var opposite = sin(rk) * (maxSize + pointLabelFontSize);
    var adjacent = cos(rk) * (maxSize + pointLabelFontSize);
    if (rk === PI || rk === 0) {
      ctx.textAlign = 'center';
    } else if (rk > PI) {
      ctx.textAlign = 'right';
    } else {
      ctx.textAlign = 'left';
    }
    ctx.textBaselne = 'middle';
    ctx.fillText(data.labels[k], opposite, -adjacent);
  }
  ctx.restore();
}

proto.drawData = function () {
  var data = this.data,
      datasets = data.datasets,
      ctx = this.ctx,
      cfg = this.cfg,
      calculatedScale = this.calculatedScale,
      scaleHop = this.scaleHop,
      len = datasets[0].data.length,
      datasetStrokeWidth = cfg.datasetStrokeWidth,
      pointDot = cfg.pointDot,
      pointDotRadius = cfg.pointDotRadius,
      pointDotStrokeWidth = cfg.pointDotStrokeWidth,
      rotationDegree = PIx2 / len;

  ctx.save();
  ctx.translate(this.width / 2, this.height / 2);

  for (i = 0, l = datasets.length; i < l; ++i) {
    var ds = datasets[i];
    ctx.beginPath();

    ctx.moveTo(0, -1 * calculateOffset(ds.data[0], calculatedScale, scaleHop));
    for (var j = 1, dl = ds.data.length; j < dl; ++j) {
      ctx.rotate(rotationDegree);
      ctx.lineTo(0, -1 * calculateOffset(ds.data[j], calculatedScale, scaleHop));
    }
    ctx.closePath();

    ctx.fillStyle = ds.fillColor;
    ctx.strokeStyle = ds.strokeColor;
    ctx.lineWidth = datasetStrokeWidth;
    ctx.fill();
    ctx.stroke();

    if (pointDot) {
      ctx.fillStyle = ds.pointColor;
      ctx.strokeStyle = ds.pointStrokeColor;
      ctx.lineWidth = pointDotStrokeWidth;

      for (var k = 0, dll = ds.data.length; k < dll; ++k) {
        ctx.rotate(rotationDegree);
        ctx.beginPath();
        ctx.arc(0, (-1 * calculateOffset(ds.data[k], calculatedScale, scaleHop)), pointDotRadius, 0, PIx2, false);
        ctx.fill();
        ctx.stroke();
      }
    }
    ctx.rotate(rotationDegree);

  }
  ctx.restore();

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
