import type {Attribute, Attributes} from '../../Attributes';
import type {ContextInterface} from '../../ContextInterface';
import type {ModifierValueGetterInterface} from '../ModifierInterface';
import {ModifierValueGetter} from '../ModifierValueGetter';
import type {ModifierConditionVerify} from './ContextualModifiersListInterface';

export class ContextualModifierValueGetter extends ModifierValueGetter implements ModifierValueGetterInterface {
	constructor(
		attributes: Attributes,
		readonly context: ContextInterface,
		readonly verifyCondition: ModifierConditionVerify,
	) {
		super(attributes);
	}

	get(value: number, attributes: Attribute[]): number {
		const bonusesTotal = this.getAttributesBonusesTotal(attributes);

		if (!this.context.shouldActivateModifier(this.verifyCondition)) {
			return 0;
		}

		return value + bonusesTotal;
	}
}
