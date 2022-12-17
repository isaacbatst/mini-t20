import {SelectableAttributesRace} from '../SelectableAttributesRace';

export class Human extends SelectableAttributesRace {
	protected get restrictedAttributes(): string[] {
		return [];
	}

	protected get attributesModifier(): number {
		return 1;
	}

	protected get selectableQuantity(): number {
		return 3;
	}
}
