module.exports = {
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
