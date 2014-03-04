var utils = require('./utils'),
    getValueBounds = utils.getValueBounds,
    getDecimalPlaces = utils.getDecimalPlaces,
    calculateScale = utils.calculateScale,
    calculateOffset = utils.calculateOffset,
    tmpl = utils.tmpl,
    sin = Math.sin,
    cos = Math.sin,
    floor = Math.floor,
    PI = Math.PI,
    proto;

exports = module.exports = Bar;

function Bar(ctx, data, cfg) {
  var canvas = ctx.canvas;
  this.width = canvas.width;
  this.height = canvas.height;

  this.ctx = ctx;
  this.data = data;
  this.cfg = cfg;

  this.maxSize
    = this.scaleHop
    = this.labelHeight
    = this.scaleHeight
    = this.valueHop
    = this.widestXLabel
    = this.xAxisLength
    = this.yAxisPosX
    = this.xAxisPosY
    = this.barWidth
    = void 0;

  this.rotateLabels = 0;

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

  this.scaleHop = floor(this.scaleHeight / calculatedScale.steps);

  this.calculateXAxisSize();

  this.draw();
}

proto = Bar.prototype;

proto.calculateXAxisSize = function () {
  var cfg = this.cfg,
      ctx = this.ctx,
      data = this.data,
      width = this.width,
      longestText = 1,
      calculatedScale = this.calculatedScale,
      len;

  //if we are showing the labels
  if (cfg.scaleShowLabels) {
    ctx.font = cfg.scaleFontStyle + ' ' + cfg.scaleFontSize + 'px ' + cfg.scaleFontFamily;
    for (var i = 0, l = calculatedScale.labels.length; i < l; ++i) {
      var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
      longestText = (measuredText > longestText) ? measuredText : longestText;
    }
    //Add a little extra padding from the y axis
    longestText +=10;
  }

  this.xAxisLength = width - longestText - this.widestXLabel;
  this.valueHop = floor(this.xAxisLength / (data.labels.length));

  len = data.datasets.length;
  this.barWidth = (this.valueHop - cfg.scaleGridLineWidth * 2 - (cfg.barValueSpacing * 2) - (cfg.barDatasetSpacing * len - 1) - ((cfg.barStrokeWidth / 2) * len - 1)) / len;

  this.yAxisPosX = width - this.widestXLabel / 2 - this.xAxisLength;
  this.xAxisPosY = this.scaleHeight + cfg.scaleFontSize / 2;
}

proto.calculateDrawingSizes = function () {
  var ctx = this.ctx,
      cfg = this.cfg,
      data = this.data,
      labels = data.labels,
      maxSize = this.height,
      width = this.width,
      widestXLabel = 1,
      len = labels.length;

  //Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
  ctx.font = cfg.scaleFontStyle + ' ' + cfg.scaleFontSize + 'px ' + cfg.scaleFontFamily;

  for (var i = 0; i < len; ++i) {
    var textLength = ctx.measureText(labels[i]).width;
    //If the text length is longer - make that equal to longest text!
    widestXLabel = (textLength > widestXLabel) ? textLength : widestXLabel;
  }

  if (width / len < widestXLabel) {
    rotateLabels = 45;
    if (width / len < cos(rotateLabels) * widestXLabel) {
      rotateLabels = 90;
      maxSize -= widestXLabel; 
    } else {
      maxSize -= sin(rotateLabels) * widestXLabel;
    }
  } else{
    maxSize -= cfg.scaleFontSize;
  }

  this.widestXLabel = widestXLabel;

  //Add a little padding between the x line and the text
  maxSize -= 5;

  this.labelHeight = cfg.scaleFontSize;

  maxSize -= this.labelHeight;
  //Set 5 pixels greater than the font size to allow for a little padding from the X axis.

  this.scaleHeight = this.maxSize = maxSize;

  //Then get the area above we can safely draw on.
};

proto.drawData = function () {
  var ctx = this.ctx,
      cfg = this.cfg,
      data = this.data,
      datasets = data.datasets,
      calculatedScale = this.calculatedScale,
      yAxisPosX = this.yAxisPosX,
      xAxisPosY = this.xAxisPosY,
      valueHop = this.valueHop,
      barWidth = this.barWidth,
      scaleHop = this.scaleHop,
      barValueSpacing = cfg.barValueSpacing,
      barDatasetSpacing = cfg.barDatasetSpacing,
      barStrokeWidth = cfg.barStrokeWidth,
      barShowStroke = cfg.barShowStroke,
      len, d;

  ctx.lineWidth = barStrokeWidth;

  len = datasets.length;
  for (var i = 0; i < len; ++i) {
    ctx.fillStyle = datasets[i].fillColor;
    ctx.strokeStyle = datasets[i].strokeColor;
    d = datasets[i].data;
    for (var j = 0, l = d.length; j < l; ++j) {
      var barOffset = yAxisPosX + barValueSpacing + valueHop * j + barWidth * i + barDatasetSpacing * i + barStrokeWidth * i;

      ctx.beginPath();
      ctx.moveTo(barOffset, xAxisPosY);
      ctx.lineTo(barOffset, xAxisPosY - calculateOffset(d[j], calculatedScale, scaleHop) + (barStrokeWidth / 2));
      ctx.lineTo(barOffset + barWidth, xAxisPosY - calculateOffset(d[j], calculatedScale, scaleHop) + (barStrokeWidth / 2));
      ctx.lineTo(barOffset + barWidth, xAxisPosY);
      if (barShowStroke) {
        ctx.stroke();
      }
      ctx.closePath();
      ctx.fill();
    }
  }
};

proto.drawScale = function () {
  var cfg = this.cfg,
      ctx = this.ctx,
      data = this.data,
      width = this.width,
      xAxisPosY = this.xAxisPosY,
      yAxisPosX = this.yAxisPosX,
      xAxisLength = this.xAxisLength,
      widestXLabel = this.widestXLabel,
      valueHop = this.valueHop,
      scaleHop = this.scaleHop,
      rotateLabels = this.rotateLabels,
      calculatedScale = this.calculatedScale,

      scaleShowLabels = cfg.scaleShowLabels,
      scaleFontSize = cfg.scaleFontSize,
      scaleLineWidth = cfg.scaleLineWidth,
      scaleLineColor = cfg.scaleLineColor,
      scaleGridLineWidth = cfg.scaleGridLineWidth,
      scaleShowGridLines = cfg.scaleShowGridLines,
      scaleGridLineColor = cfg.scaleGridLineColor;

  //X axis line
  ctx.lineWidth = scaleLineWidth;
  ctx.strokeStyle = scaleLineColor;
  ctx.beginPath();
  ctx.moveTo(width - widestXLabel / 2 + 5, xAxisPosY);
  ctx.lineTo(width - widestXLabel / 2 - xAxisLength - 5, xAxisPosY);
  ctx.stroke();

  if (rotateLabels > 0){
    ctx.save();
    ctx.textAlign = "right";
  }
  else{
    ctx.textAlign = "center";
  }

  ctx.fillStyle = cfg.scaleFontColor;
  for (var i = 0; i < data.labels.length; ++i) {
    ctx.save();
    if (rotateLabels > 0) {
      ctx.translate(yAxisPosX + i * valueHop, xAxisPosY + scaleFontSize);
      ctx.rotate(-(rotateLabels * (PI / 180)));
      ctx.fillText(data.labels[i], 0,0);
      ctx.restore();
    } else {
      ctx.fillText(data.labels[i], yAxisPosX + i * valueHop + valueHop / 2, xAxisPosY + scaleFontSize + 3);
    }

    ctx.beginPath();
    ctx.moveTo(yAxisPosX + (i + 1) * valueHop, xAxisPosY + 3);

    //Check i isnt 0, so we dont go over the Y axis twice.
    ctx.lineWidth = scaleGridLineWidth;
    ctx.strokeStyle = scaleGridLineColor;
    ctx.lineTo(yAxisPosX + (i + 1) * valueHop, 5);
    ctx.stroke();
  }

  //Y axis
  ctx.lineWidth = scaleLineWidth;
  ctx.strokeStyle = scaleLineColor;
  ctx.beginPath();
  ctx.moveTo(yAxisPosX, xAxisPosY + 5);
  ctx.lineTo(yAxisPosX, 5);
  ctx.stroke();

  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (var j = 0; j < calculatedScale.steps; j++) {
    ctx.moveTo(yAxisPosX - 3, xAxisPosY - ((j + 1) * scaleHop));
    if (scaleShowGridLines) {
      ctx.lineWidth = scaleGridLineWidth;
      ctx.strokeStyle = scaleGridLineColor;
      ctx.lineTo(yAxisPosX + xAxisLength + 5, xAxisPosY - ((j+1) * scaleHop));
    } else {
      ctx.lineTo(yAxisPosX - 0.5, xAxisPosY - ((j+1) * scaleHop));
    }

    ctx.stroke();
    if (scaleShowLabels) {
      ctx.fillText(calculatedScale.labels[j], yAxisPosX - 8, xAxisPosY - ((j+1) * scaleHop));
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
