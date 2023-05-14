import {Ability} from '../Ability/Ability';
import type {Cost} from '../Sheet/CharacterSheet/CharacterSheetInterface';
import {SpellCircle} from './SpellCircle';
import {SpellCost} from './SpellCost';
import type {SpellName} from './SpellName';
import {type SpellSchool} from './SpellSchool';

export type LearnableSpellType = 'arcane' | 'divine';
export type SpellType = LearnableSpellType | 'universal';

export abstract class Spell extends Ability {
	static readonly circleManaCost: Record<SpellCircle, number> = {
		[SpellCircle.first]: 1,
		[SpellCircle.second]: 3,
	};

	readonly cost: Cost;
	abstract school: SpellSchool;
	abstract shortDescription: string;

	constructor(
		override readonly name: SpellName,
		readonly circle: SpellCircle,
		readonly type: SpellType,
	) {
		super(name, 'spell');
		this.cost = new SpellCost(this.circle);
	}
}
