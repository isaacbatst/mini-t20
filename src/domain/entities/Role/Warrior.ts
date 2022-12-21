import {Proficiency} from '../Proficiency';
import {SkillName} from '../Skill/SkillName';
import {Role} from './Role';
import type {ChooseableSkills} from './RoleInterface';
import {RoleName} from './RoleName';

export class Warrior extends Role {
	get initialLifePoints() {
		return 20;
	}

	get lifePointsPerLevel() {
		return 5;
	}

	get manaPerLevel() {
		return 3;
	}

	readonly mandatorySkills: SkillName[] = [SkillName.fortitude];
	readonly chooseableSkills: ChooseableSkills[] = [
		{amount: 1, skills: [SkillName.fight, SkillName.aim]},
		{amount: 2, skills: [SkillName.animalHandling, SkillName.athletics, SkillName.animalRide, SkillName.war, SkillName.initiative, SkillName.intimidation, SkillName.fight, SkillName.craft, SkillName.perception, SkillName.aim, SkillName.reflexes]},
	];

	readonly proficiencies: Proficiency[] = [Proficiency.martial, Proficiency.shield, Proficiency.heavyArmor];
	readonly name: RoleName = RoleName.warrior;
}
