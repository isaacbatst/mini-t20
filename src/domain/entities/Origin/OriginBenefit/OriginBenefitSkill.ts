import {TrainSkill} from '../../Action/TrainSkill';
import {SheetBuilderError} from '../../Error/SheetBuilderError';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import type {SkillName} from '../../Skill/SkillName';
import {type TranslatableName} from '../../Translator';
import {OriginBenefit} from './OriginBenefit';
import {type OriginBenefits} from './OriginBenefits';
import {type SerializedOriginBenefits} from './SerializedOriginBenefit';

export class OriginBenefitSkill extends OriginBenefit {
	override name: SkillName;
	constructor(readonly skill: SkillName) {
		super();
		this.name = skill;
	}

	apply(transaction: TransactionInterface, source: TranslatableName): void {
		transaction.run(new TrainSkill({
			payload: {
				skill: this.skill,
				source,
			},
			transaction,
		}));
	}

	validate(originBenefits: OriginBenefits): void {
		if (!originBenefits.skills.includes(this.skill)) {
			throw new SheetBuilderError('INVALID_ORIGIN_SKILL');
		}
	}

	override serialize(): SerializedOriginBenefits {
		return {
			type: 'skills',
			name: this.skill,
		};
	}
}
