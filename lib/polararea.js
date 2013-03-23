var utils = require('./utils'),
    min = utils.min,
    max = utils.max,
    tmpl = utils.tmpl,
    floor = Math.floor,
    calculateScale = utils.calculateScale,
    calculateOffset = utils.calculateOffset,
    MAX_VALUE = Number.MAX_VALUE,
    MIN_VALUE = Number.MIN_VALUE;

exports = module.exports = PolarArea;

function PolarArea(ctx, data, config) {
	var canvas = ctx.canvas,
      width = canvas.width,
      height = canvas.height,
      maxSize,
      scaleHop,
      calculatedScale,
      labelHeight,
      scaleHeight,
      valueBounds,
      labelTemplateString;		

  calculateDrawingSizes();

  valueBounds = getValueBounds();

  labelTemplateString = config.scaleShowLabels? config.scaleLabel : null;

  if (config.scaleOverride) {
    calculatedScale = {
			steps : config.scaleSteps,
			stepValue : config.scaleStepWidth,
			graphMin : config.scaleStartValue,
			labels : []
		};
		for (var i = 0; i < calculatedScale.steps; i++){
			if (labelTemplateString) {
				calculatedScale
          .labels
          .push(
            tmpl(labelTemplateString,
            {
              value: (config.scaleStartValue + (config.scaleStepWidth * i)).toFixed(getDecimalPlaces (config.scaleStepWidth))
            }
            )
          );
			}
		}
  } else {
	  calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
  }

  scaleHop = maxSize/(calculatedScale.steps);

  animationLoop(config,drawScale,drawAllSegments,ctx);
function calculateDrawingSizes() {
	maxSize = min([width, height])/2;
	//Remove whatever is larger - the font size or line width.
	maxSize -= max([config.scaleFontSize * 0.5, config.scaleLineWidth * 0.5]);

	labelHeight = config.scaleFontSize * 2;
	//If we're drawing the backdrop - add the Y padding to the label height and remove from drawing region.
	if (config.scaleShowLabelBackdrop){
		labelHeight += 2 * config.scaleBackdropPaddingY;
		maxSize -= config.scaleBackdropPaddingY * 1.5;
	}

	scaleHeight = maxSize;
	//If the label height is less than 5, set it to 5 so we don't have lines on top of each other.
	labelHeight = labelHeight || 5;
}
function drawScale(){
			for (var i=0; i<calculatedScale.steps; i++){
				//If the line object is there
				if (config.scaleShowLine){
					ctx.beginPath();
					ctx.arc(width/2, height/2, scaleHop * (i + 1), 0, (Math.PI * 2), true);
					ctx.strokeStyle = config.scaleLineColor;
					ctx.lineWidth = config.scaleLineWidth;
					ctx.stroke();
				}

				if (config.scaleShowLabels){
					ctx.textAlign = "center";
					ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
 					var label =  calculatedScale.labels[i];
					//If the backdrop object is within the font object
					if (config.scaleShowLabelBackdrop){
						var textWidth = ctx.measureText(label).width;
						ctx.fillStyle = config.scaleBackdropColor;
						ctx.beginPath();
						ctx.rect(
							Math.round(width/2 - textWidth/2 - config.scaleBackdropPaddingX),     //X
							Math.round(height/2 - (scaleHop * (i + 1)) - config.scaleFontSize*0.5 - config.scaleBackdropPaddingY),//Y
							Math.round(textWidth + (config.scaleBackdropPaddingX*2)), //Width
							Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY*2)) //Height
						);
						ctx.fill();
					}
					ctx.textBaseline = "middle";
					ctx.fillStyle = config.scaleFontColor;
					ctx.fillText(label,width/2,height/2 - (scaleHop * (i + 1)));
				}
			}
		}
		function drawAllSegments(animationDecimal){
			var startAngle = -Math.PI/2,
			angleStep = (Math.PI*2)/data.length,
			scaleAnimation = 1,
			rotateAnimation = 1;
			if (config.animation) {
				if (config.animateScale) {
					scaleAnimation = animationDecimal;
				}
				if (config.animateRotate){
					rotateAnimation = animationDecimal;
				}
			}

			for (var i=0; i<data.length; i++){

				ctx.beginPath();
				ctx.arc(width/2,height/2,scaleAnimation * calculateOffset(data[i].value,calculatedScale,scaleHop),startAngle, startAngle + rotateAnimation*angleStep, false);
				ctx.lineTo(width/2,height/2);
				ctx.closePath();
				ctx.fillStyle = data[i].color;
				ctx.fill();

				if(config.segmentShowStroke){
					ctx.strokeStyle = config.segmentStrokeColor;
					ctx.lineWidth = config.segmentStrokeWidth;
					ctx.stroke();
				}
				startAngle += rotateAnimation*angleStep;
			}
		}
function animationLoop(config,drawScale,drawData,ctx){
		var animFrameAmount = 1,
			percentAnimComplete = 1;

		if (typeof drawScale !== "function") drawScale = function(){};

		requestAnimFrame(animLoop);


		function animateFrame(){
			var easeAdjustedAnimationPercent = 1;
      ctx.clearRect(0, 0, width, height);
			if(config.scaleOverlay){
				drawData(easeAdjustedAnimationPercent);
				drawScale();
			} else {
				drawScale();
				drawData(easeAdjustedAnimationPercent);
			}				
		}
		function animLoop(){
			//We need to check if the animation is incomplete (less than 1), or complete (1).
				percentAnimComplete += animFrameAmount;
				animateFrame();	
				//Stop the loop continuing forever
				if (percentAnimComplete <= 1){
					requestAnimFrame(animLoop);
				}
				else{
					if (typeof config.onAnimationComplete == "function") config.onAnimationComplete();
				}

		}		

	}

function getValueBounds() {
  var upperValue = MIN_VALUE,
	    lowerValue = MAX_VALUE,
	    maxSteps = floor((scaleHeight / (labelHeight * 0.66))),
	    minSteps = floor((scaleHeight / labelHeight * 0.5)),
      i = 0, d;
  while ((d = data[i++])) {
    if (d.value > upperValue) {
      upperValue = d.value;
    }
    if (d.value < lowerValue) {
      lowerValue = d.value;
    }
  }

	return {
		maxValue : upperValue,
		minValue : lowerValue,
		maxSteps : maxSteps,
	  minSteps : minSteps
	};
}
}



    function requestAnimFrame(cb) {
      cb();
    };
