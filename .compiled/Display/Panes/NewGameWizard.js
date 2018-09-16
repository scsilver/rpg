"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require("react");var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
//  <select
//                 label="player race"
//                 value={player.race}
//                 onChange={e => this.props.inputHandler(e, "race")}
//               >
//                 {options.races.map(race => (
//                   <option value={race}>{race}</option>
//                 ))}
//               </select>
var NewGameWizard = function (_Component) {_inherits(NewGameWizard, _Component);function NewGameWizard() {var _ref;var _temp, _this, _ret;_classCallCheck(this, NewGameWizard);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NewGameWizard.__proto__ || Object.getPrototypeOf(NewGameWizard)).call.apply(_ref, [this].concat(args))), _this), _this.
    getInput = function (key) {var
      player = _this.props.player;
      switch (_typeof(player[key])) {
        case "string":
          return (
            _react2.default.createElement("input", {
              label: key,
              value: player[key],
              onChange: function onChange(e) {return _this.props.inputHandler(e, key, "textBox");} }));


          break;
        case "number":
          return [
          _react2.default.createElement("input", {
            label: key,
            type: "range",
            defaultValue: player[key],
            min: 1,
            max:
            key == "age" ?
            254 :

            Number.parseInt(
            player.xp +
            player[key] - (
            player.defense + player.attack + player.agility)),



            step: 1,
            onChange: function onChange(e) {return _this.props.inputHandler(e, key, "range");} }),

          _react2.default.createElement("h5", { style: { margin: 0 } }, player[key])];


          break;

        default:
          return (
            _react2.default.createElement("input", {
              label: key,
              value: player[key],
              onChange: function onChange(e) {return _this.props.inputHandler(e, key, "textBox");} }));


          break;}

    }, _temp), _possibleConstructorReturn(_this, _ret);}_createClass(NewGameWizard, [{ key: "render", value: function render()
    {var _this2 = this;var _props =






      this.props,visible = _props.newGameWizard.visible,inputHandler = _props.inputHandler,handleClick = _props.handleClick,options = _props.world.options,player = _props.player;
      return (
        visible &&
        _react2.default.createElement("div", {
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
                flexDirection: "row",
                textAlign: "center",
                fontSize: "1.4em",
                lineHeight: "1.4" } },


            _react2.default.createElement("div", { style: { display: "flex", flex: 1, flexDirection: "column" } },
              [
              "name",
              "race",
              "job",
              "age",
              "defense",
              "attack",
              "agility"].
              map(function (key) {return (
                  _react2.default.createElement("div", {
                      style: { display: "flex", justifyContent: "space-between" } },

                    _react2.default.createElement("h5", { style: { margin: 0 } },
                      key[0].toUpperCase() + key.slice(1)),

                    _this2.getInput(key)));})),



            _react2.default.createElement("button", { onClick: handleClick }, "Start"))));




    } }]);return NewGameWizard;}(_react.Component);exports.default = NewGameWizard;