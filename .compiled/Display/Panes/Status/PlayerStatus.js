"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _react = require("react");var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var PlayerStatus = function PlayerStatus(props) {var

    name =










    props.name,age = props.age,job = props.job,race = props.race,attack = props.attack,defense = props.defense,agility = props.agility,hunger = props.hunger,health = props.health,xp = props.xp,_props$position = props.position,cell = _props$position.cell,movementCell = _props$position.movementCell;
    return (
        _react2.default.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
            _react2.default.createElement("div", {
                    style: { display: "flex", padding: "10px", flexDirection: "column" } },

                _react2.default.createElement("h1", { style: { margin: 0 } }, "Player"),
                _react2.default.createElement("h3", { style: { margin: 0, lineHeight: 1.2 } }, name),
                _react2.default.createElement("h3", { style: { margin: 0, lineHeight: 1.2 } }, job),
                _react2.default.createElement("h3", { style: { margin: 0, lineHeight: 1.2 } }, race),
                _react2.default.createElement("h3", { style: { margin: 0, lineHeight: 1.2 } }, age, " y/o")),

            _react2.default.createElement("div", {
                    style: { display: "flex", padding: "10px", flexDirection: "column" } },

                _react2.default.createElement("h1", { style: { margin: 0 } }, "Skills"),
                _react2.default.createElement("h3", { style: { margin: 0, lineHeight: 1.2 } }, "XP ", xp),
                _react2.default.createElement("h3", { style: { margin: 0, lineHeight: 1.2 } }, "Attack ", attack),
                _react2.default.createElement("h3", { style: { margin: 0, lineHeight: 1.2 } }, "Defense ", defense),
                _react2.default.createElement("h3", { style: { margin: 0, lineHeight: 1.2 } }, "Agility ", agility)),

            _react2.default.createElement("div", {
                    style: { display: "flex", padding: "10px", flexDirection: "column" } },

                _react2.default.createElement("h1", { style: { margin: 0 } }, "Status"),
                _react2.default.createElement("h3", {
                        style: {
                            margin: 0,
                            lineHeight: 1.2,
                            justifyContent: "space-between" } }, "Hunger ",


                    hunger.toString().split(".")[0]),

                _react2.default.createElement("h3", { style: { margin: 0, lineHeight: 1.2 } }, "Health ",
                    health.toString().split(".")[0])),


            _react2.default.createElement("div", {
                    style: { display: "flex", padding: "10px", flexDirection: "column" } },

                _react2.default.createElement("h1", { style: { margin: 0, display: "flex", flexBasis: "min0height" } }, "Near"),


                cell.x &&
                _react2.default.createElement("div", {
                        className: "cell x: " + cell.x + " y: " + cell.y,
                        style: {
                            color: "white",
                            backgroundColor: colors[cell.biome.name],
                            minWidth: "80%",
                            maxWidth: "auto",
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                            textAlign: "center",
                            overflow: "hidden",
                            alignSelf: "right" } },


                    _react2.default.createElement("div", null, " ", cell.biome.emoji != "" && cell.biome.emoji),
                    _react2.default.createElement("div", null, " ", cell.character.emoji != "" && cell.character.emoji))),



            _react2.default.createElement("div", {
                    style: { display: "flex", padding: "10px", flexDirection: "column" } },

                _react2.default.createElement("h1", { style: { margin: 0, display: "flex", flexBasis: "min0height" } }, "Ahead"),


                movementCell.x &&
                _react2.default.createElement("div", {
                        className: "movementCell x: " + movementCell.x + " y: " + movementCell.y,
                        style: {
                            color: "white",
                            backgroundColor: colors[movementCell.biome.name],
                            minWidth: "80%",
                            maxWidth: "auto",
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                            textAlign: "center",
                            overflow: "hidden",
                            alignSelf: "right" } },


                    _react2.default.createElement("div", null,
                        " ",
                        movementCell.biome.emoji != "" && movementCell.biome.emoji),

                    _react2.default.createElement("div", null,
                        " ",
                        movementCell.character.emoji != "" &&
                        movementCell.character.emoji)))));






};exports.default =

PlayerStatus;