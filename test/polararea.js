var Canvas = require('canvas'),
    canvas = new Canvas(300, 300),
    ctx = canvas.getContext('2d'),
    Chart = require('../'),
    fs = require('fs');

var data = [
	{
		value : 30,
		color: "#D97041"
	},
	{
		value : 90,
		color: "#C7604C"
	},
	{
		value : 24,
		color: "#21323D"
	},
	{
		value : 58,
		color: "#9D9B7F"
	},
	{
		value : 82,
		color: "#7D4F6D"
	},
	{
		value : 8,
		color: "#584A5E"
	}
];

new Chart(ctx).PolarArea(data);

canvas.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/polararea.png', buf);
});
