import {AbilityEffects, type AbilityEffectsInterface} from '../../../../../../Ability/AbilityEffects';
import {type AbilityLevel} from '../../../../../../Ability/AbilityLevel';
import {type SerializedArcanistLineage} from '../../../../SerializedArcanist';
import {ArcanistLineage} from '../ArcanistLineage';
import {ArcanistLineageType} from '../ArcanistLineageType';
import {ArcanistLineageDraconicCharismaBonusEffect} from './ArcanistLineageDraconicCharismaBonusEffect';
import {ArcanistLineageDraconicDamageReductionEffect} from './ArcanistLineageDraconicDamageReductionEffect';
import {type ArcanistLineageDraconicDamageType} from './ArcanistLineageDraconicDamageType';

export class ArcanistLineageDraconic extends ArcanistLineage {
	override effects: Record<AbilityLevel, AbilityEffectsInterface> & {
		basic: {
			passive: {
				charismaBonus: ArcanistLineageDraconicCharismaBonusEffect;
				damageReduction: ArcanistLineageDraconicDamageReductionEffect;
			};
		};
	};

	readonly type = ArcanistLineageType.draconic;

	constructor(
		damageType: ArcanistLineageDraconicDamageType,
	) {
		const damageReductionEffect = new ArcanistLineageDraconicDamageReductionEffect(damageType);
		const charismaBonusEffect = new ArcanistLineageDraconicCharismaBonusEffect();
		super();

		this.effects = {
			basic: new AbilityEffects({
				passive: {
					charismaBonus: charismaBonusEffect,
					damageReduction: damageReductionEffect,
				},
			}),
			enhanced: new AbilityEffects(),
			higher: new AbilityEffects(),
		};
	}

	getDamageType(): ArcanistLineageDraconicDamageType {
		return this.effects.basic.passive.damageReduction.damageType;
	}

	override serialize(): SerializedArcanistLineage {
		return {
			type: this.type,
			damageType: this.getDamageType(),
		};
	}
}
