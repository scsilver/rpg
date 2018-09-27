export default class Specie {
  constructor({ name }) {
    this.name = name;
    if (!Specie.instances) {
      Specie.instances = [this];
    }
    const previousInstance =
      Specie.instances &&
      Specie.instances.filter(instance => instance.name == this.name)[0];
    if (previousInstance) {
      return previousInstance;
    }
    Specie.instances.push(this);
  }
}
