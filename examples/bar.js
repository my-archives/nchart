var Canvas = require('canvas'),
    canvas = new Canvas(600, 400),
    ctx = canvas.getContext('2d'),
    Chart = require('../'),
    fs = require('fs'),
    data = JSON.parse(fs.readFileSync(__dirname + '/bar.json'));

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
Chart(ctx).Bar(data);

canvas.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/bar.png', buf);
});
