import Item from "../Item";
export default class Resource extends Item {
  constructor(props = { name: "" }) {
    super(props);
    this.name = props.name;
  }
}
