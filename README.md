nchart
======

nchart for node.js inspired by [Chart.js][].  
**NOTE**: nchart currently just imports Chart.js(**v1.x**) and it's hacked for node.

## Usage

```js
var Canvas = require('canvas')
  , canvas = new Canvas(800, 800)
  , ctx = canvas.getContext('2d')
  , Chart = require('nchart')
  , fs = require('fs');

new Chart(ctx).Pie(
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

## Required!

  * [node-canvas][]

## Documentation

  You can find documentation at [Chart.js Doc][]

## Thanks to

  * https://github.com/visionmedia
  * https://github.com/nnnick

## License

  [MIT](LICENSE)

[node-canvas]: https://github.com/Automattic/node-canvas
