class FightingSkills {
  attack = 0;
  defense = 0;
  agility = 0;
  health = 0;
}
class ResourcingSkills {
  mining = 0;
  chopping = 0;
}

const skills = {
  fighting: new FightingSkills(),
  resourcing: new ResourcingSkills()
};

export default skills;
