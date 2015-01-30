var Canvas = require('canvas')
  , canvas = new Canvas(300, 300)
  , ctx = canvas.getContext('2d')
  , Chart = require('../')
  , fs = require('fs')
  , data = require('./polararea.json');

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
//new Chart(ctx).PolarArea(data, {
new Chart(ctx).PolarArea(data);

canvas.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/polararea.png', buf);
});
