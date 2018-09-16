import Resource from "./Resource";
export default class Meat extends Resource {
  constructor(props) {
    super(props);
    const { name } = props;
    this.name = name + "meat";
  }
  satiation = { raw: 4, cooked: 10 };
}
