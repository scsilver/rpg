"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _class;var _react = require("react");var _react2 = _interopRequireDefault(_react);
var _mobxReact = require("mobx-react");
var _mobx = require("mobx");
var _Grid = require("./Structures/Grid.jsx");var _Grid2 = _interopRequireDefault(_Grid);
var _propTypes = require("prop-types");var _propTypes2 = _interopRequireDefault(_propTypes);
var _ActionPane = require("./Panes/ActionPane.jsx");var _ActionPane2 = _interopRequireDefault(_ActionPane);
var _InfoPane = require("./Panes/InfoPane.jsx");var _InfoPane2 = _interopRequireDefault(_InfoPane);
var _FullScreenPane = require("./Panes/FullScreenPane.jsx");var _FullScreenPane2 = _interopRequireDefault(_FullScreenPane);
var _EffectsPane = require("./Panes/EffectsPane.jsx");var _EffectsPane2 = _interopRequireDefault(_EffectsPane);
var _NewGameWizard = require("./Panes/NewGameWizard.jsx");var _NewGameWizard2 = _interopRequireDefault(_NewGameWizard);

var _state = require("../store/state.js");var _state2 = _interopRequireDefault(_state);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var

GameWindow = (0, _mobxReact.observer)(_class = function (_Component) {_inherits(GameWindow, _Component);
  function GameWindow(props) {_classCallCheck(this, GameWindow);var _this = _possibleConstructorReturn(this, (GameWindow.__proto__ || Object.getPrototypeOf(GameWindow)).call(this,
    props));_this.







    handleKeyPress = _.throttle(_state2.default.handleKeyPress, 100, {
      leading: true });_this.state = _state2.default;return _this;}_createClass(GameWindow, [{ key: "componentDidMount", value: function componentDidMount() {this.state.newWorld();} }, { key: "render", value: function render()

    {var _this2 = this;
      return (
        _react2.default.createElement(_mobxReact.Observer, null, function () {return (
              _react2.default.createElement("div", { className: "GameWindow", tabIndex: "0", onKeyDown: _this2.state.handleKeyPress },

                _react2.default.createElement(_NewGameWizard2.default, _extends({},
                _this2.state.game, {

                  inputHandler: _this2.state.inputHandler,
                  handleClick: _this2.state.handleNewGameWizardClick })),

                _react2.default.createElement(_FullScreenPane2.default, _extends({},
                _this2.state.game.fullScreenPane, {
                  handleClick: _this2.state.handleFullScreenDisplayClick })),


                _react2.default.createElement(_EffectsPane2.default, _this2.state.game.effectsPane),
                _react2.default.createElement(_ActionPane2.default, _extends({},
                _this2.state, {
                  gameControls: { newWorld: _this2.state.newWorld } })),

                _react2.default.createElement(_InfoPane2.default, _extends({}, _this2.state, { gameControls: { newWorld: _this2.state.newWorld } }))));}));



    } }]);return GameWindow;}(_react.Component)) || _class;exports.default =


GameWindow;