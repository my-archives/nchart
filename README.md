nchart
======

nChart for node.js inspired by [Chart.js][].

```js
var Canvas = require('canvas')
  , canvas = new Canvas(800, 800)
  , ctx = canvas.getContext('2d')
  , Chart = require('nchart')
  , fs = require('fs');

Chart(ctx).Pie(
    [
        {
            "value": 50
          , "color": "#E2EAE9"
        }
      , {
            "value": 100
          , "color": "#D4CCC5"
        }
      , {
            "value": 40
          , "color": "#949FB1"
        }
    ]
  , {
        scaleShowValues: true
      , scaleFontSize: 24
    }
);

canvas.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/pie.png', buf);
});
```

## Installation

    $ npm install -g nchart

## Features

  * Built on [node-canvas][]

## Charts

  * [✔] Line chart
  * [✔] Pie chart
  * [✔] Doughnut chart
  * [✔] Bar chart
  * [✔] Radar chart
  * [✔] Polar area chart

## Documentation

  You can find documentation at [Chart.js Doc][]

## Todo
  * chart-cli
  * stream
  * ...

## Thanks to

  * https://github.com/visionmedia
  * https://github.com/nnnick

## [Contributors](https://github.com/fundon/nchart/graphs/contributors)

## License

The MIT License (MIT)

Copyright (c) 2012 cfddream Cai cfddream@gmail.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[Chart.js]: http://www.chartjs.org/
[Chart.js Doc]: http://www.chartjs.org/docs
[node-canvas]: https://github.com/LearnBoost/node-canvas
