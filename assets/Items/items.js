import resources from "./Resources/resources";
import metals from "./metals";
import Item from "./Item";
const ingredientsDictionary = ingredients => {
  const ingredientsList = ["Log", "Weave"];
  const itemRecipieHash = ingredientsList
    .map(
      ingredientName =>
        ingredients.filter(
          ingredient => ingredient.__proto__.costructor.name == ingredientName
        ).length
    )
    .join(``);
};
class PlantItem extends Item {
  constructor({ name = "", species } = {}) {
    super({ name, species });
  }
}
class OreItem extends Item {
  constructor({ name = "", species } = {}) {
    super({ name, species });
  }
}
class Tool extends Item {
  constructor(props) {
    super(props);
  }
}
class Stone extends Tool {
  constructor({ usage = "grinding" } = {}) {
    super(usage);
  }
}
class Log extends PlantItem {
  constructor({ name = "log", species } = {}) {
    super({ name });
    this.name = species.name + " " + name;
  }
}
class Weave extends PlantItem {
  constructor({ name = "weave", species } = {}) {
    super({ name });
    this.name = species.name + " " + name;
  }
}

class CraftedItem extends Item {
  constructor({ name = "", ingredients = [] } = {}) {
    super({ name });
    this.ingredients = ingredients;
  }
}
class CraftedFood extends CraftedItem {
  constructor({ name = "", ingredients = [] } = {}) {
    super({ name, ingredients });
  }
  cooked = false;
}

class Board extends CraftedItem {
  constructor({ name = "board", ingredients = [Log, Log] } = {}) {
    super({ name, ingredients });
  }
}

class Block extends CraftedItem {
  constructor(
    { name = "block", ingredients = [Board, Board, Board, Board] } = {}
  ) {
    super({ name, ingredients });
  }
}

class Basket extends CraftedItem {
  constructor({ name = "basket", ingredients = [Weave, Weave] } = {}) {
    super({ name, ingredients });
  }
}
class Flour extends CraftedItem {
  constructor({ name = "flour" } = {}) {
    super({ name, ingredients });
  }
  ingredients = [Corn, Corn, Corn];
  tools = [Stone];
}
class WaterContainer extends CraftedItem {
  constructor({ name = "water contianer" } = {}) {
    super({ name });
  }
  tools = [Basket];
  ingredients = [Basket, Water];
}
class Dough extends CraftedItem {
  constructor({ name = "dough", ingredients = [Flour, WaterContainer] } = {}) {
    super({ name, ingredients });
  }
}
class Ingot extends CraftedItem {
  constructor(props) {
    super(props);
    this.species = props.species;
  }
}
class Pan extends CraftedItem {
  constructor(props) {
    super(props);
  }
  tool = [Stone];
  ingredients = [Ingot, Ingot, Ingot];
}
class ApplePie extends CraftedFood {
  constructor({ name = "apple pie", ingredients = [Apple, Dough]; } = {}) {
    super({ name, ingredients });
  }
  tool = [Pan];
  ingredients = [Apple, Dough];
}

class Flour extends CraftedItem {
  constructor({ name = "flour", ingredients = [Corn, Corn, Corn] } = {}) {
    super({ name, ingredients });
  }
}

const itemFactory = ({ ingredients: [] } = {}) => {
  switch (ingredientsDictionary(ingredients)) {
    case "log":
      return new Log();
      break;

    default:
      break;
  }
  return Item();
};

const items = {
  ...resources,
  ...metals
};
export default items;
