var Canvas = require('canvas')
  , canvas = new Canvas(800, 800)
  , ctx = canvas.getContext('2d')
  , Chart = require('../')
  , fs = require('fs')
  , data = JSON.parse(fs.readFileSync(__dirname + '/doughnut.json'));

Chart(ctx).Doughnut(data, {
  scaleShowValues: true,
  scaleFontSize: 24
});

canvas.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/doughnut.png', buf);
});
