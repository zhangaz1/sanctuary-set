'use strict';

var BaseSet = require('./BaseSet');

function compareObject(x, y) {
  if (x.constructor !== y.constructor) {
    if (x.constructor == null) {
      return 1;
    }
    if (y.constructor == null) {
      return -1;
    }
    return x.constructor.name < y.constructor.name ? -1 : 1;
  }

  var xKeys = Object.keys(x);
  var yKeys = Object.keys(y);
  if (xKeys.length !== yKeys.length) return xKeys.length < yKeys.length ? -1 : 1;

  xKeys.sort();
  var xKeysStr = xKeys.join(',');

  yKeys.sort();
  var yKeysStr = yKeys.join(',');

  if (xKeysStr !== yKeysStr) return xKeysStr < yKeysStr ? -1 : 1;

  for (var p of xKeys) {
    var res = compare(x[p], y[p]);
    if (res === 1) {
      return 1;
    }
    if (res === -1) {
      return -1;
    }
  }

  return 0;
}

function compareArray(x, y) {
  if (x.length !== y.length) {
    return x.length < y.length ? -1 : 1;
  }
  var i = 0, order;
  while (i < x.length) {
    order = compare(x[i], y[i]);
    if (order !== 0) {
      return order;
    }
    i += 1;
  }
  return 0;
}

function objectType(a) {
  return Object.prototype.toString.call(a).slice(8, -1);
}

function compare(x, y) {
  if (x === y) return 0;
  var typeX = objectType(x);
  var typeY = objectType(y);
  if (typeX !== typeY) return typeX < typeY ? -1 : 1;
  switch (typeX) {
    case 'Number':
    case 'String':
    case 'Boolean':
      var x_ = x.valueOf(), y_ = y.valueOf();
      return x_ === y_ ? 0 : x_ < y_ ? -1 : 1;
  }
  if (typeX === 'Array') return compareArray(x, y);
  return compareObject(x, y);
}

module.exports = BaseSet(compare);
