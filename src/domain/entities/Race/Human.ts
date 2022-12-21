import type {Attribute} from '../Attributes';
import type {VersatileChoice} from '../RaceAbility/Human/Versatile';
import {Versatile} from '../RaceAbility/Human/Versatile';
import {SelectableAttributesRace} from '../SelectableAttributesRace';
import {RaceName} from './RaceName';

export class Human extends SelectableAttributesRace {
	readonly abilities = {
		versatile: new Versatile(),
	};

	constructor(attributes: Attribute[], versatileChoices: VersatileChoice[] = []) {
		super(attributes, RaceName.human);

		versatileChoices.forEach(choice => {
			this.abilities.versatile.addChoice(choice);
		});
	}

	protected get restrictedAttributes(): string[] {
		return [];
	}

	protected get fixedModifier(): number {
		return 1;
	}

	protected get selectableQuantity(): number {
		return 3;
	}

	get versatileChoices() {
		return this.abilities.versatile.choices;
	}
}
