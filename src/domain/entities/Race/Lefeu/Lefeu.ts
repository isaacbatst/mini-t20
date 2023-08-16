import {SheetBuilderError} from '../../../errors';
import {SelectableAttributesRace} from '../../SelectableAttributesRace';
import type {Attribute, Attributes} from '../../Sheet/Attributes';
import {type SkillName} from '../../Skill';
import {RaceName} from '../RaceName';
import {Deformity} from './Deformity/Deformity';
import {SonOfTormenta} from './SonOfTormenta/SonOfTormenta';

export class Lefeu extends SelectableAttributesRace {
	static raceName = RaceName.lefeu;
	static attributeModifiers: Partial<Attributes> = {};

	readonly abilities = {
		sonOfTormenta: new SonOfTormenta(),
		deformity: new Deformity(),
	};

	private previousRace: RaceName;

	/**
 * Returns an instance of lefeu race.
 * @param selectedAttributes - 3 different attributes
 * @param deformity - +2 on 2 skills
  **/

	constructor(selectedAttributes: Attribute[]) {
		if (selectedAttributes.find(attribute => attribute === 'charisma')) {
			throw new SheetBuilderError('INVALID_ATTRIBUTES_SELECTION');
		}

		super(selectedAttributes, RaceName.lefeu, {
			charisma: -1,
		});
		this.previousRace = RaceName.human;
	}

	addDeformities(skills: SkillName[]) {
		skills.forEach(skill => {
			this.abilities.deformity.addDeformity(skill);
		});
	}

	setPreviousRace(previousRace: RaceName) {
		this.previousRace = previousRace;
	}

	getPreviousRace() {
		return this.previousRace;
	}

	protected get restrictedAttributes(): string[] {
		return ['charisma'];
	}

	protected get fixedModifier(): number {
		return 1;
	}

	protected get selectableQuantity(): number {
		return 3;
	}
}
