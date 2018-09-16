"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require("react");var _react2 = _interopRequireDefault(_react);
var _Grid = require("../Structures/Grid.jsx");var _Grid2 = _interopRequireDefault(_Grid);
var _theme = require("../../../styling/theme.js");var _theme2 = _interopRequireDefault(_theme);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var
ActionPane = function (_Component) {_inherits(ActionPane, _Component);function ActionPane() {_classCallCheck(this, ActionPane);return _possibleConstructorReturn(this, (ActionPane.__proto__ || Object.getPrototypeOf(ActionPane)).apply(this, arguments));}_createClass(ActionPane, [{ key: "render", value: function render()
    {var
      game = this.props.game;
      return (
        _react2.default.createElement("div", {
            style: {
              backgroundColor: _theme2.default.quaternary,
              width: "100%",
              height: "80%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              boxSizing: "border-box",
              position: "fixed",
              top: 0 } },


          _react2.default.createElement(_Grid2.default, { game: game })));


    } }]);return ActionPane;}(_react.Component);exports.default = ActionPane;