import type {Attribute, Attributes} from './Attributes';

export type AttributeModifier = {
	attribute: Attribute;
	modifier: number;
};

export abstract class Race {
	abstract readonly attributeModifiers: AttributeModifier[];

	applyAttributesModifiers(attributes: Attributes): Attributes {
		const modifiedAttributes: Partial<Attributes> = {};

		this.attributeModifiers.forEach(attributeModifier => {
			modifiedAttributes[attributeModifier.attribute] = attributes[attributeModifier.attribute] + attributeModifier.modifier;
		});

		return {
			...attributes,
			...modifiedAttributes,
		};
	}
}
