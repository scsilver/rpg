"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _class, _temp;var _react = require("react");var _react2 = _interopRequireDefault(_react);
var _propTypes = require("prop-types");var _propTypes2 = _interopRequireDefault(_propTypes);
var _lodash = require("lodash");var _lodash2 = _interopRequireDefault(_lodash);
var _Cell = require("./Cell.jsx");var _Cell2 = _interopRequireDefault(_Cell);
var _Player = require("../Objects/Player.jsx");var _Player2 = _interopRequireDefault(_Player);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var

Grid = (_temp = _class = function (_Component) {_inherits(Grid, _Component);
  function Grid() {_classCallCheck(this, Grid);var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this));_this.






    handleMouseMoveOver = _lodash2.default.debounce(function (event, cell) {
      var mouse = { x: event.clientX, y: event.clientY };
      _this.setState({ mouse: mouse, tooltip: true, cell: cell });
    }, 500);_this.

    handleMouseOutCell = function (e) {return _this.setState({ tooltip: false });};_this.state = {};return _this;}_createClass(Grid, [{ key: "render", value: function render()

    {var _this2 = this;var _props =






      this.props,tooltip = _props.tooltip,mouse = _props.mouse,game = _props.game,world = _props.game.world,_props$game$world = _props.game.world,cells = _props$game$world.cells,options = _props$game$world.options;
      var cellCount = options.amount;
      var sideCellCount = options.side;
      return (
        _react2.default.createElement("div", {
            className: "grid",
            style: {
              maxWidth: "70vh",
              minHeight: "70vh" } },


          cells.map(function (cell) {
            return (
              _react2.default.createElement(_Cell2.default, {
                handleMouseMove: function handleMouseMove(e, cell) {
                  e.persist();
                  return _this2.handleMouseMoveOver(e, cell);
                },
                handleMouseOut: _this2.handleMouseOutCell,
                mouse: _this2.props.mouse,
                cell: cell,
                options: options }));


          }),
          tooltip && _react2.default.createElement(Tooltip, _extends({}, mouse, { cell: cell })),
          _react2.default.createElement(_Player2.default, _extends({}, game, { options: options }))));


    } }]);return Grid;}(_react.Component), _class.defaultProps = { world: { cells: [] } }, _temp);exports.default = Grid;