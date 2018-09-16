"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _react = require("react");var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var WorldStatus = function WorldStatus(props) {var
    time = props.time;
    return (
        _react2.default.createElement("div", {
                style: {
                    display: "flex",
                    flexDirection: "row-reverse" } },


            _react2.default.createElement("div", {
                    style: { display: "flex", padding: "10px", flexDirection: "column" } },

                _react2.default.createElement("h1", { style: { margin: 0 } }, "Time"),
                _react2.default.createElement("h3", { style: { margin: 0, lineHeight: 1.2, textAlign: "right" } },
                    time.toString().split(".")[0]))));




};exports.default =

WorldStatus;