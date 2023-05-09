import {PassiveEffect} from '../../../../Ability/PassiveEffect';
import {AddFixedModifierToDefense} from '../../../../Action/AddFixedModifierToDefense';
import {AddFixedModifierToSkill} from '../../../../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../../../../Modifier/FixedModifier/FixedModifier';
import {type TransactionInterface} from '../../../../Sheet/TransactionInterface';
import {SkillName} from '../../../../Skill/SkillName';
import {GeneralPowerName} from '../../GeneralPowerName';

export class DodgeEffect extends PassiveEffect {
	get description() {
		return 'Você recebe +2 na Defesa e Reflexos.';
	}

	constructor() {
		super(GeneralPowerName.dodge);
	}

	apply(transaction: TransactionInterface): void {
		const modifier = new FixedModifier(this.source, 2);
		transaction.run(new AddFixedModifierToDefense({payload: {modifier}, transaction}));
		transaction.run(new AddFixedModifierToSkill({payload: {modifier, skill: SkillName.reflexes}, transaction}));
	}
}
