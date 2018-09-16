"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require("react");var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var

FullScreenPane = function (_Component) {_inherits(FullScreenPane, _Component);function FullScreenPane() {_classCallCheck(this, FullScreenPane);return _possibleConstructorReturn(this, (FullScreenPane.__proto__ || Object.getPrototypeOf(FullScreenPane)).apply(this, arguments));}_createClass(FullScreenPane, [{ key: "render", value: function render()
    {var _props =
      this.props,visible = _props.visible,display = _props.display,handleClick = _props.handleClick;
      return (
        visible &&
        _react2.default.createElement("div", {
            onClick: handleClick,
            style: {
              width: "100%",
              height: "80%",
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "fixed",
              top: 0,
              zIndex: 10,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              fontFamily: "Josefin Slab" } },


          _react2.default.createElement("div", {
              style: {
                backgroundImage:
                "url(https://images.template.net/wp-content/uploads/2017/01/07045821/White-Parchment-Paper-Texture.jpg)",
                width: "50%",
                height: "50%",
                backgroundColor: "white",
                position: "initial",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100,
                padding: "20px",
                flexDirection: "column",
                textAlign: "center",
                fontSize: "1.4em",
                lineHeight: "1.4" } },


            display.
            split(".").
            map(function (sentence, i, d) {return [
              _react2.default.createElement("div", null, sentence),
              i > d.length - 3 ? null : _react2.default.createElement("div", null, "\xBB\xBB\u2014\u2014\u2014\u2014-\u3000\u3000\u2014\u2014\u2014\u2014-\xAB\xAB")];}))));





    } }]);return FullScreenPane;}(_react.Component);exports.default = FullScreenPane;