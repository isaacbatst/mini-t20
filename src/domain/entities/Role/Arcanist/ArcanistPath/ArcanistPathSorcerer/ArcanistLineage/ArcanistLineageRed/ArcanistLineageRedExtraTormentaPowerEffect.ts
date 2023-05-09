import {PassiveEffect} from '../../../../../../Ability/PassiveEffect';
import {PickGeneralPower} from '../../../../../../Action/PickGeneralPower';
import {type TormentaPower} from '../../../../../../Power/GeneralPower/TormentaPower/TormentaPower';
import {type TransactionInterface} from '../../../../../../Sheet/TransactionInterface';
import {RoleAbilityName} from '../../../../../RoleAbilityName';

export class ArcanistLineageRedExtraTormentaPowerEffect extends PassiveEffect {
	get description() {
		return 'Você recebe um poder da Tormenta';
	}

	constructor(
		private readonly power: TormentaPower,
	) {
		super(RoleAbilityName.arcanistSupernaturalLineage);
	}

	apply(transaction: TransactionInterface): void {
		transaction.run(new PickGeneralPower({
			payload: {
				power: this.power,
				source: this.source,
			},
			transaction,
		}));
	}
}
