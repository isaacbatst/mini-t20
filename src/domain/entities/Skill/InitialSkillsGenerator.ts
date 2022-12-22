import type {Attributes} from '../Attributes';
import type {SheetInterface} from '../SheetInterface';
import {Skill} from './Skill';
import type {SkillName} from './SkillName';

export class InitialSkillsGenerator {
	static generate(): Record<SkillName, Skill> {
		return {
			acrobatics: new Skill({
				attribute: 'dexterity',
			}),
			animalHandling: new Skill({
				attribute: 'charisma',
			}),
			fight: new Skill({
				attribute: 'strength',
			}),
			reflexes: new Skill({
				attribute: 'dexterity',
			}),
			perception: new Skill({
				attribute: 'wisdom',
			}),
			survival: new Skill({
				attribute: 'wisdom',
			}),
			aim: new Skill({
				attribute: 'dexterity',
			}),
			animalRide: new Skill({
				attribute: 'dexterity',
			}),
			athletics: new Skill({
				attribute: 'strength',
			}),
			craft: new Skill({
				attribute: 'intelligence',
			}),
			fortitude: new Skill({
				attribute: 'constitution',
			}),
			initiative: new Skill({
				attribute: 'dexterity',
			}),
			intimidation: new Skill({
				attribute: 'charisma',
			}),
			war: new Skill({
				attribute: 'intelligence',
			}),
			cheat: new Skill({
				attribute: 'charisma',
			}),
			diplomacy: new Skill({
				attribute: 'charisma',
			}),
			intuition: new Skill({
				attribute: 'wisdom',
			}),
			investigation: new Skill({
				attribute: 'intelligence',
			}),
			knowledge: new Skill({
				attribute: 'intelligence',
			}),
			mysticism: new Skill({
				attribute: 'intelligence',
			}),
			nobility: new Skill({
				attribute: 'intelligence',
			}),
			will: new Skill({
				attribute: 'wisdom',
			}),
		};
	}
}
