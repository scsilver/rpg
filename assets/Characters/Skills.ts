class FightingSkills {
  attack: number;
  defense: number;
  agility: number;
  health: number;
}
class ResourcingSkills {
  mining: number;
  chopping: number;
}

const skills = {
  fighting: new FightingSkills(),
  resourcing: new ResourcingSkills()
};

export default skills;
