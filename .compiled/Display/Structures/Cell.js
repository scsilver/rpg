cp"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require("react");var _react2 = _interopRequireDefault(_react);
var _propTypes = require("prop-types");var _propTypes2 = _interopRequireDefault(_propTypes);
var _theme = require("../../../styling/theme.js");var _theme2 = _interopRequireDefault(_theme);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
var resourceList = {
  iron: { ore: true, food: false, material: false },
  diamond: { ore: true, food: false, material: false },
  copper: { ore: true, food: false, material: false },
  apple: { ore: false, food: true, material: false },
  strawberry: { ore: false, food: true, material: false },
  corn: { ore: false, food: true, material: false },
  wood: { ore: false, food: false, material: true },
  sand: { ore: false, food: false, material: true },
  fish: { ore: false, food: true, material: false },
  water: { ore: false, food: true, material: false } };var

Cell = function (_Component) {_inherits(Cell, _Component);function Cell() {_classCallCheck(this, Cell);return _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).apply(this, arguments));}_createClass(Cell, [{ key: "render", value: function render()
    {var _this2 = this;var _props =




      this.props,cell = _props.cell,_props$cell = _props.cell,x = _props$cell.x,y = _props$cell.y,biome = _props$cell.biome,resources = _props$cell.resources,character = _props$cell.character,options = _props.options;
      var hue = 0;
      var sat = 100;
      var lum = Math.ceil(this.props.cell.height * 0.8 % 100);
      return (
        _react2.default.createElement("div", {
            onMouseOver: function onMouseOver(e) {return _this2.props.handleMouseMove(e, cell);},
            className: "cell x: " + x + " y: " + y,
            style: {
              color: "white",
              backgroundColor: _theme2.default[biome.name],
              minWidth: 70 / options.side + "vh",
              maxWidth: 70 / options.side + "vh",
              minHeight: 70 / options.side + "vh",
              maxHeight: 70 / options.side + "vh",
              display: "inline-block",
              textAlign: "center",
              overflow: "hidden" } },


          biome.emoji != "" ? biome.emoji : character.emoji));


    } }]);return Cell;}(_react.Component);


//  {/*resources.filter(
//             resource =>
//               resourceList[resource].ore || resourceList[resource].food
//           )[0]*/}
exports.default = Cell;