export default class Position {
  x: number;
  y: number;
  constructor(props = { x: 0, y: 0 }) {
    const { x, y } = props;
    this.x = props.x;
    this.y = props.y;
  }
}
