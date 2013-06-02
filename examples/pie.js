var Canvas = require('canvas')
  , canvas = new Canvas(900, 900)
  , ctx = canvas.getContext('2d')
  , Chart = require('../')
  , fs = require('fs')
  , data = JSON.parse(fs.readFileSync(__dirname + '/pie.json'));

Chart(ctx).Pie(data, {
  scaleShowValues: true,
  scaleFontSize: 24
});

canvas.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/pie.png', buf);
});
