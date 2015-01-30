var Canvas = require('canvas')
  , canvas = new Canvas(500, 500)
  , ctx = canvas.getContext('2d')
  , Chart = require('../')
  , fs = require('fs')
  , data = require('./doughnut.json');

new Chart(ctx).Doughnut(data, {
  //responsive : true
});

canvas.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/doughnut.png', buf);
});
