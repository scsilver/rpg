"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require("react");var _react2 = _interopRequireDefault(_react);
var _theme = require("../../../styling/theme.js");var _theme2 = _interopRequireDefault(_theme);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var degToRad = function degToRad(deg) {return Math.PI * deg / 180;};var
Player = function (_Component) {_inherits(Player, _Component);function Player() {_classCallCheck(this, Player);return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).apply(this, arguments));}_createClass(Player, [{ key: "render", value: function render()
    {var _props =
      this.props,player = _props.player,_props$world = _props.world,cells = _props$world.cells,options = _props$world.options;
      var orientationRad = degToRad(player.position.orientationDeg);
      return (
        _react2.default.createElement("div", {
            style: {
              position: "relative",
              top: 70 / options.side * (player.position.y - options.side) + "vh",
              left: 70 / options.side * player.position.x + "vh",
              minWidth: 70 / options.side + "vh",
              maxWidth: 70 / options.side + "vh",
              minHeight: 70 / options.side + "vh",
              maxHeight: 70 / options.side + "vh",
              transform: "matrix(" + Math.cos(orientationRad) + ", " + Math.sin(
              orientationRad) + ", " +
              Math.sin(orientationRad) + ", " + -Math.cos(orientationRad) + ",0,0)",
              textAlign: "center",
              verticalAlign: "center" } },


          player.emoji));


    } }]);return Player;}(_react.Component);exports.default = Player;