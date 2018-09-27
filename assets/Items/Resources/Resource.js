import Item from "../Item";
export default class Resource extends Item {
  constructor({ name = "" } = {}) {
    super();
    this.name = name;
  }
}
