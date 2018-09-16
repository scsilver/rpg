"use strict";Object.defineProperty(exports, "__esModule", { value: true });var objectToArray = function objectToArray(object) {
  var keys = Object.keys(object);
  var values = keys.map(function (key) {return object[key];});

  return {
    keys: keys,
    values: values,
    getRandomFromObject: function getRandomFromObject() {return getRandomFromArray(values);} };

};
var getRandomFromArray = function getRandomFromArray(array) {return (
    array[Math.floor(Math.random() * array.length)]);};
var percentTrue = function percentTrue(percent) {
  return Math.random() <= percent / 100;
};exports.
objectToArray = objectToArray;exports.getRandomFromArray = getRandomFromArray;exports.percentTrue = percentTrue;