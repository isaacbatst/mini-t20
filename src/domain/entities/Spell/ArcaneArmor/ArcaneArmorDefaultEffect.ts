import type {EffectDuration, EffectRange} from '../../Ability/ActivateableAbilityEffect';
import {AffectableTarget} from '../../Affectable/AffectableTarget';
import {ManaCost} from '../../ManaCost';
import {SpellEffect} from '../SpellEffect';
import {SpellName} from '../SpellName';

export class ArcaneArmorDefaultEffect extends SpellEffect {
	static get defenseBonus() {
		return 5;
	}

	static get duration(): EffectDuration {
		return 'scene';
	}

	affectable = new AffectableTarget('self');
	costs = [new ManaCost(1)];
	range: EffectRange = 'personal';

	constructor() {
		super({
			source: SpellName.arcaneArmor,
			duration: 'scene',
			execution: 'default',
		});
	}
}
