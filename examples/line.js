var Canvas = require('canvas')
  , canvas = new Canvas(1200, 800)
  , ctx = canvas.getContext('2d')
  , Chart = require('../')
  , fs = require('fs')
  , data = JSON.parse(fs.readFileSync(__dirname + '/line.json'));

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
Chart(ctx).Line(data, {
  scaleOverlay: !true,
  scaleOverride: true,
  scaleSteps: 10,
  scaleStartValue: 0,
  scaleStepWidth: 10
});

canvas.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/line.png', buf);
});
