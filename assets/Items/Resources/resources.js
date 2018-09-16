import Fruit from "./Fruit";
import Meat from "./Meat";
import Ore from "./Ore";
import Seed from "./Seed";

const fruits = {
  apple: new Fruit({ name: "apple" }),
  strawberry: new Fruit({ name: "apple" })
};
const seeds = {
  corn: new Seed({ name: "corn" })
};
const ores = {
  iron: new Ore({ name: "iron" }),
  copper: new Ore({ name: "copper" })
};
const woods = {
  pine: { name: "pine" }
};

const resources = {
  ...fruits,
  ...seeds,
  ...ores,
  woods,
  fruits,
  seeds,
  ores
};
export default resources;
