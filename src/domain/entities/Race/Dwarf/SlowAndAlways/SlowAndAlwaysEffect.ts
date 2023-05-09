import {PassiveEffect} from '../../../Ability/PassiveEffect';
import {ChangeDisplacement} from '../../../Action/ChangeDisplacement';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../../RaceAbilityName';

export class SlowAndAlwaysEffect extends PassiveEffect {
	get description() {
		return 'Seu deslocamento é 6m (em vez de 9m).';
	}

	constructor() {
		super(RaceAbilityName.slowAndAlways);
	}

	apply(transaction: TransactionInterface): void {
		transaction.run(new ChangeDisplacement({
			payload: {
				displacement: 6,
				source: this.source,
			}, transaction,
		}));
	}
}
