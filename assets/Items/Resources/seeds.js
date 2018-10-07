import Seed from "./Seed";

export const seeds = {
  appleSeed: () => new Seed({ name: "apple" }),
  cornSeed: () => new Seed({ name: "corn" }),
  strawberrySeed: () => new Seed({ name: "strawberry" })
};
