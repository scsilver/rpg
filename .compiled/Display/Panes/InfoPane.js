"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _class, _temp;var _react = require("react");var _react2 = _interopRequireDefault(_react);
var _theme = require("../../../styling/theme.js");var _theme2 = _interopRequireDefault(_theme);
var _WorldStatus = require("./Status/WorldStatus.jsx");var _WorldStatus2 = _interopRequireDefault(_WorldStatus);
var _PlayerStatus = require("./Status/PlayerStatus.jsx");var _PlayerStatus2 = _interopRequireDefault(_PlayerStatus);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
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

InfoPane = (_temp = _class = function (_Component) {_inherits(InfoPane, _Component);function InfoPane() {_classCallCheck(this, InfoPane);return _possibleConstructorReturn(this, (InfoPane.__proto__ || Object.getPrototypeOf(InfoPane)).apply(this, arguments));}_createClass(InfoPane, [{ key: "render", value: function render()



    {var _props =
      this.props,_props$game = _props.game,player = _props$game.player,world = _props$game.world,selectedCell = _props.selectedCell;
      return (
        _react2.default.createElement("div", {
            style: {
              backgroundImage:
              "url(https://images.template.net/wp-content/uploads/2017/01/07045821/White-Parchment-Paper-Texture.jpg)",
              width: "100%",
              height: "20%",
              backgroundColor: _theme2.default.tertiary,
              color: _theme2.default.quinary,
              fontFamily: "Josefin Slab",
              weight: 500,
              padding: "10px",
              boxSizing: "border-box",
              display: "inline-flex",
              flexDirection: "row",
              overflow: "wrap",
              position: "fixed",
              bottom: 0 } },


          _react2.default.createElement("div", { style: { flex: 3 } },
            _react2.default.createElement(_PlayerStatus2.default, player)),

          _react2.default.createElement("div", { style: { flex: 1 } },
            _react2.default.createElement(_WorldStatus2.default, world))));



    } }]);return InfoPane;}(_react.Component), _class.defaultProps = { player: {} }, _temp);exports.default = InfoPane;



{
  /*<div
          style={{
            flex: 2,
            flexDirection: "row"
          }}
        >
          <div
            style={{
              flex: 1,
              flexDirection: "column",
              display: "inline-flex",
              padding: "10px"
            }}
          >
            <h3>Status</h3>
            <h5>
              Health
              <div
                style={{
                  backgroundColor: "red",
                  width: `${player.health}%`,
                  height: "20px"
                }}
              />{" "}
            </h5>
            <div>
              Hunger
              <div
                style={{
                  backgroundColor: "green",
                  width: `${player.hunger}%`,
                  height: "20px"
                }}
              />
            </div>
          </div>
          <div
            style={{
              flex: 1,
              flexDirection: "column",
              display: "inline-flex",
              padding: "10px"
            }}
          >
            <h5 style={{ margin: "0" }}>Skills</h5>
            <div>Agility {player.agility}</div>
            <div>Attack {player.attack}</div>
            <div>Defense {player.defense}</div>
          </div>
            <div
            style={{
              flex: 1,
              flexDirection: "column",
              display: "inline-flex",
              padding: "10px"
            }}
          >
            <h5 style={{ margin: "0" }}>Inventory</h5>
            {_.uniq(player.inventory).map((item, i, inventory) => {
              return (
                <div>
                  {player.inventory.filter(itemA => item == itemA).length} lbs
                  of {item}
                </div>
              );
            })}
          </div>
        </div>
          <div>
          {Object.keys(this.props.gameControls).map(key => (
            <button onClick={this.props.gameControls[key]}>{key}</button>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {player.mentalState.interaction}
          {player.mentalState.environment}
        </div>
        <div style={{ flex: 1 }}>Time: {time}</div>*/


}