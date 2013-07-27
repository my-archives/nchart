var chart = require('../')
  , assert = require('assert');

describe('chart', function () {
  it('should inherit from Chart', function () {
    var c = chart();
    chart.should.equal(c.constructor);
  })
})

describe('chart', function () {
  it('should inherit from new Chart', function () {
    var c = new chart();
    chart.should.equal(c.constructor);
  })
})
