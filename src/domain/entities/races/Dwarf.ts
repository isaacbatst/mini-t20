import type {Attributes} from '../Attributes';
import {Race} from '../Race';

export class Dwarf extends Race {
	applyAttributesModifiers(attributes: Attributes): Attributes {
		return {
			...attributes,
			constitution: attributes.constitution + 2,
			wisdom: attributes.wisdom + 1,
			dexterity: attributes.dexterity - 1,
		};
	}
}
