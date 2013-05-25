var Canvas = require('canvas')
  , canvas = new Canvas(300, 300)
  , ctx = canvas.getContext('2d')
  , Chart = require('../')
  , fs = require('fs')
  , data = JSON.parse(fs.readFileSync(__dirname + '/polararea.json'));

//new Chart(ctx).PolarArea(data, {
Chart(ctx).PolarArea(data, {
  scaleFontFamily : "'Helvetica'",
  scaleFontSize : 13,
  scaleFontStyle : "bold",
  scaleFontColor : "#333",
  scaleShowLabelBackdrop : true,
  scaleBackdropColor : "#fafafa"
});

canvas.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/polararea.png', buf);
});
