var utils = require('./utils'),
    calculateScale = utils.calculateScale,
    calculateOffset = utils.calculateOffset,
    getDecimalPlaces = utils.getDecimalPlaces,
    tmpl = utils.tmpl,
    MAX_VALUE = Number.MAX_VALUE,
    MIN_VALUE = Number.MIN_VALUE;

exports = module.exports = Line;

/**
 * `Line` Chart
 */

function Line(ctx, data, cfg) {
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
    = this.valueHop
    = this.widestXLable
    = this.xAxisLength
    = this.yAxisPosX
    = this.xAxisPosY
    = void 0;

  this.rotateLabels = 0;

  this.calculateDrawingSizes();

  this.valueBounds = this.getValueBounds();

  this.labelTemplateString = cfg.scaleShowLabels ? cfg.scaleLabel : '';

  if (cfg.scaleOverride) {
    console.log('scaleSteps scaleStepWidth scaleStartValue must be required if scaleOverride is true.');

    var calculatedScale = this.calculatedScale = {
      steps: cfg.scaleSteps,
      stepValue: cfg.scaleStepWidth,
      graphMin: cfg.scaleStartValue,
      labels: []
    };

    for (var i = 1, l = calculatedScale.steps + 1; i < l; ++i) {
      if (this.labelTemplateString) {
        calculatedScale.labels.push(
          tmpl(
            this.labelTemplateString,
            {
              value: (cfg.scaleStartValue + cfg.scaleStepWidth * i).toFixed(getDecimalPlaces(cfg.scaleStepWidth))
            }
          )
        );
      }
    }
  } else {
    this.calculatedScale = calculateScale(
      this.scaleHeight,
      this.valueBounds.maxSteps,
      this.valueBounds.minSteps,
      this.valueBounds.maxValue,
      this.valueBounds.minValue,
      this.labelTemplateString
    );
  }
  this.scaleHop = Math.floor(this.scaleHeight / this.calculatedScale.steps);
  this.calculateXAxisSize();
  this.draw();
}

var proto = Line.prototype;

proto.calculateDrawingSizes = function () {
  var cfg = this.cfg,
      ctx = this.ctx,
      data = this.data,
      labels = data.labels;

  ctx.font = cfg.scaleFontStyle + ' ' + cfg.scaleFontSize + 'px ' + cfg.scaleFontFamily;

  var maxSize = this.maxSize = this.height,
      width = this.width,
      rotateLabels = this.rotateLabels,
      scaleFontSize = this.labelHeight = cfg.scaleFontSize,
      widestXLable = 1,
      i = 0,
      l = labels.length,
      textLength;
  for (var i = 0, l = labels.length; i < l; ++i) {
    textLength = ctx.measureText(labels[i]).width;
    widestXLable = textLength > widestXLable ? textLength : widestXLable;
  }
  if (width / l < widestXLable) {
    rotateLabels = 45;
    if (width / l < Math.cos(rotateLabels) * widestXLable) {
      rotateLabels = 90;
      maxSize -= widestXLable;
    } else {
      maxSize -= Math.sin(rotateLabels) * widestXLable;
    }
  } else {
    maxSize -= scaleFontSize;
  }

  this.widestXLable = widestXLable;
  this.rotateLabels = rotateLabels;
  maxSize -= 5;
  maxSize -= scaleFontSize;
  this.maxSize = maxSize;
  this.scaleHeight = maxSize;
};

proto.getValueBounds = function () {
  var upperValue = MIN_VALUE,
      lowerValue = MAX_VALUE,
      scaleHeight = this.scaleHeight,
      labelHeight = this.labelHeight,
      data = this.data,
      datasets = data.datasets,
      l = datasets.length,
      i = 0, j, d, dl, v;

  for (; i < l; ++i) {
    d = datasets[i].data;
    for (j = 0, dl = d.length; j < dl; ++j) {
      v = d[j];
      if (v > upperValue) {
        upperValue = v;
      }
      if (v < lowerValue) {
        lowerValue = v;
      }
    }
  }

  var maxSteps = Math.floor((scaleHeight / (labelHeight * 0.66)));
  var minSteps = Math.floor((scaleHeight / labelHeight * .5));

  return {
    maxValue: upperValue,
    minValue: lowerValue,
    maxSteps: maxSteps,
    minSteps: minSteps
  };
};

proto.calculateXAxisSize = function () {
  var longestText = 1,
      ctx = this.ctx,
      cfg = this.cfg;

  if (cfg.scaleShowLabels) {
    ctx.font = cfg.scaleFontStyle + ' ' + cfg.scaleFontSize + 'px ' + cfg.scaleFontFamily;
    for (var i = 0, l = this.calculatedScale.labels.length; i < l; ++i) {
      var measuredText = ctx.measureText(this.calculatedScale.labels[i]).width;
      longestText = measuredText > longestText ? measuredText : longestText;
    }
    longestText -= 10;
  }
  this.xAxisLength = this.width - longestText - this.widestXLable;
  this.valueHop = Math.floor(this.xAxisLength / (this.data.labels.length - 1));

  this.yAxisPosX = this.width - this.widestXLable / 2 - this.xAxisLength;
  this.xAxisPosY = this.scaleHeight + cfg.scaleFontSize / 2;
};

proto.drawScale = function () {
  var ctx = this.ctx,
      cfg = this.cfg,
      data = this.data,
      labels = data.labels,
      xAxisPosY = this.xAxisPosY,
      yAxisPosX = this.yAxisPosX,
      xAxisLength = this.xAxisLength,
      valueHop = this.valueHop,
      scaleHop = this.scaleHop,
      width = this.width,
      widestXLable = this.widestXLable,
      calculatedScale = this.calculatedScale,
      scaleGridLineWidth = cfg.scaleGridLineWidth,
      scaleGridLineColor = cfg.scaleGridLineColor,
      scaleShowGridLines = cfg.scaleShowGridLines,
      scaleShowLabels = cfg.scaleShowLabels;

  ctx.lineWidth = cfg.scaleLineWidth;
  ctx.strokeStyle = cfg.scaleLineColor;
  ctx.beginPath();
  ctx.moveTo(width - widestXLable / 2 + 5, xAxisPosY);
  ctx.lineTo(width - widestXLable / 2 - xAxisLength - 5, xAxisPosY);
  ctx.stroke();

  var rotateLabels = this.rotateLabels;

  if (rotateLabels > 0) {
    ctx.save();
    ctx.textAlign = 'right';
  } else {
    ctx.textAlign = 'center';
  }

  ctx.fillStyle = cfg.scaleFontColor;
  for (var i = 0, l = labels.length; i < l; ++i) {
    ctx.save();
    if (rotateLabels > 0) {
      ctx.translate(yAxisPosX + i * valueHop, xAxisPosY + cfg.scaleFontSize);
      ctx.rotate(-(rotateLabels * (Math.PI / 180)));
      ctx.fillText(labels[i], 0, 0);
      ctx.restore();
    } else {
      ctx.fillText(labels[i], yAxisPosX + i * valueHop, xAxisPosY + cfg.scaleFontSize + 3);
    }

    ctx.beginPath();
    ctx.moveTo(yAxisPosX + i * valueHop, xAxisPosY + 3);

    if (scaleShowGridLines && i > 0) {
      ctx.lineWidth = scaleGridLineWidth;
      ctx.strokeStyle = scaleGridLineColor;
      ctx.lineTo(yAxisPosX + i * valueHop, 5);
    } else {
      ctx.lineTo(yAxisPosX + i * valueHop, xAxisPosY + 3);
    }
    ctx.stroke();
  }

  ctx.lineWidth = cfg.scaleLineWidth;
  ctx.strokeStyle = cfg.scaleLineColor;
  ctx.beginPath();
  ctx.moveTo(yAxisPosX, xAxisPosY + 5);
  ctx.lineTo(yAxisPosX, 5);
  ctx.stroke();

  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (var j = 0, l = calculatedScale.steps; j < l; ++j) {
    ctx.beginPath();
    ctx.moveTo(yAxisPosX - 3, xAxisPosY - ((j + 1) * scaleHop));
    if (scaleShowGridLines){
      ctx.lineWidth = scaleGridLineWidth;
      ctx.strokeStyle = scaleGridLineColor;
      ctx.lineTo(yAxisPosX + xAxisLength + 5, xAxisPosY - ((j + 1) * scaleHop));
    } else {
      ctx.lineTo(yAxisPosX - 0.5, xAxisPosY - ((j + 1) * scaleHop));
    }

    ctx.stroke();

    // left points
    if (scaleShowLabels){
      ctx.fillText(calculatedScale.labels[j], yAxisPosX - 8, xAxisPosY - ((j + 1) * scaleHop));
    }
  }
};

proto.drawData = function () {
  var ctx = this.ctx,
      cfg = this.cfg,
      data = this.data,
      datasets = data.datasets,
      yAxisPosX = this.yAxisPosX,
      xAxisPosY = this.xAxisPosY,
      valueHop = this.valueHop,
      calculatedScale = this.calculatedScale,
      scaleHop = this.scaleHop,
      bezierCurve = cfg.bezierCurve,
      datasetFill = cfg.datasetFill,
      datasetStrokeWidth = cfg.datasetStrokeWidth,
      pointDot = cfg.pointDot,
      pointDotStrokeWidth = cfg.pointDotStrokeWidth,
      pointDotRadius = cfg.pointDotRadius,
      l = datasets.length, i = 0, j,
      ds, d, dl,
      yPos = function (dataSet, iteration) {
        return xAxisPosY - calculateOffset(datasets[dataSet].data[iteration], calculatedScale, scaleHop);
      },
      xPos = function (iteration) {
        return yAxisPosX + (valueHop * iteration);
      };

  for (; i < l; ++i) {
    ds = datasets[i];
    d = ds.data;
    ctx.strokeStyle = ds.strokeColor;
    ctx.lineWidth = datasetStrokeWidth;
    ctx.beginPath();
    ctx.moveTo(yAxisPosX, xAxisPosY - calculateOffset(d[0], calculatedScale, scaleHop));

    j = 1;
    if (bezierCurve) {
      for (dl = d.length; j < dl; j++) {
        ctx.bezierCurveTo(xPos(j - 0.5), yPos(i, j - 1), xPos(j - 0.5), yPos(i, j), xPos(j), yPos(i, j));
      }
    } else {
      for (dl = d.length; j < dl; j++) {
        ctx.lineTo(xPos(j), yPos(i, j));
      }
    }

    ctx.stroke();
    if (datasetFill) {
      ctx.lineTo(yAxisPosX + (valueHop * (dl - 1)), xAxisPosY);
      ctx.lineTo(yAxisPosX, xAxisPosY);
      ctx.closePath();
      ctx.fillStyle = ds.fillColor;
      ctx.fill();
    } else {
      ctx.closePath();
    }

    if (pointDot) {
      ctx.fillStyle = ds.pointColor;
      ctx.strokeStyle = ds.pointStrokeColor;
      ctx.lineWidth = pointDotStrokeWidth;
      for (var k = 0; k < dl; ++k) {
        ctx.beginPath();
        ctx.arc(yAxisPosX + (valueHop * k), xAxisPosY - calculateOffset(ds.data[k], calculatedScale, scaleHop), pointDotRadius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
      }
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
