import Item from "../Item";
export default class Resource extends Item {
  constructor({ name = "" } = {}) {
    super();
    this.name = name;
    if (!Item.instances) {
      Item.instances = [];
    }
    this.id = Item.instances.length;
    Item.instances.push(this);
  }
}
