var Canvas = require('canvas')
  , canvas = new Canvas(800, 800)
  , ctx = canvas.getContext('2d')
  , Chart = require('../')
  , fs = require('fs')
  , data = JSON.parse(fs.readFileSync(__dirname + '/radar.json'));

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
Chart(ctx).Radar(data);

canvas.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/radar.png', buf);
});
