/**
 * Module dependencies.
 */

var _extend = require('util')._extend,
    _create = Object.create,
    max = Math.max,
    min = Math.min,
    round = Math.round,
    ceil = Math.ceil,
    floor = Math.floor,
    log = Math.log,
    LN10 = Math.LN10,
    pow = Math.pow,
    MAX_VALUE = Number.MAX_VALUE,
    MIN_VALUE = Number.MIN_VALUE;

exports.VOID = void 0;

exports.getValueBounds = function (data, scaleHeight, labelHeight) {
  var upperValue = MIN_VALUE,
      lowerValue = MAX_VALUE,
      maxSteps = floor((scaleHeight / (labelHeight * 0.66))),
      minSteps = floor((scaleHeight / labelHeight * 0.5)),
      datasets = data.datasets,
      i = 0, j = 0, l, d, v;

  while ((d = datasets[i++])) {
    d = d.data;
    j = 0;
    l = d.length
    for (; j < l; ++j) {
      v = d[j];
      if (v > upperValue) {
        upperValue = v;
      }
      if (v < lowerValue) {
        lowerValue = v;
      }
    }
  }

  return {
    maxValue: upperValue,
    minValue: lowerValue,
    maxSteps: maxSteps,
    minSteps: minSteps
  };
}

var isNumber = exports.isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

exports.max = function (array) {
  return max.apply(Math, array);
};

exports.min = function (array) {
  return min.apply(Math, array);
};

var capValue = exports.capValue = function (valueToCap, maxValue, minValue) {
  if (isNumber(maxValue) && (valueToCap > maxValue)) {
    return maxValue;
  }

  if (isNumber(minValue) && (valueToCap < minValue)) {
    return minValue;
  }

  return valueToCap;
};

var getDecimalPlaces = exports.getDecimalPlaces = function (num) {
  return num % 1 ? num.toString().split('.')[1].length : 0;
};

exports.merge = function (defaults, options) {
  return _extend(_create(defaults), options);
};

var cache = {};

var tmpl = exports.tmpl = function (str, data) {
  var fn = cache[str] || (cache[str] =
    new Function("obj",
      "var p=[],print=function(){p.push.apply(p,arguments);};" +
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');")
  );
  return data ? fn(data) : fn;
};

exports.calculateScale = function (drawingHeight, maxSteps, minSteps, maxValue, minValue, labelTemplateString) {
  var graphMin,
      graphMax,
      graphRange,
      stepValue,
      numberOfSteps,
      valueRange,
      rangeOrderOfMagnitude,
      decimalNum;

  valueRange = maxValue - minValue;

  rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);

  graphMin = floor(minValue / (1 * pow(10, rangeOrderOfMagnitude))) * pow(10, rangeOrderOfMagnitude);

  graphMax = ceil(maxValue / (1 * pow(10, rangeOrderOfMagnitude))) * pow(10, rangeOrderOfMagnitude);

  graphRange = graphMax - graphMin;

  stepValue = pow(10, rangeOrderOfMagnitude);

  numberOfSteps = round(graphRange / stepValue);

  //Compare number of steps to the max and min for that size graph, and add in half steps if need be.	        
  while (numberOfSteps < minSteps || numberOfSteps > maxSteps) {
    if (numberOfSteps < minSteps) {
      stepValue /= 2;
      numberOfSteps = round(graphRange / stepValue);
    } else {
      stepValue *=2;
      numberOfSteps = round(graphRange / stepValue);
    }
  }

  //Create an array of all the labels by interpolating the string.

  var labels = [];

  if (labelTemplateString) {
    //Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
    for (var i = 1; i < numberOfSteps + 1; i++){
      labels.push(
        tmpl(
          labelTemplateString,
          {
            value: (graphMin + (stepValue*i)).toFixed(getDecimalPlaces (stepValue))
          }
        )
      );
    }
  }

  return {
    steps: numberOfSteps,
    stepValue: stepValue,
    graphMin: graphMin,
    labels: labels
  };
};

var calculateOrderOfMagnitude = exports.calculateOrderOfMagnitude = function (val) {
  return floor(log(val) / LN10);
};

exports.calculateOffset = function (val, calculatedScale, scaleHop){
  var outerValue = calculatedScale.steps * calculatedScale.stepValue,
      adjustedValue = val - calculatedScale.graphMin,
      scalingFactor = capValue(adjustedValue / outerValue, 1, 0);
  return (scaleHop * calculatedScale.steps) * scalingFactor;
};
