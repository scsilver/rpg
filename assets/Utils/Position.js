export default class Position {
  constructor({ x = 0, y = 0 } = {}) {
    if (!Position.instances) {
      Position.instances = [];
    }
    this.x = x;
    this.y = y;
    this.id = Position.instances.length;
    const previousInstance = Position.instances.filter(
      instance => instance.x == x && instance.y == y
    )[0];
    if (previousInstance) {
      return previousInstance;
    }
    Position.instances.push(this);
  }
}
