import Fruit from "./Fruit";
import Meat from "./Meat";
import Seed from "./Seed";
import Ore from "./Ore";
import { floraNames, mineralNames, animalNames } from "../../lists";

const buildResoureClasses = (names, resourceClass) => {
  const classObject = {};
  names.map(name => (classObject[name] = new resourceClass({ name })));
  return classObject;
};

const fruits = buildResoureClasses(floraNames, Fruit);
const seeds = buildResoureClasses(floraNames, Seed);
const meats = buildResoureClasses(animalNames, Meat);
const ores = buildResoureClasses(mineralNames, Ore);

const resources = {
  ...fruits,
  ...seeds,
  ...meats,
  ...ores,
  fruits,
  seeds,
  meats,
  ores
};
export default resources;
