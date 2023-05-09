import {PickOriginPower} from '../Action/PickOriginPower';
import {SheetBuilderError} from '../Error/SheetBuilderError';
import {type OriginPowerName} from '../Power';
import type {OriginPowerInterface} from '../Power/OriginPower/OriginPower';
import type {Transaction} from '../Sheet/Transaction';
import {type TranslatableName} from '../Translator';
import type {OriginBenefits} from './Origin';
import {OriginBenefit} from './OriginBenefit';

export class OriginBenefitOriginPower extends OriginBenefit {
	override name: OriginPowerName;
	constructor(
		readonly power: OriginPowerInterface,
	) {
		super();
		this.name = power.name;
	}

	apply(transaction: Transaction, source: TranslatableName): void {
		transaction.run(new PickOriginPower({
			payload: {
				power: this.power,
				source,
			},
			transaction,
		}));
	}

	validate(originBenefits: OriginBenefits): void {
		if (originBenefits.originPower !== this.power.name) {
			throw new SheetBuilderError('INVALID_ORIGIN_POWER');
		}
	}
}
