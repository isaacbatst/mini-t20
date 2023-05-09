import type {Attribute} from '../../../Sheet/Attributes';
import {Level} from '../../../Sheet/Level';
import type {LearnableSpellType, Spell} from '../../../Spell/Spell';
import {SpellCircle} from '../../../Spell/SpellCircle';
import {RoleAbilityName} from '../../RoleAbilityName';
import type {SpellLearnFrequency} from '../../SpellsAbility';
import {SpellsAbilityEffect} from '../../SpellsAbilityEffect';

export class ArcanistSpellsEffect extends SpellsAbilityEffect {
	get description() {
		return 'Você pode lançar magias arcanas de 1º	círculo e começa com três magias de 1º círculo.';
	}

	spellsLearnFrequency: SpellLearnFrequency;
	spellsAttribute: Attribute;

	circleLearnLevel: Record<SpellCircle, Level> = {
		[SpellCircle.first]: Level.one,
		[SpellCircle.second]: Level.two,
	};

	spellType: LearnableSpellType = 'arcane';
	constructor(spells: Spell[], learnFrequency: SpellLearnFrequency, attribute: Attribute) {
		super(spells, 3, RoleAbilityName.arcanistSpells);
		this.spellsLearnFrequency = learnFrequency;
		this.spellsAttribute = attribute;
	}
}
