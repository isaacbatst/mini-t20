import type {Attributes} from '../Attributes';
import {DefenseFake} from '../Defense/DefenseFake';
import type {DefenseInterface} from '../Defense/DefenseInterface';
import {Level} from '../Levels';
import type {Proficiency} from '../Proficiency';
import type {BuildStepInterface} from '../ProgressionStep';
import {RaceFake} from '../RaceFake';
import {InitialSkillsGenerator} from '../Skill/InitialSkillsGenerator';
import {Vision} from '../Vision';
import type {SheetAbilities, SheetBaseInterface, SheetLearnedCircles, SheetPowers, SheetSkills, SheetSpells, SheetTriggeredEffects} from './SheetBaseInterface';

export class SheetBaseFake implements SheetBaseInterface {
	buildSteps: BuildStepInterface[] = [];
	attributes: Attributes = {charisma: 0, constitution: 0, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0};
	defense = new DefenseFake();
	displacement = 9;
	level = Level.levelOne;
	skills: SheetSkills = InitialSkillsGenerator.generate();
	vision = Vision.default;
	proficiencies: Proficiency[] = [];
	abilities: SheetAbilities = {race: new Map(), role: new Map()};
	powers: SheetPowers = {general: new Map(), role: new Map()};
	triggeredEffects: SheetTriggeredEffects = {attack: new Map(), defense: new Map()};
	spells: SheetSpells = new Map();
	learnedCircles: SheetLearnedCircles = {arcane: new Set(), divine: new Set()};

	getAttributes(): Attributes {
		return this.attributes;
	}

	getDefense(): DefenseInterface {
		return this.defense;
	}

	getDisplacement(): number {
		return this.displacement;
	}

	getLevel(): number {
		return this.level;
	}

	getSkills(): SheetSkills {
		return this.skills;
	}

	getVision(): Vision {
		return this.vision;
	}

	getProficiencies(): Proficiency[] {
		return this.proficiencies;
	}

	getAbilities(): SheetAbilities {
		return this.abilities;
	}

	getPowers(): SheetPowers {
		return this.powers;
	}

	getSpells(): SheetSpells {
		return this.spells;
	}

	getLearnedCircles(): SheetLearnedCircles {
		return this.learnedCircles;
	}

	getTriggeredEffects(): SheetTriggeredEffects {
		return this.triggeredEffects;
	}
}
