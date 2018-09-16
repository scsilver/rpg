import skills from "./Skills.ts";
import Position from "../Utils/Position.ts";
export default class Character {
  skills = skills;
  magic = 0;
  health = 100;
  hunger = 100;
  orientationDeg = 0;
  cell = {};
  cellAhead = {};
  position = new Position({ x: 1, y: 1 });
}
