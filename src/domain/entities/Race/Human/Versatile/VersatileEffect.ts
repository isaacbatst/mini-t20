import {PassiveEffect} from '../../../Ability/PassiveEffect';
import {SheetBuilderError} from '../../../../errors/SheetBuilderError';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../../RaceAbilityName';
import type {VersatileChoice} from './VersatileChoice';

export class VersatileEffect extends PassiveEffect {
	get description() {
		return 'Você se torna treinado em duas perícias a sua escolha (não precisam ser da sua classe). Você pode trocar uma dessas perícias por um poder geral a sua escolha.';
	}

	readonly choices: VersatileChoice[] = [];
	constructor() {
		super(RaceAbilityName.versatile);
	}

	addChoice(newChoice: VersatileChoice) {
		if (this.choices.length >= 2) {
			throw new SheetBuilderError('EXCEEDED_CHOICES_QUANTITY');
		}

		const found = this.choices.find(choice => choice.name === newChoice.name);

		if (found) {
			throw new SheetBuilderError('REPEATED_VERSATILE_CHOICE');
		}

		const isPreviousChoicePower = this.choices.some(choice => choice.type === 'power');

		if (newChoice.type === 'power' && isPreviousChoicePower) {
			throw new SheetBuilderError('FORBIDDEN_TWO_POWERS');
		}

		this.choices.push(newChoice);
	}

	apply(transaction: TransactionInterface): void {
		if (this.choices.length !== 2) {
			throw new SheetBuilderError('MISSING_CHOICES');
		}

		this.choices.forEach(choice => {
			choice.addToSheet(transaction, this.source);
		});
	}
}
