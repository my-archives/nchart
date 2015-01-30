var Canvas = require('canvas')
  , canvas = new Canvas(600, 450)
  , ctx = canvas.getContext('2d')
  , Chart = require('../')
  , fs = require('fs')
  , data = require('./line.json');

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
new Chart(ctx).Line(data);

canvas.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/line.png', buf);
});
