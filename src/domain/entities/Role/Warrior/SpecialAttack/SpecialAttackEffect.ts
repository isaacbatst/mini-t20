import {TriggeredEffect} from '../../../Ability/TriggeredEffect';
import {Level} from '../../../Levels';
import {ManaCost} from '../../../ManaCost';
import {RoleAbilityName} from '../../RoleAbilityName';
import type {SpecialAttackManaCost} from './SpecialAttackManaCost';
import {SpecialAttackEffectCosts} from './SpecialAttackManaCost';

export abstract class SpecialAttackEffect extends TriggeredEffect {
	static minLevelToCost: Record<SpecialAttackEffectCosts, Level> = {
		[SpecialAttackEffectCosts.oneManaPoint]: Level.levelOne,
		[SpecialAttackEffectCosts.twoManaPoints]: Level.levelFive,
	};

	static costs: Record<SpecialAttackEffectCosts, ManaCost> = {
		[SpecialAttackEffectCosts.oneManaPoint]: new ManaCost(1),
		[SpecialAttackEffectCosts.twoManaPoints]: new ManaCost(2),
	};

	static maxModifier: Record<SpecialAttackEffectCosts, number> = {
		[SpecialAttackEffectCosts.oneManaPoint]: 4,
		[SpecialAttackEffectCosts.twoManaPoints]: 8,
	};

	constructor(
		override cost: SpecialAttackManaCost,
	) {
		super({
			duration: 'next',
			execution: 'reaction',
			source: RoleAbilityName.specialAttack,
			triggerEvent: 'attack',
		});
	}
}
