"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require("react");var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var

EffectsPane = function (_Component) {_inherits(EffectsPane, _Component);function EffectsPane() {_classCallCheck(this, EffectsPane);return _possibleConstructorReturn(this, (EffectsPane.__proto__ || Object.getPrototypeOf(EffectsPane)).apply(this, arguments));}_createClass(EffectsPane, [{ key: "render", value: function render()
    {var
      hit = this.props.hit;
      return hit ?
      _react2.default.createElement("div", {
        style: {
          width: "100%",
          height: "80%",
          backgroundColor: "rgba(255,0,0,0.5)",
          position: "fixed",
          top: 0,
          zIndex: 10,
          justifyContent: "center",
          alignItems: "center",
          display: "flex" } }) :


      null;
    } }]);return EffectsPane;}(_react.Component);exports.default = EffectsPane;