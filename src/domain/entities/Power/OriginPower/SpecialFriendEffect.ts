import type {AbilityName} from '../../Ability/Ability';
import {PassiveEffect} from '../../Ability/PassiveEffect';
import {AddFixedModifierToSkill} from '../../Action/AddFixedModifierToSkill';
import {SheetBuilderError} from '../../Error/SheetBuilderError';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {SkillName} from '../../Skill/SkillName';
import {OriginPowerName} from './OriginPowerName';

export class SpecialFriendEffect extends PassiveEffect {
	constructor(source: AbilityName, readonly skill: SkillName) {
		super(source);
		this.validateSkill();
	}

	applyToSheet(transaction: TransactionInterface): void {
		transaction.run(new AddFixedModifierToSkill({
			payload: {
				modifier: new FixedModifier(OriginPowerName.specialFriend, 5),
				skill: SkillName.animalHandling,
			},
			transaction,
		}));

		transaction.run(new AddFixedModifierToSkill({
			payload: {
				modifier: new FixedModifier(OriginPowerName.specialFriend, 2),
				skill: this.skill,
			},
			transaction,
		}));
	}

	private validateSkill() {
		if (this.skill === SkillName.fight || this.skill === SkillName.aim) {
			throw new SheetBuilderError('INVALID_SKILL');
		}
	}
}
