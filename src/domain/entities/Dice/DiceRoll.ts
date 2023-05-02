import type {DiceSides} from './DiceSides';

export class DiceRoll {
	constructor(
		readonly diceQuantity: number,
		readonly diceSides: DiceSides,
	) {
		this.validateDiceQuantity(diceQuantity);
	}

	private validateDiceQuantity(diceQuantity: number) {
		if (diceQuantity < 1) {
			throw new Error('INVALID_DICE_QUANTITY');
		}
	}
}
