import Resource from "./Resource";
export default class Ore extends Resource {
  constructor(props = { name: "" }) {
    super(props);
    this.name = props.name;
  }
  value = 1;
}
